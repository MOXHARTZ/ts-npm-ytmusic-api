"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../@types/types");
const checkType_1 = __importDefault(require("../utils/checkType"));
const filters_1 = require("../utils/filters");
const traverse_1 = require("../utils/traverse");
const SongParser_1 = __importDefault(require("./SongParser"));
class AlbumParser {
    static parse(data, albumId) {
        const albumBasic = {
            albumId,
            name: (0, traverse_1.traverseString)(data, "header", "title", "text"),
        };
        const artistData = (0, traverse_1.traverse)(data, "header", "subtitle", "runs");
        const artistBasic = {
            artistId: (0, traverse_1.traverseString)(artistData, "browseId") || null,
            name: (0, traverse_1.traverseString)(artistData, "text"),
        };
        const thumbnails = (0, traverse_1.traverseList)(data, "header", "thumbnails");
        return (0, checkType_1.default)({
            type: "ALBUM",
            ...albumBasic,
            playlistId: (0, traverse_1.traverseString)(data, "buttonRenderer", "playlistId"),
            artist: artistBasic,
            year: AlbumParser.processYear((0, traverse_1.traverseList)(data, "header", "subtitle", "text").at(-1)),
            thumbnails,
            songs: (0, traverse_1.traverseList)(data, "musicResponsiveListItemRenderer").map(item => SongParser_1.default.parseAlbumSong(item, artistBasic, albumBasic, thumbnails)),
        }, types_1.AlbumFull);
    }
    static parseSearchResult(item) {
        const columns = (0, traverse_1.traverseList)(item, "flexColumns", "runs").flat();
        // No specific way to identify the title
        const title = columns[0];
        const artist = columns.find(filters_1.isArtist) || columns[3];
        const playlistId = (0, traverse_1.traverseString)(item, "overlay", "playlistId") ||
            (0, traverse_1.traverseString)(item, "thumbnailOverlay", "playlistId");
        return (0, checkType_1.default)({
            type: "ALBUM",
            albumId: (0, traverse_1.traverseList)(item, "browseId").at(-1),
            playlistId,
            artist: {
                name: (0, traverse_1.traverseString)(artist, "text"),
                artistId: (0, traverse_1.traverseString)(artist, "browseId") || null,
            },
            year: AlbumParser.processYear(columns.at(-1)?.text),
            name: (0, traverse_1.traverseString)(title, "text"),
            thumbnails: (0, traverse_1.traverseList)(item, "thumbnails"),
        }, types_1.AlbumDetailed);
    }
    static parseArtistAlbum(item, artistBasic) {
        return (0, checkType_1.default)({
            type: "ALBUM",
            albumId: (0, traverse_1.traverseList)(item, "browseId").at(-1),
            playlistId: (0, traverse_1.traverseString)(item, "thumbnailOverlay", "playlistId"),
            name: (0, traverse_1.traverseString)(item, "title", "text"),
            artist: artistBasic,
            year: AlbumParser.processYear((0, traverse_1.traverseList)(item, "subtitle", "text").at(-1)),
            thumbnails: (0, traverse_1.traverseList)(item, "thumbnails"),
        }, types_1.AlbumDetailed);
    }
    static parseArtistTopAlbum(item, artistBasic) {
        return (0, checkType_1.default)({
            type: "ALBUM",
            albumId: (0, traverse_1.traverseList)(item, "browseId").at(-1),
            playlistId: (0, traverse_1.traverseString)(item, "musicPlayButtonRenderer", "playlistId"),
            name: (0, traverse_1.traverseString)(item, "title", "text"),
            artist: artistBasic,
            year: AlbumParser.processYear((0, traverse_1.traverseList)(item, "subtitle", "text").at(-1)),
            thumbnails: (0, traverse_1.traverseList)(item, "thumbnails"),
        }, types_1.AlbumDetailed);
    }
    static processYear(year) {
        return year && year.match(/^\d{4}$/) ? +year : null;
    }
}
exports.default = AlbumParser;
