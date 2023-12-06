"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const tough_cookie_1 = require("tough-cookie");
const AlbumParser_1 = __importDefault(require("./parsers/AlbumParser"));
const ArtistParser_1 = __importDefault(require("./parsers/ArtistParser"));
const PlaylistParser_1 = __importDefault(require("./parsers/PlaylistParser"));
const SearchParser_1 = __importDefault(require("./parsers/SearchParser"));
const SongParser_1 = __importDefault(require("./parsers/SongParser"));
const VideoParser_1 = __importDefault(require("./parsers/VideoParser"));
const traverse_1 = __importDefault(require("./utils/traverse"));
const traverseList_1 = __importDefault(require("./utils/traverseList"));
const traverseString_1 = __importDefault(require("./utils/traverseString"));
class YTMusic {
    cookiejar;
    config;
    client;
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
                    this.cookiejar.setCookieSync(cookie, res.config.baseURL);
                }
            }
            return res;
        });
    }
    /**
     * Initializes the API
     */
    async initialize(cookies, options) {
        if (cookies) {
            for (const cookieString of cookies.split("; ")) {
                const cookie = tough_cookie_1.Cookie.parse(`${cookieString}`);
                if (!cookie)
                    return;
                this.cookiejar.setCookieSync(cookie, "https://music.youtube.com/");
            }
        }
        if (options) {
            if (options.localAddress) {
                const localAddress = options.localAddress;
                const cleanedString = localAddress.replace(/^https?:\/\//, '');
                const [userInfo, hostAndPort] = cleanedString.split('@');
                if (!userInfo || !hostAndPort)
                    throw new Error("Invalid localAddress. Username or hostAndPort not found");
                const [username, password] = userInfo.split(':');
                let [host, port] = hostAndPort.split(':');
                if (!host)
                    throw new Error("Invalid localAddress. Host not found");
                if (!port || isNaN(Number(port)))
                    throw new Error("Invalid localAddress. Port not found");
                if (!username)
                    throw new Error("Invalid localAddress. Username not found");
                if (!password)
                    throw new Error("Invalid localAddress. Password not found");
                if (!port)
                    throw new Error("Invalid localAddress. Port not found");
                port = port;
                this.client.defaults.proxy = {
                    host,
                    port,
                    auth: {
                        username,
                        password
                    },
                    protocol: 'http'
                };
            }
        }
        console.log('TS NPM YTMUSIC ::: proxy', this.client.defaults.proxy);
        const html = (await this.client.get("/", {
            proxy: this.client.defaults.proxy,
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
        return this;
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
            proxy: this.client.defaults.proxy,
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
        return (0, traverseList_1.default)(await this.constructRequest("music/get_search_suggestions", {
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
        return (0, traverseList_1.default)(searchData, "musicResponsiveListItemRenderer")
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
        return (0, traverseList_1.default)(searchData, "musicResponsiveListItemRenderer").map(SongParser_1.default.parseSearchResult);
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
        return (0, traverseList_1.default)(searchData, "musicResponsiveListItemRenderer").map(VideoParser_1.default.parseSearchResult);
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
        return (0, traverseList_1.default)(searchData, "musicResponsiveListItemRenderer").map(ArtistParser_1.default.parseSearchResult);
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
        return (0, traverseList_1.default)(searchData, "musicResponsiveListItemRenderer").map(AlbumParser_1.default.parseSearchResult);
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
        return (0, traverseList_1.default)(searchData, "musicResponsiveListItemRenderer").map(PlaylistParser_1.default.parseSearchResult);
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
        const artistData = await this.constructRequest("browse", {
            browseId: artistId,
        });
        const browseToken = (0, traverse_1.default)(artistData, "musicShelfRenderer", "title", "browseId");
        if (browseToken instanceof Array)
            return [];
        const songsData = await this.constructRequest("browse", {
            browseId: browseToken,
        });
        const continueToken = (0, traverse_1.default)(songsData, "continuation");
        const moreSongsData = await this.constructRequest("browse", {}, { continuation: continueToken });
        return [
            ...(0, traverseList_1.default)(songsData, "musicResponsiveListItemRenderer"),
            ...(0, traverseList_1.default)(moreSongsData, "musicResponsiveListItemRenderer"),
        ].map(SongParser_1.default.parseArtistSong);
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
        const artistAlbumsData = (0, traverseList_1.default)(artistData, "musicCarouselShelfRenderer")[0];
        const browseBody = (0, traverse_1.default)(artistAlbumsData, "moreContentButton", "browseEndpoint");
        const albumsData = await this.constructRequest("browse", browseBody);
        return (0, traverseList_1.default)(albumsData, "musicTwoRowItemRenderer").map(item => AlbumParser_1.default.parseArtistAlbum(item, {
            artistId,
            name: (0, traverseString_1.default)(albumsData, "header", "runs", "text")(),
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
        const songs = (0, traverseList_1.default)(playlistData, "musicPlaylistShelfRenderer", "musicResponsiveListItemRenderer");
        let continuation = (0, traverse_1.default)(playlistData, "continuation");
        while (!(continuation instanceof Array)) {
            const songsData = await this.constructRequest("browse", {}, { continuation });
            songs.push(...(0, traverseList_1.default)(songsData, "musicResponsiveListItemRenderer"));
            continuation = (0, traverse_1.default)(songsData, "continuation");
        }
        return songs.map(VideoParser_1.default.parsePlaylistVideo);
    }
}
exports.default = YTMusic;
