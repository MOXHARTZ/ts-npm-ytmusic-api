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
class SongParser {
    static parse(data) {
        return (0, checkType_1.default)({
            type: "SONG",
            videoId: (0, traverse_1.traverseString)(data, "videoDetails", "videoId"),
            name: (0, traverse_1.traverseString)(data, "videoDetails", "title"),
            artist: {
                name: (0, traverse_1.traverseString)(data, "author"),
                artistId: (0, traverse_1.traverseString)(data, "videoDetails", "channelId"),
            },
            duration: +(0, traverse_1.traverseString)(data, "videoDetails", "lengthSeconds"),
            thumbnails: (0, traverse_1.traverseList)(data, "videoDetails", "thumbnails"),
            formats: (0, traverse_1.traverseList)(data, "streamingData", "formats"),
            adaptiveFormats: (0, traverse_1.traverseList)(data, "streamingData", "adaptiveFormats"),
        }, types_1.SongFull);
    }
    static parseSearchResult(item) {
        const columns = (0, traverse_1.traverseList)(item, "flexColumns", "runs");
        // It is not possible to identify the title and author
        const title = columns[0];
        const artist = columns[1];
        const album = columns.find(filters_1.isAlbum) ?? null;
        const duration = columns.find(filters_1.isDuration);
        return (0, checkType_1.default)({
            type: "SONG",
            videoId: (0, traverse_1.traverseString)(item, "playlistItemData", "videoId"),
            name: (0, traverse_1.traverseString)(title, "text"),
            artist: {
                name: (0, traverse_1.traverseString)(artist, "text"),
                artistId: (0, traverse_1.traverseString)(artist, "browseId") || null,
            },
            album: album && {
                name: (0, traverse_1.traverseString)(album, "text"),
                albumId: (0, traverse_1.traverseString)(album, "browseId"),
            },
            duration: Parser_1.default.parseDuration(duration?.text),
            thumbnails: (0, traverse_1.traverseList)(item, "thumbnails"),
        }, types_1.SongDetailed);
    }
    static parseArtistSong(item, artistBasic) {
        const columns = (0, traverse_1.traverseList)(item, "flexColumns", "runs").flat();
        const title = columns.find(filters_1.isTitle);
        const album = columns.find(filters_1.isAlbum);
        const duration = columns.find(filters_1.isDuration);
        return (0, checkType_1.default)({
            type: "SONG",
            videoId: (0, traverse_1.traverseString)(item, "playlistItemData", "videoId"),
            name: (0, traverse_1.traverseString)(title, "text"),
            artist: artistBasic,
            album: {
                name: (0, traverse_1.traverseString)(album, "text"),
                albumId: (0, traverse_1.traverseString)(album, "browseId"),
            },
            duration: duration ? Parser_1.default.parseDuration(duration.text) : null,
            thumbnails: (0, traverse_1.traverseList)(item, "thumbnails"),
        }, types_1.SongDetailed);
    }
    static parseArtistTopSong(item, artistBasic) {
        const columns = (0, traverse_1.traverseList)(item, "flexColumns", "runs").flat();
        const title = columns.find(filters_1.isTitle);
        const album = columns.find(filters_1.isAlbum);
        return (0, checkType_1.default)({
            type: "SONG",
            videoId: (0, traverse_1.traverseString)(item, "playlistItemData", "videoId"),
            name: (0, traverse_1.traverseString)(title, "text"),
            artist: artistBasic,
            album: {
                name: (0, traverse_1.traverseString)(album, "text"),
                albumId: (0, traverse_1.traverseString)(album, "browseId"),
            },
            duration: null,
            thumbnails: (0, traverse_1.traverseList)(item, "thumbnails"),
        }, types_1.SongDetailed);
    }
    static parseAlbumSong(item, artistBasic, albumBasic, thumbnails) {
        const columns = (0, traverse_1.traverseList)(item, "flexColumns", "runs").flat();
        const title = columns.find(filters_1.isTitle);
        const duration = columns.find(filters_1.isDuration);
        return (0, checkType_1.default)({
            type: "SONG",
            videoId: (0, traverse_1.traverseString)(item, "playlistItemData", "videoId"),
            name: (0, traverse_1.traverseString)(title, "text"),
            artist: artistBasic,
            album: albumBasic,
            duration: duration ? Parser_1.default.parseDuration(duration.text) : null,
            thumbnails,
        }, types_1.SongDetailed);
    }
}
exports.default = SongParser;
