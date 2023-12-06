"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../schemas");
const checkType_1 = __importDefault(require("../utils/checkType"));
const traverseList_1 = __importDefault(require("../utils/traverseList"));
const traverseString_1 = __importDefault(require("../utils/traverseString"));
const SongParser_1 = __importDefault(require("./SongParser"));
class AlbumParser {
    static parse(data, albumId) {
        const albumBasic = {
            albumId,
            name: (0, traverseString_1.default)(data, "header", "title", "text")(),
        };
        const artists = (0, traverseList_1.default)(data, "header", "subtitle", "runs")
            .filter(run => "navigationEndpoint" in run)
            .map(run => ({
            artistId: (0, traverseString_1.default)(run, "browseId")(),
            name: (0, traverseString_1.default)(run, "text")(),
        }));
        const thumbnails = (0, traverseList_1.default)(data, "header", "thumbnails");
        return (0, checkType_1.default)({
            type: "ALBUM",
            ...albumBasic,
            playlistId: (0, traverseString_1.default)(data, "buttonRenderer", "playlistId")(),
            artists,
            year: AlbumParser.processYear((0, traverseString_1.default)(data, "header", "subtitle", "text")(-1)),
            thumbnails,
            description: (0, traverseString_1.default)(data, "description", "text")(),
            songs: (0, traverseList_1.default)(data, "musicResponsiveListItemRenderer").map(item => SongParser_1.default.parseAlbumSong(item, artists, albumBasic, thumbnails)),
        }, schemas_1.AlbumFull);
    }
    static parseSearchResult(item) {
        const flexColumns = (0, traverseList_1.default)(item, "flexColumns");
        return (0, checkType_1.default)({
            type: "ALBUM",
            albumId: (0, traverseString_1.default)(item, "browseId")(-1),
            playlistId: (0, traverseString_1.default)(item, "overlay", "playlistId")(),
            artists: (0, traverseList_1.default)(flexColumns[1], "runs")
                .filter(run => "navigationEndpoint" in run)
                .map(run => ({
                artistId: (0, traverseString_1.default)(run, "browseId")(),
                name: (0, traverseString_1.default)(run, "text")(),
            })),
            year: AlbumParser.processYear((0, traverseString_1.default)(flexColumns[1], "runs", "text")(-1)),
            name: (0, traverseString_1.default)(flexColumns[0], "runs", "text")(),
            thumbnails: (0, traverseList_1.default)(item, "thumbnails"),
        }, schemas_1.AlbumDetailed);
    }
    static parseArtistAlbum(item, artistBasic) {
        return (0, checkType_1.default)({
            type: "ALBUM",
            albumId: (0, traverseString_1.default)(item, "browseId")(-1),
            playlistId: (0, traverseString_1.default)(item, "thumbnailOverlay", "playlistId")(),
            name: (0, traverseString_1.default)(item, "title", "text")(),
            artists: [artistBasic],
            year: AlbumParser.processYear((0, traverseString_1.default)(item, "subtitle", "text")(-1)),
            thumbnails: (0, traverseList_1.default)(item, "thumbnails"),
        }, schemas_1.AlbumDetailed);
    }
    static parseArtistTopAlbum(item, artistBasic) {
        return (0, checkType_1.default)({
            type: "ALBUM",
            albumId: (0, traverseString_1.default)(item, "browseId")(-1),
            playlistId: (0, traverseString_1.default)(item, "musicPlayButtonRenderer", "playlistId")(),
            name: (0, traverseString_1.default)(item, "title", "text")(),
            artists: [artistBasic],
            year: AlbumParser.processYear((0, traverseString_1.default)(item, "subtitle", "text")(-1)),
            thumbnails: (0, traverseList_1.default)(item, "thumbnails"),
        }, schemas_1.AlbumDetailed);
    }
    static processYear(year) {
        return year.match(/^\d{4}$/) ? +year : null;
    }
}
exports.default = AlbumParser;
