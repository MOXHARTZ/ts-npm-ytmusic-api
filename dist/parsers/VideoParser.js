"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../schemas");
const checkType_1 = __importDefault(require("../utils/checkType"));
const traverse_1 = __importDefault(require("../utils/traverse"));
const traverseList_1 = __importDefault(require("../utils/traverseList"));
const traverseString_1 = __importDefault(require("../utils/traverseString"));
const Parser_1 = __importDefault(require("./Parser"));
class VideoParser {
    static parse(data) {
        return {
            type: "VIDEO",
            videoId: (0, traverseString_1.default)(data, "videoDetails", "videoId")(),
            name: (0, traverseString_1.default)(data, "videoDetails", "title")(),
            artists: [
                {
                    artistId: (0, traverseString_1.default)(data, "videoDetails", "channelId")(),
                    name: (0, traverseString_1.default)(data, "author")(),
                },
            ],
            duration: +(0, traverseString_1.default)(data, "videoDetails", "lengthSeconds")(),
            thumbnails: (0, traverseList_1.default)(data, "videoDetails", "thumbnails"),
            description: (0, traverseString_1.default)(data, "description")(),
            unlisted: (0, traverse_1.default)(data, "unlisted"),
            familySafe: (0, traverse_1.default)(data, "familySafe"),
            paid: (0, traverse_1.default)(data, "paid"),
            tags: (0, traverseList_1.default)(data, "tags"),
        };
    }
    static parseSearchResult(item) {
        const flexColumns = (0, traverseList_1.default)(item, "flexColumns");
        const videoId = (0, traverseString_1.default)(item, "playNavigationEndpoint", "videoId")();
        return {
            type: "VIDEO",
            videoId,
            name: (0, traverseString_1.default)(flexColumns[0], "runs", "text")(),
            artists: (0, traverseList_1.default)(flexColumns[1], "runs")
                .filter(run => "navigationEndpoint" in run)
                .map(run => ({
                artistId: (0, traverseString_1.default)(run, "browseId")(),
                name: (0, traverseString_1.default)(run, "text")(),
            })),
            duration: Parser_1.default.parseDuration((0, traverseString_1.default)(flexColumns[1], "text")(-1)),
            thumbnails: (0, traverseList_1.default)(item, "thumbnails"),
        };
    }
    static parseArtistTopVideo(item, artistBasic) {
        return {
            type: "VIDEO",
            videoId: (0, traverseString_1.default)(item, "videoId")(),
            name: (0, traverseString_1.default)(item, "runs", "text")(),
            artists: [artistBasic],
            thumbnails: (0, traverseList_1.default)(item, "thumbnails"),
        };
    }
    static parsePlaylistVideo(item) {
        const flexColumns = (0, traverseList_1.default)(item, "flexColumns");
        const videoId = (0, traverseString_1.default)(item, "playNavigationEndpoint", "videoId")() ||
            (0, traverseList_1.default)(item, "thumbnails")[0].url.match(/https:\/\/i\.ytimg\.com\/vi\/(.+)\//)[1];
        return (0, checkType_1.default)({
            type: "VIDEO",
            videoId,
            name: (0, traverseString_1.default)(flexColumns[0], "runs", "text")(),
            artists: (0, traverseList_1.default)(flexColumns[1], "runs")
                .filter(run => "navigationEndpoint" in run)
                .map(run => ({
                artistId: (0, traverseString_1.default)(run, "browseId")(),
                name: (0, traverseString_1.default)(run, "text")(),
            })),
            duration: Parser_1.default.parseDuration((0, traverseString_1.default)(item, "fixedColumns", "runs", "text")()),
            thumbnails: (0, traverseList_1.default)(item, "thumbnails"),
        }, schemas_1.VideoDetailed);
    }
}
exports.default = VideoParser;
