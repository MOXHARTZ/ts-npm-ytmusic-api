import { ArtistDetailed, ArtistFull } from "../schemas";
export default class ArtistParser {
    static parse(data: any, artistId: string): ArtistFull;
    static parseSearchResult(item: any): ArtistDetailed;
    static parseSimilarArtists(item: any): ArtistDetailed;
}
