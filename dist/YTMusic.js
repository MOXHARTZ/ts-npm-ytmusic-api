"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const https_proxy_agent_1 = require("https-proxy-agent");
const tough_cookie_1 = require("tough-cookie");
const constants_1 = require("./constants");
const AlbumParser_1 = __importDefault(require("./parsers/AlbumParser"));
const ArtistParser_1 = __importDefault(require("./parsers/ArtistParser"));
const Parser_1 = __importDefault(require("./parsers/Parser"));
const PlaylistParser_1 = __importDefault(require("./parsers/PlaylistParser"));
const SearchParser_1 = __importDefault(require("./parsers/SearchParser"));
const SongParser_1 = __importDefault(require("./parsers/SongParser"));
const VideoParser_1 = __importDefault(require("./parsers/VideoParser"));
const traverse_1 = require("./utils/traverse");
class YTMusic {
    cookiejar;
    config;
    client;
    agent;
    initialized = false;
    /**
     * Creates an instance of YTMusic
     * Make sure to call initialize()
     */
    constructor() {
        this.cookiejar = new tough_cookie_1.CookieJar();
        this.config = {};
        this.client = axios_1.default.create({
            baseURL: "https://music.youtube.com/",
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.5",
            },
            withCredentials: true,
        });
        this.client.interceptors.request.use(req => {
            if (!req.baseURL)
                return;
            const cookieString = this.cookiejar.getCookieStringSync(req.baseURL);
            if (cookieString) {
                if (!req.headers) {
                    req.headers = {};
                }
                req.headers["Cookie"] = cookieString;
            }
            return req;
        });
        this.client.interceptors.response.use(res => {
            if ("set-cookie" in res.headers) {
                if (!res.config.baseURL)
                    return;
                const setCookie = res.headers["set-cookie"];
                for (const cookieString of [setCookie].flat()) {
                    const cookie = tough_cookie_1.Cookie.parse(`${cookieString}`);
                    if (!cookie)
                        return;
                    if (cookie.domain !== ".youtube.com")
                        cookie.domain = ".youtube.com";
                    this.cookiejar.setCookieSync(cookie, res.config.baseURL);
                }
            }
            return res;
        });
    }
    // distubejs@ytdl-core
    convertSameSite(sameSite) {
        switch (sameSite) {
            case 'strict':
                return 'strict';
            case 'lax':
                return 'lax';
            case 'no_restriction':
            case 'unspecified':
            default:
                return 'none';
        }
    }
    ;
    convertCookie(cookie) {
        if (cookie instanceof tough_cookie_1.Cookie)
            return cookie;
        return new tough_cookie_1.Cookie({
            key: cookie.name,
            value: cookie.value,
            expires: typeof cookie.expirationDate === 'number' ? new Date(cookie.expirationDate * 1000) : 'Infinity',
            domain: (0, tough_cookie_1.canonicalDomain)(cookie.domain),
            path: cookie.path,
            secure: cookie.secure,
            httpOnly: cookie.httpOnly,
            sameSite: this.convertSameSite(cookie.sameSite),
            hostOnly: cookie.hostOnly,
        });
    }
    addCookies(cookies) {
        for (const cookie of cookies) {
            this.cookiejar.setCookieSync(this.convertCookie(cookie), 'https://www.youtube.com');
        }
    }
    initCookies(cookies) {
        if (typeof cookies === 'string') {
            cookies = cookies.split(';').map(c => tough_cookie_1.Cookie.parse(c)).filter(Boolean);
            if (!cookies)
                return;
            cookies = cookies;
            this.addCookies(cookies);
            return;
        }
        this.addCookies(cookies);
        console.log('cookies are initialized', this.cookiejar);
    }
    /**
     * Initializes the API
     */
    async initialize(options) {
        const { cookies, GL, HL, localAddress } = options ?? {};
        if (cookies)
            this.initCookies(cookies);
        if (this.initialized && !options?.force) {
            console.log('already initialized');
            return this; // already initialized
        }
        if (localAddress)
            this.agent = new https_proxy_agent_1.HttpsProxyAgent(localAddress);
        const html = (await this.client.get("/", {
            httpsAgent: this.agent,
        })).data;
        const setConfigs = html.match(/ytcfg\.set\(.*\)/) || [];
        const configs = setConfigs
            .map(c => c.slice(10, -1))
            .map(s => {
            try {
                return JSON.parse(s);
            }
            catch {
                return null;
            }
        })
            .filter(j => !!j);
        for (const config of configs) {
            this.config = {
                ...this.config,
                ...config,
            };
        }
        if (!this.config) {
            this.config = {};
        }
        if (GL)
            this.config.GL = GL;
        if (HL)
            this.config.HL = HL;
        this.initialized = true;
        return this;
    }
    isInitialized() {
        return this.initialized;
    }
    /**
     * Constructs a basic YouTube Music API request with all essential headers
     * and body parameters needed to make the API work
     *
     * @param endpoint Endpoint for the request
     * @param body Body
     * @param query Search params
     * @returns Raw response from YouTube Music API which needs to be parsed
     */
    async constructRequest(endpoint, body = {}, query = {}) {
        if (!this.config) {
            throw new Error("API not initialized. Make sure to call the initialize() method first");
        }
        const headers = {
            ...this.client.defaults.headers,
            "x-origin": this.client.defaults.baseURL,
            "X-Goog-Visitor-Id": this.config.VISITOR_DATA || "",
            "X-YouTube-Client-Name": this.config.INNERTUBE_CONTEXT_CLIENT_NAME,
            "X-YouTube-Client-Version": this.config.INNERTUBE_CLIENT_VERSION,
            "X-YouTube-Device": this.config.DEVICE,
            "X-YouTube-Page-CL": this.config.PAGE_CL,
            "X-YouTube-Page-Label": this.config.PAGE_BUILD_LABEL,
            "X-YouTube-Utc-Offset": String(-new Date().getTimezoneOffset()),
            "X-YouTube-Time-Zone": new Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        const searchParams = new URLSearchParams({
            ...query,
            alt: "json",
            key: this.config.INNERTUBE_API_KEY,
        });
        const res = await this.client.post(`youtubei/${this.config.INNERTUBE_API_VERSION}/${endpoint}?${searchParams.toString()}`, {
            context: {
                capabilities: {},
                client: {
                    clientName: this.config.INNERTUBE_CLIENT_NAME,
                    clientVersion: this.config.INNERTUBE_CLIENT_VERSION,
                    experimentIds: [],
                    experimentsToken: "",
                    gl: this.config.GL,
                    hl: this.config.HL,
                    locationInfo: {
                        locationPermissionAuthorizationStatus: "LOCATION_PERMISSION_AUTHORIZATION_STATUS_UNSUPPORTED",
                    },
                    musicAppInfo: {
                        musicActivityMasterSwitch: "MUSIC_ACTIVITY_MASTER_SWITCH_INDETERMINATE",
                        musicLocationMasterSwitch: "MUSIC_LOCATION_MASTER_SWITCH_INDETERMINATE",
                        pwaInstallabilityStatus: "PWA_INSTALLABILITY_STATUS_UNKNOWN",
                    },
                    utcOffsetMinutes: -new Date().getTimezoneOffset(),
                },
                request: {
                    internalExperimentFlags: [
                        {
                            key: "force_music_enable_outertube_tastebuilder_browse",
                            value: "true",
                        },
                        {
                            key: "force_music_enable_outertube_playlist_detail_browse",
                            value: "true",
                        },
                        {
                            key: "force_music_enable_outertube_search_suggestions",
                            value: "true",
                        },
                    ],
                    sessionIndex: {},
                },
                user: {
                    enableSafetyMode: false,
                },
            },
            ...body,
        }, {
            responseType: "json",
            headers,
            httpAgent: this.agent,
        });
        return "responseContext" in res.data ? res.data : res;
    }
    /**
     * Get a list of search suggestiong based on the query
     *
     * @param query Query string
     * @returns Search suggestions
     */
    async getSearchSuggestions(query) {
        return (0, traverse_1.traverseList)(await this.constructRequest("music/get_search_suggestions", {
            input: query,
        }), "query");
    }
    /**
     * Searches YouTube Music API for results
     *
     * @param query Query string
     */
    async search(query) {
        const searchData = await this.constructRequest("search", {
            query,
            params: null,
        });
        return (0, traverse_1.traverseList)(searchData, "musicResponsiveListItemRenderer")
            .map(SearchParser_1.default.parse)
            .filter(Boolean);
    }
    /**
     * Searches YouTube Music API for songs
     *
     * @param query Query string
     */
    async searchSongs(query) {
        const searchData = await this.constructRequest("search", {
            query,
            params: "Eg-KAQwIARAAGAAgACgAMABqChAEEAMQCRAFEAo%3D",
        });
        return (0, traverse_1.traverseList)(searchData, "musicResponsiveListItemRenderer").map(SongParser_1.default.parseSearchResult);
    }
    /**
     * Searches YouTube Music API for videos
     *
     * @param query Query string
     */
    async searchVideos(query) {
        const searchData = await this.constructRequest("search", {
            query,
            params: "Eg-KAQwIABABGAAgACgAMABqChAEEAMQCRAFEAo%3D",
        });
        return (0, traverse_1.traverseList)(searchData, "musicResponsiveListItemRenderer").map(VideoParser_1.default.parseSearchResult);
    }
    /**
     * Searches YouTube Music API for artists
     *
     * @param query Query string
     */
    async searchArtists(query) {
        const searchData = await this.constructRequest("search", {
            query,
            params: "Eg-KAQwIABAAGAAgASgAMABqChAEEAMQCRAFEAo%3D",
        });
        return (0, traverse_1.traverseList)(searchData, "musicResponsiveListItemRenderer").map(ArtistParser_1.default.parseSearchResult);
    }
    /**
     * Searches YouTube Music API for albums
     *
     * @param query Query string
     */
    async searchAlbums(query) {
        const searchData = await this.constructRequest("search", {
            query,
            params: "Eg-KAQwIABAAGAEgACgAMABqChAEEAMQCRAFEAo%3D",
        });
        return (0, traverse_1.traverseList)(searchData, "musicResponsiveListItemRenderer").map(AlbumParser_1.default.parseSearchResult);
    }
    /**
     * Searches YouTube Music API for playlists
     *
     * @param query Query string
     */
    async searchPlaylists(query) {
        const searchData = await this.constructRequest("search", {
            query,
            params: "Eg-KAQwIABAAGAAgACgBMABqChAEEAMQCRAFEAo%3D",
        });
        return (0, traverse_1.traverseList)(searchData, "musicResponsiveListItemRenderer").map(PlaylistParser_1.default.parseSearchResult);
    }
    /**
     * Get all possible information of a Song
     *
     * @param videoId Video ID
     * @returns Song Data
     */
    async getSong(videoId) {
        if (!videoId.match(/^[a-zA-Z0-9-_]{11}$/))
            throw new Error("Invalid videoId");
        const data = await this.constructRequest("player", { videoId });
        const song = SongParser_1.default.parse(data);
        if (song.videoId !== videoId)
            throw new Error("Invalid videoId");
        return song;
    }
    /**
     * Get all possible information of a Video
     *
     * @param videoId Video ID
     * @returns Video Data
     */
    async getVideo(videoId) {
        if (!videoId.match(/^[a-zA-Z0-9-_]{11}$/))
            throw new Error("Invalid videoId");
        const data = await this.constructRequest("player", { videoId });
        const video = VideoParser_1.default.parse(data);
        if (video.videoId !== videoId)
            throw new Error("Invalid videoId");
        return video;
    }
    /**
     * Get lyrics of a specific Song
     *
     * @param videoId Video ID
     * @returns Lyrics
     */
    async getLyrics(videoId) {
        if (!videoId.match(/^[a-zA-Z0-9-_]{11}$/))
            throw new Error("Invalid videoId");
        const data = await this.constructRequest("next", { videoId });
        const browseId = (0, traverse_1.traverse)((0, traverse_1.traverseList)(data, "tabs", "tabRenderer")[1], "browseId");
        const lyricsData = await this.constructRequest("browse", { browseId });
        const lyrics = (0, traverse_1.traverseString)(lyricsData, "description", "runs", "text");
        return lyrics
            ? lyrics
                .replaceAll("\r", "")
                .split("\n")
                .filter(v => !!v)
            : null;
    }
    /**
     * Get all possible information of an Artist
     *
     * @param artistId Artist ID
     * @returns Artist Data
     */
    async getArtist(artistId) {
        const data = await this.constructRequest("browse", {
            browseId: artistId,
        });
        return ArtistParser_1.default.parse(data, artistId);
    }
    /**
     * Get all of Artist's Songs
     *
     * @param artistId Artist ID
     * @returns Artist's Songs
     */
    async getArtistSongs(artistId) {
        const artistData = await this.constructRequest("browse", { browseId: artistId });
        const browseToken = (0, traverse_1.traverse)(artistData, "musicShelfRenderer", "title", "browseId");
        if (browseToken instanceof Array)
            return [];
        const songsData = await this.constructRequest("browse", { browseId: browseToken });
        const continueToken = (0, traverse_1.traverse)(songsData, "continuation");
        const moreSongsData = await this.constructRequest("browse", {}, { continuation: continueToken });
        return [
            ...(0, traverse_1.traverseList)(songsData, "musicResponsiveListItemRenderer"),
            ...(0, traverse_1.traverseList)(moreSongsData, "musicResponsiveListItemRenderer"),
        ].map(s => SongParser_1.default.parseArtistSong(s, {
            artistId,
            name: (0, traverse_1.traverseString)(artistData, "header", "title", "text"),
        }));
    }
    /**
     * Get all of Artist's Albums
     *
     * @param artistId Artist ID
     * @returns Artist's Albums
     */
    async getArtistAlbums(artistId) {
        const artistData = await this.constructRequest("browse", {
            browseId: artistId,
        });
        const artistAlbumsData = (0, traverse_1.traverseList)(artistData, "musicCarouselShelfRenderer")[0];
        const browseBody = (0, traverse_1.traverse)(artistAlbumsData, "moreContentButton", "browseEndpoint");
        const albumsData = await this.constructRequest("browse", browseBody);
        return (0, traverse_1.traverseList)(albumsData, "musicTwoRowItemRenderer").map(item => AlbumParser_1.default.parseArtistAlbum(item, {
            artistId,
            name: (0, traverse_1.traverseString)(albumsData, "header", "runs", "text"),
        }));
    }
    /**
     * Get all possible information of an Album
     *
     * @param albumId Album ID
     * @returns Album Data
     */
    async getAlbum(albumId) {
        const data = await this.constructRequest("browse", {
            browseId: albumId,
        });
        return AlbumParser_1.default.parse(data, albumId);
    }
    /**
     * Get all possible information of a Playlist except the tracks
     *
     * @param playlistId Playlist ID
     * @returns Playlist Data
     */
    async getPlaylist(playlistId) {
        if (playlistId.startsWith("PL"))
            playlistId = "VL" + playlistId;
        const data = await this.constructRequest("browse", {
            browseId: playlistId,
        });
        return PlaylistParser_1.default.parse(data, playlistId);
    }
    /**
     * Get all videos in a Playlist
     *
     * @param playlistId Playlist ID
     * @returns Playlist's Videos
     */
    async getPlaylistVideos(playlistId) {
        if (playlistId.startsWith("PL"))
            playlistId = "VL" + playlistId;
        const playlistData = await this.constructRequest("browse", {
            browseId: playlistId,
        });
        const songs = (0, traverse_1.traverseList)(playlistData, "musicPlaylistShelfRenderer", "musicResponsiveListItemRenderer");
        let continuation = (0, traverse_1.traverse)(playlistData, "continuation");
        while (!(continuation instanceof Array)) {
            const songsData = await this.constructRequest("browse", {}, { continuation });
            songs.push(...(0, traverse_1.traverseList)(songsData, "musicResponsiveListItemRenderer"));
            continuation = (0, traverse_1.traverse)(songsData, "continuation");
        }
        return songs.map(VideoParser_1.default.parsePlaylistVideo);
    }
    /**
     * Get content for the home page.
     *
     * @returns Mixed HomePageContent
     */
    async getHome() {
        const results = [];
        const page = await this.constructRequest("browse", { browseId: constants_1.FE_MUSIC_HOME });
        (0, traverse_1.traverseList)(page, "sectionListRenderer", "contents").forEach(content => {
            const parsed = Parser_1.default.parseMixedContent(content);
            parsed && results.push(parsed);
        });
        let continuation = (0, traverse_1.traverseString)(page, "continuation");
        while (continuation) {
            const nextPage = await this.constructRequest("browse", {}, { continuation });
            (0, traverse_1.traverseList)(nextPage, "sectionListContinuation", "contents").forEach(content => {
                const parsed = Parser_1.default.parseMixedContent(content);
                parsed && results.push(parsed);
            });
            continuation = (0, traverse_1.traverseString)(nextPage, "continuation");
        }
        return results;
    }
}
exports.default = YTMusic;
