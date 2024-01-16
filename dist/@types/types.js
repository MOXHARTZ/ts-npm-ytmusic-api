"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePageContent = exports.PlaylistWatch = exports.SearchResult = exports.PlaylistFull = exports.AlbumFull = exports.ArtistFull = exports.VideoFull = exports.SongFull = exports.PlaylistDetailed = exports.AlbumDetailed = exports.ArtistDetailed = exports.VideoDetailed = exports.SongDetailed = exports.AlbumBasic = exports.ArtistBasic = exports.ThumbnailFull = void 0;
const arktype_1 = require("arktype");
exports.ThumbnailFull = (0, arktype_1.type)({
    url: "string",
    width: "number",
    height: "number",
});
exports.ArtistBasic = (0, arktype_1.type)({
    artistId: "string|null",
    name: "string",
});
exports.AlbumBasic = (0, arktype_1.type)({
    albumId: "string",
    name: "string",
});
exports.SongDetailed = (0, arktype_1.type)({
    type: '"SONG"',
    videoId: "string",
    name: "string",
    artist: exports.ArtistBasic,
    album: (0, arktype_1.union)(exports.AlbumBasic, "null"),
    duration: "number|null",
    thumbnails: [exports.ThumbnailFull, "[]"],
});
exports.VideoDetailed = (0, arktype_1.type)({
    type: '"VIDEO"',
    videoId: "string",
    name: "string",
    artist: exports.ArtistBasic,
    duration: "number|null",
    thumbnails: [exports.ThumbnailFull, "[]"],
});
exports.ArtistDetailed = (0, arktype_1.type)({
    artistId: "string",
    name: "string",
    type: '"ARTIST"',
    thumbnails: [exports.ThumbnailFull, "[]"],
});
exports.AlbumDetailed = (0, arktype_1.type)({
    type: '"ALBUM"',
    albumId: "string",
    playlistId: "string",
    name: "string",
    artist: exports.ArtistBasic,
    year: "number|null",
    thumbnails: [exports.ThumbnailFull, "[]"],
});
exports.PlaylistDetailed = (0, arktype_1.type)({
    type: '"PLAYLIST"',
    playlistId: "string",
    name: "string",
    artist: exports.ArtistBasic,
    thumbnails: [exports.ThumbnailFull, "[]"],
});
exports.SongFull = (0, arktype_1.type)({
    type: '"SONG"',
    videoId: "string",
    name: "string",
    artist: exports.ArtistBasic,
    duration: "number",
    thumbnails: [exports.ThumbnailFull, "[]"],
    formats: "any[]",
    adaptiveFormats: "any[]",
});
exports.VideoFull = (0, arktype_1.type)({
    type: '"VIDEO"',
    videoId: "string",
    name: "string",
    artist: exports.ArtistBasic,
    duration: "number",
    thumbnails: [exports.ThumbnailFull, "[]"],
    unlisted: "boolean",
    familySafe: "boolean",
    paid: "boolean",
    tags: "string[]",
});
exports.ArtistFull = (0, arktype_1.type)({
    artistId: "string",
    name: "string",
    type: '"ARTIST"',
    thumbnails: [exports.ThumbnailFull, "[]"],
    topSongs: [exports.SongDetailed, "[]"],
    topAlbums: [exports.AlbumDetailed, "[]"],
    topSingles: [exports.AlbumDetailed, "[]"],
    topVideos: [exports.VideoDetailed, "[]"],
    featuredOn: [exports.PlaylistDetailed, "[]"],
    similarArtists: [exports.ArtistDetailed, "[]"],
});
exports.AlbumFull = (0, arktype_1.type)({
    type: '"ALBUM"',
    albumId: "string",
    playlistId: "string",
    name: "string",
    artist: exports.ArtistBasic,
    year: "number|null",
    thumbnails: [exports.ThumbnailFull, "[]"],
    songs: [exports.SongDetailed, "[]"],
});
exports.PlaylistFull = (0, arktype_1.type)({
    type: '"PLAYLIST"',
    playlistId: "string",
    name: "string",
    artist: exports.ArtistBasic,
    videoCount: "number",
    thumbnails: [exports.ThumbnailFull, "[]"],
});
exports.SearchResult = (0, arktype_1.union)(exports.SongDetailed, (0, arktype_1.union)(exports.VideoDetailed, (0, arktype_1.union)(exports.AlbumDetailed, (0, arktype_1.union)(exports.ArtistDetailed, exports.PlaylistDetailed))));
exports.PlaylistWatch = (0, arktype_1.type)({
    type: '"PLAYLIST"',
    playlistId: "string",
    name: "string",
    thumbnails: [exports.ThumbnailFull, "[]"],
});
exports.HomePageContent = (0, arktype_1.type)({
    title: "string",
    contents: [
        (0, arktype_1.union)(exports.PlaylistWatch, (0, arktype_1.union)(exports.ArtistDetailed, (0, arktype_1.union)(exports.AlbumDetailed, (0, arktype_1.union)(exports.PlaylistDetailed, exports.SongDetailed)))),
        "[]",
    ],
});
