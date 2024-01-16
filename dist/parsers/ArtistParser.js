"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../@types/types");
const checkType_1 = __importDefault(require("../utils/checkType"));
const traverse_1 = require("../utils/traverse");
const AlbumParser_1 = __importDefault(require("./AlbumParser"));
const PlaylistParser_1 = __importDefault(require("./PlaylistParser"));
const SongParser_1 = __importDefault(require("./SongParser"));
const VideoParser_1 = __importDefault(require("./VideoParser"));
class ArtistParser {
    static parse(data, artistId) {
        const artistBasic = {
            artistId,
            name: (0, traverse_1.traverseString)(data, "header", "title", "text"),
        };
        return (0, checkType_1.default)({
            type: "ARTIST",
            ...artistBasic,
            thumbnails: (0, traverse_1.traverseList)(data, "header", "thumbnails"),
            topSongs: (0, traverse_1.traverseList)(data, "musicShelfRenderer", "contents").map(item => SongParser_1.default.parseArtistTopSong(item, artistBasic)),
            topAlbums: (0, traverse_1.traverseList)(data, "musicCarouselShelfRenderer")
                ?.at(0)
                ?.contents.map((item) => AlbumParser_1.default.parseArtistTopAlbum(item, artistBasic)) ?? [],
            topSingles: (0, traverse_1.traverseList)(data, "musicCarouselShelfRenderer")
                ?.at(1)
                ?.contents.map((item) => AlbumParser_1.default.parseArtistTopAlbum(item, artistBasic)) ?? [],
            topVideos: (0, traverse_1.traverseList)(data, "musicCarouselShelfRenderer")
                ?.at(2)
                ?.contents.map((item) => VideoParser_1.default.parseArtistTopVideo(item, artistBasic)) ?? [],
            featuredOn: (0, traverse_1.traverseList)(data, "musicCarouselShelfRenderer")
                ?.at(3)
                ?.contents.map((item) => PlaylistParser_1.default.parseArtistFeaturedOn(item, artistBasic)) ?? [],
            similarArtists: (0, traverse_1.traverseList)(data, "musicCarouselShelfRenderer")
                ?.at(4)
                ?.contents.map((item) => this.parseSimilarArtists(item)) ?? [],
        }, types_1.ArtistFull);
    }
    static parseSearchResult(item) {
        const columns = (0, traverse_1.traverseList)(item, "flexColumns", "runs").flat();
        // No specific way to identify the title
        const title = columns[0];
        return (0, checkType_1.default)({
            type: "ARTIST",
            artistId: (0, traverse_1.traverseString)(item, "browseId"),
            name: (0, traverse_1.traverseString)(title, "text"),
            thumbnails: (0, traverse_1.traverseList)(item, "thumbnails"),
        }, types_1.ArtistDetailed);
    }
    static parseSimilarArtists(item) {
        return (0, checkType_1.default)({
            type: "ARTIST",
            artistId: (0, traverse_1.traverseString)(item, "browseId"),
            name: (0, traverse_1.traverseString)(item, "runs", "text"),
            thumbnails: (0, traverse_1.traverseList)(item, "thumbnails"),
        }, types_1.ArtistDetailed);
    }
}
exports.default = ArtistParser;
