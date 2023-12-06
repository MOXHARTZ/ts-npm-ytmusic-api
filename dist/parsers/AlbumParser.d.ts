import { AlbumDetailed, AlbumFull, ArtistBasic } from "../schemas";
export default class AlbumParser {
    static parse(data: any, albumId: string): AlbumFull;
    static parseSearchResult(item: any): AlbumDetailed;
    static parseArtistAlbum(item: any, artistBasic: ArtistBasic): AlbumDetailed;
    static parseArtistTopAlbum(item: any, artistBasic: ArtistBasic): AlbumDetailed;
    private static processYear;
}
