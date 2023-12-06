import { PlaylistDetailed, PlaylistFull } from "../schemas";
export default class PlaylistParser {
    static parse(data: any, playlistId: string): PlaylistFull;
    static parseSearchResult(item: any): PlaylistDetailed;
    static parseArtistFeaturedOn(item: any): PlaylistDetailed;
}
