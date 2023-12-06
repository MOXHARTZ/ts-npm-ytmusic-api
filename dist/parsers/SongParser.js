"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../schemas");
const checkType_1 = __importDefault(require("../utils/checkType"));
const traverseList_1 = __importDefault(require("../utils/traverseList"));
const traverseString_1 = __importDefault(require("../utils/traverseString"));
const Parser_1 = __importDefault(require("./Parser"));
class SongParser {
    static parse(data) {
        return (0, checkType_1.default)({
            type: "SONG",
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
            formats: (0, traverseList_1.default)(data, "streamingData", "formats"),
            adaptiveFormats: (0, traverseList_1.default)(data, "streamingData", "adaptiveFormats"),
        }, schemas_1.SongFull);
    }
    static parseSearchResult(item) {
        const flexColumns = (0, traverseList_1.default)(item, "flexColumns");
        return (0, checkType_1.default)({
            type: "SONG",
            videoId: (0, traverseString_1.default)(item, "playlistItemData", "videoId")(),
            name: (0, traverseString_1.default)(flexColumns[0], "runs", "text")(),
            artists: (0, traverseList_1.default)(flexColumns[1], "runs")
                .filter(run => "navigationEndpoint" in run)
                .map(run => ({
                artistId: (0, traverseString_1.default)(run, "browseId")(),
                name: (0, traverseString_1.default)(run, "text")(),
            }))
                .slice(0, -1),
            album: {
                albumId: (0, traverseString_1.default)(flexColumns[1], "runs", "browseId")(-1),
                name: (0, traverseString_1.default)(flexColumns[1], "runs", "text")(-3),
            },
            duration: Parser_1.default.parseDuration((0, traverseString_1.default)(flexColumns[1], "runs", "text")(-1)),
            thumbnails: (0, traverseList_1.default)(item, "thumbnails"),
        }, schemas_1.SongDetailed);
    }
    static parseArtistSong(item) {
        const flexColumns = (0, traverseList_1.default)(item, "flexColumns");
        const videoId = (0, traverseString_1.default)(item, "playlistItemData", "videoId")();
        return (0, checkType_1.default)({
            type: "SONG",
            videoId,
            name: (0, traverseString_1.default)(flexColumns[0], "runs", "text")(),
            artists: (0, traverseList_1.default)(flexColumns[1], "runs")
                .filter(run => "navigationEndpoint" in run)
                .map(run => ({
                artistId: (0, traverseString_1.default)(run, "browseId")(),
                name: (0, traverseString_1.default)(run, "text")(),
            })),
            album: {
                albumId: (0, traverseString_1.default)(flexColumns[2], "browseId")(),
                name: (0, traverseString_1.default)(flexColumns[2], "runs", "text")(),
            },
            duration: Parser_1.default.parseDuration((0, traverseString_1.default)(item, "fixedColumns", "runs", "text")()),
            thumbnails: (0, traverseList_1.default)(item, "thumbnails"),
        }, schemas_1.SongDetailed);
    }
    static parseArtistTopSong(item, artistBasic) {
        const flexColumns = (0, traverseList_1.default)(item, "flexColumns");
        const videoId = (0, traverseString_1.default)(item, "playlistItemData", "videoId")();
        return (0, checkType_1.default)({
            type: "SONG",
            videoId,
            name: (0, traverseString_1.default)(flexColumns[0], "runs", "text")(),
            artists: [artistBasic],
            album: {
                albumId: (0, traverseString_1.default)(flexColumns[2], "browseId")(),
                name: (0, traverseString_1.default)(flexColumns[2], "runs", "text")(),
            },
            thumbnails: (0, traverseList_1.default)(item, "thumbnails"),
        }, schemas_1.SongDetailed.omit({ duration: true }));
    }
    static parseAlbumSong(item, artists, albumBasic, thumbnails) {
        const flexColumns = (0, traverseList_1.default)(item, "flexColumns");
        const videoId = (0, traverseString_1.default)(item, "playlistItemData", "videoId")();
        return (0, checkType_1.default)({
            type: "SONG",
            videoId,
            name: (0, traverseString_1.default)(flexColumns[0], "runs", "text")(),
            artists,
            album: albumBasic,
            duration: Parser_1.default.parseDuration((0, traverseString_1.default)(item, "fixedColumns", "runs", "text")()),
            thumbnails,
        }, schemas_1.SongDetailed);
    }
}
exports.default = SongParser;
