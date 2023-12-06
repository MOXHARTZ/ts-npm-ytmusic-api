"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../schemas");
const checkType_1 = __importDefault(require("../utils/checkType"));
const traverseList_1 = __importDefault(require("../utils/traverseList"));
const traverseString_1 = __importDefault(require("../utils/traverseString"));
const AlbumParser_1 = __importDefault(require("./AlbumParser"));
const SongParser_1 = __importDefault(require("./SongParser"));
const VideoParser_1 = __importDefault(require("./VideoParser"));
const PlaylistParser_1 = __importDefault(require("./PlaylistParser"));
class ArtistParser {
    static parse(data, artistId) {
        const artistBasic = {
            artistId,
            name: (0, traverseString_1.default)(data, "header", "title", "text")(),
        };
        const description = (0, traverseString_1.default)(data, "header", "description", "text")();
        return (0, checkType_1.default)({
            type: "ARTIST",
            ...artistBasic,
            thumbnails: (0, traverseList_1.default)(data, "header", "thumbnails"),
            description,
            topSongs: (0, traverseList_1.default)(data, "musicShelfRenderer", "contents").map(item => SongParser_1.default.parseArtistTopSong(item, artistBasic)),
            topAlbums: (0, traverseList_1.default)(data, "musicCarouselShelfRenderer")
                ?.at(0)
                ?.contents.map((item) => AlbumParser_1.default.parseArtistTopAlbum(item, artistBasic)) ?? [],
            topSingles: (0, traverseList_1.default)(data, "musicCarouselShelfRenderer")
                ?.at(1)
                ?.contents.map((item) => AlbumParser_1.default.parseArtistTopAlbum(item, artistBasic)) ?? [],
            topVideos: (0, traverseList_1.default)(data, "musicCarouselShelfRenderer")
                ?.at(2)
                ?.contents.map((item) => VideoParser_1.default.parseArtistTopVideo(item, artistBasic)) ?? [],
            featuredOn: (0, traverseList_1.default)(data, "musicCarouselShelfRenderer")
                ?.at(3)
                ?.contents.map((item) => PlaylistParser_1.default.parseArtistFeaturedOn(item)) ?? [],
            similarArtists: (0, traverseList_1.default)(data, "musicCarouselShelfRenderer")
                ?.at(4)
                ?.contents.map((item) => this.parseSimilarArtists(item)) ?? [],
        }, schemas_1.ArtistFull);
    }
    static parseSearchResult(item) {
        const flexColumns = (0, traverseList_1.default)(item, "flexColumns");
        return (0, checkType_1.default)({
            type: "ARTIST",
            artistId: (0, traverseString_1.default)(item, "browseId")(),
            name: (0, traverseString_1.default)(flexColumns[0], "runs", "text")(),
            thumbnails: (0, traverseList_1.default)(item, "thumbnails"),
        }, schemas_1.ArtistDetailed);
    }
    static parseSimilarArtists(item) {
        return (0, checkType_1.default)({
            type: "ARTIST",
            artistId: (0, traverseString_1.default)(item, "browseId")(),
            name: (0, traverseString_1.default)(item, "runs", "text")(),
            thumbnails: (0, traverseList_1.default)(item, "thumbnails"),
        }, schemas_1.ArtistDetailed);
    }
}
exports.default = ArtistParser;
