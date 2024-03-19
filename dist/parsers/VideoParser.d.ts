import { ArtistBasic, VideoDetailed, VideoFull } from "../@types/types";
export default class VideoParser {
    static parse(data: any): VideoFull;
    static parseSearchResult(item: any): VideoDetailed;
    static parseArtistTopVideo(item: any, artistBasic: ArtistBasic): VideoDetailed;
    static parsePlaylistVideo(item: any): VideoDetailed;
}
