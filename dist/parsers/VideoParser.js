"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../@types/types");
const checkType_1 = __importDefault(require("../utils/checkType"));
const filters_1 = require("../utils/filters");
const traverse_1 = require("../utils/traverse");
const Parser_1 = __importDefault(require("./Parser"));
class VideoParser {
    static parse(data) {
        return {
            type: "VIDEO",
            videoId: (0, traverse_1.traverseString)(data, "videoDetails", "videoId"),
            name: (0, traverse_1.traverseString)(data, "videoDetails", "title"),
            artist: {
                artistId: (0, traverse_1.traverseString)(data, "videoDetails", "channelId"),
                name: (0, traverse_1.traverseString)(data, "author"),
            },
            duration: +(0, traverse_1.traverseString)(data, "videoDetails", "lengthSeconds"),
            thumbnails: (0, traverse_1.traverseList)(data, "videoDetails", "thumbnails"),
            unlisted: (0, traverse_1.traverse)(data, "unlisted"),
            familySafe: (0, traverse_1.traverse)(data, "familySafe"),
            paid: (0, traverse_1.traverse)(data, "paid"),
            tags: (0, traverse_1.traverseList)(data, "tags"),
        };
    }
    static parseSearchResult(item) {
        const columns = (0, traverse_1.traverseList)(item, "flexColumns", "runs").flat();
        const title = columns.find(filters_1.isTitle);
        const artist = columns.find(filters_1.isArtist) || columns[1];
        const duration = columns.find(filters_1.isDuration);
        return {
            type: "VIDEO",
            videoId: (0, traverse_1.traverseString)(item, "playNavigationEndpoint", "videoId"),
            name: (0, traverse_1.traverseString)(title, "text"),
            artist: {
                artistId: (0, traverse_1.traverseString)(artist, "browseId") || null,
                name: (0, traverse_1.traverseString)(artist, "text"),
            },
            duration: Parser_1.default.parseDuration(duration.text),
            thumbnails: (0, traverse_1.traverseList)(item, "thumbnails"),
        };
    }
    static parseArtistTopVideo(item, artistBasic) {
        return {
            type: "VIDEO",
            videoId: (0, traverse_1.traverseString)(item, "videoId"),
            name: (0, traverse_1.traverseString)(item, "runs", "text"),
            artist: artistBasic,
            duration: null,
            thumbnails: (0, traverse_1.traverseList)(item, "thumbnails"),
        };
    }
    static parsePlaylistVideo(item) {
        const columns = (0, traverse_1.traverseList)(item, "flexColumns", "runs").flat();
        const title = columns.find(filters_1.isTitle) || columns[0];
        const artist = columns.find(filters_1.isArtist) || columns[1];
        const duration = columns.find(filters_1.isDuration);
        return (0, checkType_1.default)({
            type: "VIDEO",
            videoId: (0, traverse_1.traverseString)(item, "playNavigationEndpoint", "videoId") ||
                (0, traverse_1.traverseList)(item, "thumbnails")[0].url.match(/https:\/\/i\.ytimg\.com\/vi\/(.+)\//)[1],
            name: (0, traverse_1.traverseString)(title, "text"),
            artist: {
                name: (0, traverse_1.traverseString)(artist, "text"),
                artistId: (0, traverse_1.traverseString)(artist, "browseId") || null,
            },
            duration: duration ? Parser_1.default.parseDuration(duration.text) : null,
            thumbnails: (0, traverse_1.traverseList)(item, "thumbnails"),
        }, types_1.VideoDetailed);
    }
}
exports.default = VideoParser;
