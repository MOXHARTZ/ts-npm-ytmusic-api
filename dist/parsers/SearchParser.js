"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const traverse_1 = require("../utils/traverse");
const AlbumParser_1 = __importDefault(require("./AlbumParser"));
const ArtistParser_1 = __importDefault(require("./ArtistParser"));
const PlaylistParser_1 = __importDefault(require("./PlaylistParser"));
const SongParser_1 = __importDefault(require("./SongParser"));
const VideoParser_1 = __importDefault(require("./VideoParser"));
class SearchParser {
    static parse(item) {
        const flexColumns = (0, traverse_1.traverseList)(item, "flexColumns");
        const type = (0, traverse_1.traverseList)(flexColumns[1], "runs", "text").at(0);
        const parsers = {
            Song: SongParser_1.default.parseSearchResult,
            Video: VideoParser_1.default.parseSearchResult,
            Artist: ArtistParser_1.default.parseSearchResult,
            EP: AlbumParser_1.default.parseSearchResult,
            Single: AlbumParser_1.default.parseSearchResult,
            Album: AlbumParser_1.default.parseSearchResult,
            Playlist: PlaylistParser_1.default.parseSearchResult,
        };
        if (parsers[type]) {
            return parsers[type](item);
        }
        else {
            return null;
        }
    }
}
exports.default = SearchParser;
