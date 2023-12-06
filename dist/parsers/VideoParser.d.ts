import { ArtistBasic, VideoDetailed, VideoFull } from "../schemas";
export default class VideoParser {
    static parse(data: any): VideoFull;
    static parseSearchResult(item: any): VideoDetailed;
    static parseArtistTopVideo(item: any, artistBasic: ArtistBasic): Omit<VideoDetailed, "duration">;
    static parsePlaylistVideo(item: any): VideoDetailed;
}
