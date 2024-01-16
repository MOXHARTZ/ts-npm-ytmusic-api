"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../@types/types");
const checkType_1 = __importDefault(require("../utils/checkType"));
const filters_1 = require("../utils/filters");
const traverse_1 = require("../utils/traverse");
class PlaylistParser {
    static parse(data, playlistId) {
        const artist = (0, traverse_1.traverse)(data, "header", "subtitle");
        return (0, checkType_1.default)({
            type: "PLAYLIST",
            playlistId,
            name: (0, traverse_1.traverseString)(data, "header", "title", "text"),
            artist: {
                name: (0, traverse_1.traverseString)(artist, "text"),
                artistId: (0, traverse_1.traverseString)(artist, "browseId") || null,
            },
            videoCount: +(0, traverse_1.traverseList)(data, "header", "secondSubtitle", "text")
                .at(2)
                .split(" ")
                .at(0)
                .replaceAll(",", "") ?? null,
            thumbnails: (0, traverse_1.traverseList)(data, "header", "thumbnails"),
        }, types_1.PlaylistFull);
    }
    static parseSearchResult(item) {
        const columns = (0, traverse_1.traverseList)(item, "flexColumns", "runs").flat();
        // No specific way to identify the title
        const title = columns[0];
        const artist = columns.find(filters_1.isArtist) || columns[3];
        return (0, checkType_1.default)({
            type: "PLAYLIST",
            playlistId: (0, traverse_1.traverseString)(item, "overlay", "playlistId"),
            name: (0, traverse_1.traverseString)(title, "text"),
            artist: {
                name: (0, traverse_1.traverseString)(artist, "text"),
                artistId: (0, traverse_1.traverseString)(artist, "browseId") || null,
            },
            thumbnails: (0, traverse_1.traverseList)(item, "thumbnails"),
        }, types_1.PlaylistDetailed);
    }
    static parseArtistFeaturedOn(item, artistBasic) {
        return (0, checkType_1.default)({
            type: "PLAYLIST",
            playlistId: (0, traverse_1.traverseString)(item, "navigationEndpoint", "browseId"),
            name: (0, traverse_1.traverseString)(item, "runs", "text"),
            artist: artistBasic,
            thumbnails: (0, traverse_1.traverseList)(item, "thumbnails"),
        }, types_1.PlaylistDetailed);
    }
    static parseWatchPlaylist(item) {
        return (0, checkType_1.default)({
            type: "PLAYLIST",
            playlistId: (0, traverse_1.traverseString)(item, "navigationEndpoint", "playlistId"),
            name: (0, traverse_1.traverseString)(item, "runs", "text"),
            thumbnails: (0, traverse_1.traverseList)(item, "thumbnails"),
        }, types_1.PlaylistWatch);
    }
}
exports.default = PlaylistParser;
