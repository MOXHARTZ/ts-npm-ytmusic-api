import { z } from "zod";
import { AlbumDetailed, AlbumFull, ArtistDetailed, ArtistFull, PlaylistDetailed, PlaylistFull, SearchResult, SongDetailed, SongFull, VideoDetailed, VideoFull } from "./schemas";
export default class YTMusic {
    private cookiejar;
    private config?;
    private client;
    private agent;
    /**
     * Creates an instance of YTMusic
     * Make sure to call initialize()
     */
    constructor();
    /**
     * Initializes the API
     */
    initialize(cookies?: string, options?: {
        localAddress?: string;
    }): Promise<this | undefined>;
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
    search(query: string): Promise<z.infer<typeof SearchResult>[]>;
    /**
     * Searches YouTube Music API for songs
     *
     * @param query Query string
     */
    searchSongs(query: string): Promise<z.infer<typeof SongDetailed>[]>;
    /**
     * Searches YouTube Music API for videos
     *
     * @param query Query string
     */
    searchVideos(query: string): Promise<z.infer<typeof VideoDetailed>[]>;
    /**
     * Searches YouTube Music API for artists
     *
     * @param query Query string
     */
    searchArtists(query: string): Promise<z.infer<typeof ArtistDetailed>[]>;
    /**
     * Searches YouTube Music API for albums
     *
     * @param query Query string
     */
    searchAlbums(query: string): Promise<z.infer<typeof AlbumDetailed>[]>;
    /**
     * Searches YouTube Music API for playlists
     *
     * @param query Query string
     */
    searchPlaylists(query: string): Promise<z.infer<typeof PlaylistDetailed>[]>;
    /**
     * Get all possible information of a Song
     *
     * @param videoId Video ID
     * @returns Song Data
     */
    getSong(videoId: string): Promise<z.infer<typeof SongFull>>;
    /**
     * Get all possible information of a Video
     *
     * @param videoId Video ID
     * @returns Video Data
     */
    getVideo(videoId: string): Promise<z.infer<typeof VideoFull>>;
    /**
     * Get all possible information of an Artist
     *
     * @param artistId Artist ID
     * @returns Artist Data
     */
    getArtist(artistId: string): Promise<z.infer<typeof ArtistFull>>;
    /**
     * Get all of Artist's Songs
     *
     * @param artistId Artist ID
     * @returns Artist's Songs
     */
    getArtistSongs(artistId: string): Promise<z.infer<typeof SongDetailed>[]>;
    /**
     * Get all of Artist's Albums
     *
     * @param artistId Artist ID
     * @returns Artist's Albums
     */
    getArtistAlbums(artistId: string): Promise<z.infer<typeof AlbumDetailed>[]>;
    /**
     * Get all possible information of an Album
     *
     * @param albumId Album ID
     * @returns Album Data
     */
    getAlbum(albumId: string): Promise<z.infer<typeof AlbumFull>>;
    /**
     * Get all possible information of a Playlist except the tracks
     *
     * @param playlistId Playlist ID
     * @returns Playlist Data
     */
    getPlaylist(playlistId: string): Promise<z.infer<typeof PlaylistFull>>;
    /**
     * Get all videos in a Playlist
     *
     * @param playlistId Playlist ID
     * @returns Playlist's Videos
     */
    getPlaylistVideos(playlistId: string): Promise<z.infer<typeof VideoDetailed>[]>;
}
