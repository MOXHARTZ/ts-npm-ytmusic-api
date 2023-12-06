"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../schemas");
const checkType_1 = __importDefault(require("../utils/checkType"));
const traverseList_1 = __importDefault(require("../utils/traverseList"));
const traverseString_1 = __importDefault(require("../utils/traverseString"));
class PlaylistParser {
    static parse(data, playlistId) {
        return (0, checkType_1.default)({
            type: "PLAYLIST",
            playlistId,
            name: (0, traverseString_1.default)(data, "header", "title", "text")(),
            artist: {
                artistId: (0, traverseString_1.default)(data, "header", "subtitle", "browseId")(),
                name: (0, traverseString_1.default)(data, "header", "subtitle", "text")(2),
            },
            videoCount: +(0, traverseList_1.default)(data, "header", "secondSubtitle", "text")
                .at(2)
                .split(" ")
                .at(0)
                .replaceAll(",", "") ?? null,
            thumbnails: (0, traverseList_1.default)(data, "header", "thumbnails"),
        }, schemas_1.PlaylistFull);
    }
    static parseSearchResult(item) {
        const flexColumns = (0, traverseList_1.default)(item, "flexColumns");
        return (0, checkType_1.default)({
            type: "PLAYLIST",
            playlistId: (0, traverseString_1.default)(item, "overlay", "playlistId")(),
            name: (0, traverseString_1.default)(flexColumns[0], "runs", "text")(),
            artist: {
                artistId: (0, traverseString_1.default)(flexColumns[1], "browseId")(),
                name: (0, traverseString_1.default)(flexColumns[1], "runs", "text")(-3),
            },
            thumbnails: (0, traverseList_1.default)(item, "thumbnails"),
        }, schemas_1.PlaylistDetailed);
    }
    static parseArtistFeaturedOn(item) {
        return (0, checkType_1.default)({
            type: "PLAYLIST",
            playlistId: (0, traverseString_1.default)(item, "navigationEndpoint", "browseId")(),
            name: (0, traverseString_1.default)(item, "runs", "text")(),
            artist: {
                artistId: (0, traverseString_1.default)(item, "browseId")(),
                name: (0, traverseString_1.default)(item, "runs", "text")(-3),
            },
            thumbnails: (0, traverseList_1.default)(item, "thumbnails"),
        }, schemas_1.PlaylistDetailed);
    }
}
exports.default = PlaylistParser;
