import { ArtistDetailed, ArtistFull } from "../@types/types";
export default class ArtistParser {
    static parse(data: any, artistId: string): ArtistFull;
    static parseSearchResult(item: any): ArtistDetailed;
    static parseSimilarArtists(item: any): ArtistDetailed;
}
