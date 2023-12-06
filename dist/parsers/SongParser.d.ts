import { AlbumBasic, ArtistBasic, SongDetailed, SongFull, ThumbnailFull } from "../schemas";
export default class SongParser {
    static parse(data: any): SongFull;
    static parseSearchResult(item: any): SongDetailed;
    static parseArtistSong(item: any): SongDetailed;
    static parseArtistTopSong(item: any, artistBasic: ArtistBasic): Omit<SongDetailed, "duration">;
    static parseAlbumSong(item: any, artists: ArtistBasic[], albumBasic: AlbumBasic, thumbnails: ThumbnailFull[]): SongDetailed;
}
