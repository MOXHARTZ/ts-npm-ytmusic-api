import { AlbumDetailed, AlbumFull, ArtistDetailed, ArtistFull, HomePageContent, PlaylistDetailed, PlaylistFull, SearchResult, SongDetailed, SongFull, VideoDetailed, VideoFull } from "./@types/types";
export default class YTMusic {
    private cookiejar;
    private config?;
    private client;
    private agent;
    initialized: boolean;
    /**
     * Creates an instance of YTMusic
     * Make sure to call initialize()
     */
    constructor();
    /**
     * Initializes the API
     */
    initialize(options?: {
        cookies?: string;
        GL?: string;
        HL?: string;
        localAddress?: string;
        force?: boolean;
    }): Promise<this | undefined>;
    isInitialized(): Promise<boolean>;
    /**
     * Constructs a basic YouTube Music API request with all essential headers
     * and body parameters needed to make the API work
     *
     * @param endpoint Endpoint for the request
     * @param body Body
     * @param query Search params
     * @returns Raw response from YouTube Music API which needs to be parsed
     */
    private constructRequest;
    /**
     * Get a list of search suggestiong based on the query
     *
     * @param query Query string
     * @returns Search suggestions
     */
    getSearchSuggestions(query: string): Promise<string[]>;
    /**
     * Searches YouTube Music API for results
     *
     * @param query Query string
     */
    search(query: string): Promise<(typeof SearchResult.infer)[]>;
    /**
     * Searches YouTube Music API for songs
     *
     * @param query Query string
     */
    searchSongs(query: string): Promise<(typeof SongDetailed.infer)[]>;
    /**
     * Searches YouTube Music API for videos
     *
     * @param query Query string
     */
    searchVideos(query: string): Promise<(typeof VideoDetailed.infer)[]>;
    /**
     * Searches YouTube Music API for artists
     *
     * @param query Query string
     */
    searchArtists(query: string): Promise<(typeof ArtistDetailed.infer)[]>;
    /**
     * Searches YouTube Music API for albums
     *
     * @param query Query string
     */
    searchAlbums(query: string): Promise<(typeof AlbumDetailed.infer)[]>;
    /**
     * Searches YouTube Music API for playlists
     *
     * @param query Query string
     */
    searchPlaylists(query: string): Promise<(typeof PlaylistDetailed.infer)[]>;
    /**
     * Get all possible information of a Song
     *
     * @param videoId Video ID
     * @returns Song Data
     */
    getSong(videoId: string): Promise<typeof SongFull.infer>;
    /**
     * Get all possible information of a Video
     *
     * @param videoId Video ID
     * @returns Video Data
     */
    getVideo(videoId: string): Promise<typeof VideoFull.infer>;
    /**
     * Get lyrics of a specific Song
     *
     * @param videoId Video ID
     * @returns Lyrics
     */
    getLyrics(videoId: string): Promise<string[] | null>;
    /**
     * Get all possible information of an Artist
     *
     * @param artistId Artist ID
     * @returns Artist Data
     */
    getArtist(artistId: string): Promise<typeof ArtistFull.infer>;
    /**
     * Get all of Artist's Songs
     *
     * @param artistId Artist ID
     * @returns Artist's Songs
     */
    getArtistSongs(artistId: string): Promise<(typeof SongDetailed.infer)[]>;
    /**
     * Get all of Artist's Albums
     *
     * @param artistId Artist ID
     * @returns Artist's Albums
     */
    getArtistAlbums(artistId: string): Promise<(typeof AlbumDetailed.infer)[]>;
    /**
     * Get all possible information of an Album
     *
     * @param albumId Album ID
     * @returns Album Data
     */
    getAlbum(albumId: string): Promise<typeof AlbumFull.infer>;
    /**
     * Get all possible information of a Playlist except the tracks
     *
     * @param playlistId Playlist ID
     * @returns Playlist Data
     */
    getPlaylist(playlistId: string): Promise<typeof PlaylistFull.infer>;
    /**
     * Get all videos in a Playlist
     *
     * @param playlistId Playlist ID
     * @returns Playlist's Videos
     */
    getPlaylistVideos(playlistId: string): Promise<(typeof VideoDetailed.infer)[]>;
    /**
     * Get content for the home page.
     *
     * @returns Mixed HomePageContent
     */
    getHome(): Promise<HomePageContent[]>;
}
