import { AlbumBasic, ArtistBasic, SongDetailed, SongFull, ThumbnailFull } from "../@types/types";
export default class SongParser {
    static parse(data: any): SongFull;
    static parseSearchResult(item: any): SongDetailed;
    static parseArtistSong(item: any, artistBasic: ArtistBasic): SongDetailed;
    static parseArtistTopSong(item: any, artistBasic: ArtistBasic): SongDetailed;
    static parseAlbumSong(item: any, artistBasic: ArtistBasic, albumBasic: AlbumBasic, thumbnails: ThumbnailFull[]): SongDetailed;
}
