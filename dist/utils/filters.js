"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDuration = exports.isAlbum = exports.isArtist = exports.isTitle = void 0;
const traverse_1 = require("./traverse");
const isTitle = (data) => {
    return (0, traverse_1.traverseString)(data, "musicVideoType").startsWith("MUSIC_VIDEO_TYPE_");
};
exports.isTitle = isTitle;
const isArtist = (data) => {
    return ["MUSIC_PAGE_TYPE_USER_CHANNEL", "MUSIC_PAGE_TYPE_ARTIST"].includes((0, traverse_1.traverseString)(data, "pageType"));
};
exports.isArtist = isArtist;
const isAlbum = (data) => {
    return (0, traverse_1.traverseString)(data, "pageType") === "MUSIC_PAGE_TYPE_ALBUM";
};
exports.isAlbum = isAlbum;
const isDuration = (data) => {
    return (0, traverse_1.traverseString)(data, "text").match(/(\d{1,2}:)?\d{1,2}:\d{1,2}/);
};
exports.isDuration = isDuration;
