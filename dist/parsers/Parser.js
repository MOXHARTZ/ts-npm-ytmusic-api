"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const traverse_1 = require("../utils/traverse");
const AlbumParser_1 = __importDefault(require("./AlbumParser"));
const ArtistParser_1 = __importDefault(require("./ArtistParser"));
const PlaylistParser_1 = __importDefault(require("./PlaylistParser"));
const SongParser_1 = __importDefault(require("./SongParser"));
class Parser {
    static parseDuration(time) {
        if (!time)
            return null;
        const [seconds, minutes, hours] = time
            .split(":")
            .reverse()
            .map(n => +n);
        return (seconds || 0) + (minutes || 0) * 60 + (hours || 0) * 60 * 60;
    }
    static parseNumber(string) {
        if (string.at(-1).match(/^[A-Z]+$/)) {
            const number = +string.slice(0, -1);
            const multiplier = string.at(-1);
            return ({
                K: number * 1000,
                M: number * 1000 * 1000,
                B: number * 1000 * 1000 * 1000,
                T: number * 1000 * 1000 * 1000 * 1000,
            }[multiplier] || NaN);
        }
        else {
            return +string;
        }
    }
    /**
     * Parses mixed content data into a structured `HomePageContent` object.
     *
     * This static method takes raw data of mixed content types and attempts to parse it into a
     * more structured format suitable for use as home page content. It supports multiple content
     * types such as music descriptions, artists, albums, playlists, and songs.
     *
     * @param {any} data - The raw data to be parsed.
     * @returns {HomePageContent | null} A `HomePageContent` object if parsing is successful, or null otherwise.
     */
    static parseMixedContent(data) {
        const key = Object.keys(data)[0];
        if (!key)
            throw new Error("Invalid content");
        const result = data[key];
        const musicDescriptionShelfRenderer = (0, traverse_1.traverse)(result, "musicDescriptionShelfRenderer");
        if (musicDescriptionShelfRenderer && !Array.isArray(musicDescriptionShelfRenderer)) {
            return {
                title: (0, traverse_1.traverse)(musicDescriptionShelfRenderer, "header", "title", "text"),
                contents: (0, traverse_1.traverseList)(musicDescriptionShelfRenderer, "description", "runs", "text"),
            };
        }
        if (!Array.isArray(result.contents)) {
            return null;
        }
        const title = (0, traverse_1.traverse)(result, "header", "title", "text");
        const contents = [];
        result.contents.forEach((content) => {
            const musicTwoRowItemRenderer = (0, traverse_1.traverse)(content, "musicTwoRowItemRenderer");
            if (musicTwoRowItemRenderer && !Array.isArray(musicTwoRowItemRenderer)) {
                const pageType = (0, traverse_1.traverse)(result, "navigationEndpoint", "browseEndpoint", "browseEndpointContextSupportedConfigs", "browseEndpointContextMusicConfig", "pageType");
                const playlistId = (0, traverse_1.traverse)(content, "navigationEndpoint", "watchPlaylistEndpoint", "playlistId");
                switch (pageType) {
                    case constants_1.PageType.MUSIC_PAGE_TYPE_ARTIST:
                        contents.push(ArtistParser_1.default.parseSearchResult(content));
                        break;
                    case constants_1.PageType.MUSIC_PAGE_TYPE_ALBUM:
                        contents.push(AlbumParser_1.default.parseSearchResult(content));
                        break;
                    case constants_1.PageType.MUSIC_PAGE_TYPE_PLAYLIST:
                        contents.push(PlaylistParser_1.default.parseSearchResult(content));
                        break;
                    default:
                        if (playlistId) {
                            contents.push(PlaylistParser_1.default.parseWatchPlaylist(content));
                        }
                        else {
                            contents.push(SongParser_1.default.parseSearchResult(content));
                        }
                }
            }
            else {
                const musicResponsiveListItemRenderer = (0, traverse_1.traverse)(content, "musicResponsiveListItemRenderer");
                if (musicResponsiveListItemRenderer &&
                    !Array.isArray(musicResponsiveListItemRenderer)) {
                    contents.push(SongParser_1.default.parseSearchResult(musicResponsiveListItemRenderer));
                }
            }
        });
        return { title, contents };
    }
}
exports.default = Parser;
