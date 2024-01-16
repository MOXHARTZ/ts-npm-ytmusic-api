import { ArtistBasic, PlaylistDetailed, PlaylistFull, PlaylistWatch } from "../@types/types";
export default class PlaylistParser {
    static parse(data: any, playlistId: string): PlaylistFull;
    static parseSearchResult(item: any): PlaylistDetailed;
    static parseArtistFeaturedOn(item: any, artistBasic: ArtistBasic): PlaylistDetailed;
    static parseWatchPlaylist(item: any): PlaylistWatch;
}
