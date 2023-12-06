"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResult = exports.PlaylistFull = exports.AlbumFull = exports.ArtistFull = exports.VideoFull = exports.SongFull = exports.PlaylistDetailed = exports.AlbumDetailed = exports.ArtistDetailed = exports.VideoDetailed = exports.SongDetailed = exports.AlbumBasic = exports.ArtistBasic = exports.ThumbnailFull = void 0;
const zod_1 = require("zod");
exports.ThumbnailFull = zod_1.z.object({
    url: zod_1.z.string(),
    width: zod_1.z.number(),
    height: zod_1.z.number(),
});
exports.ArtistBasic = zod_1.z.object({
    artistId: zod_1.z.string(),
    name: zod_1.z.string(),
});
exports.AlbumBasic = zod_1.z.object({
    albumId: zod_1.z.string(),
    name: zod_1.z.string(),
});
exports.SongDetailed = zod_1.z.object({
    type: zod_1.z.literal("SONG"),
    videoId: zod_1.z.string(),
    name: zod_1.z.string(),
    artists: zod_1.z.array(exports.ArtistBasic),
    album: exports.AlbumBasic,
    duration: zod_1.z.number(),
    thumbnails: zod_1.z.array(exports.ThumbnailFull),
});
exports.VideoDetailed = zod_1.z.object({
    type: zod_1.z.literal("VIDEO"),
    videoId: zod_1.z.string(),
    name: zod_1.z.string(),
    artists: zod_1.z.array(exports.ArtistBasic),
    duration: zod_1.z.number(),
    thumbnails: zod_1.z.array(exports.ThumbnailFull),
});
exports.ArtistDetailed = zod_1.z.object({
    artistId: zod_1.z.string(),
    name: zod_1.z.string(),
    type: zod_1.z.literal("ARTIST"),
    thumbnails: zod_1.z.array(exports.ThumbnailFull),
});
exports.AlbumDetailed = zod_1.z.object({
    type: zod_1.z.literal("ALBUM"),
    albumId: zod_1.z.string(),
    playlistId: zod_1.z.string(),
    name: zod_1.z.string(),
    artists: zod_1.z.array(exports.ArtistBasic),
    year: zod_1.z.number().nullable(),
    thumbnails: zod_1.z.array(exports.ThumbnailFull),
});
exports.PlaylistDetailed = zod_1.z.object({
    type: zod_1.z.literal("PLAYLIST"),
    playlistId: zod_1.z.string(),
    name: zod_1.z.string(),
    artist: exports.ArtistBasic,
    thumbnails: zod_1.z.array(exports.ThumbnailFull),
});
exports.SongFull = zod_1.z.object({
    type: zod_1.z.literal("SONG"),
    videoId: zod_1.z.string(),
    name: zod_1.z.string(),
    artists: zod_1.z.array(exports.ArtistBasic),
    duration: zod_1.z.number(),
    thumbnails: zod_1.z.array(exports.ThumbnailFull),
    description: zod_1.z.string(),
    formats: zod_1.z.array(zod_1.z.any()),
    adaptiveFormats: zod_1.z.array(zod_1.z.any()),
});
exports.VideoFull = zod_1.z.object({
    type: zod_1.z.literal("VIDEO"),
    videoId: zod_1.z.string(),
    name: zod_1.z.string(),
    artists: zod_1.z.array(exports.ArtistBasic),
    duration: zod_1.z.number(),
    thumbnails: zod_1.z.array(exports.ThumbnailFull),
    description: zod_1.z.string(),
    unlisted: zod_1.z.boolean(),
    familySafe: zod_1.z.boolean(),
    paid: zod_1.z.boolean(),
    tags: zod_1.z.array(zod_1.z.string()),
});
exports.ArtistFull = zod_1.z.object({
    artistId: zod_1.z.string(),
    name: zod_1.z.string(),
    type: zod_1.z.literal("ARTIST"),
    thumbnails: zod_1.z.array(exports.ThumbnailFull),
    description: zod_1.z.string(),
    topSongs: zod_1.z.array(exports.SongDetailed.omit({ duration: true })),
    topAlbums: zod_1.z.array(exports.AlbumDetailed),
    topSingles: zod_1.z.array(exports.AlbumDetailed),
    topVideos: zod_1.z.array(exports.VideoDetailed.omit({ duration: true })),
    featuredOn: zod_1.z.array(exports.PlaylistDetailed),
    similarArtists: zod_1.z.array(exports.ArtistDetailed),
});
exports.AlbumFull = zod_1.z.object({
    type: zod_1.z.literal("ALBUM"),
    albumId: zod_1.z.string(),
    playlistId: zod_1.z.string(),
    name: zod_1.z.string(),
    artists: zod_1.z.array(exports.ArtistBasic),
    year: zod_1.z.number().nullable(),
    thumbnails: zod_1.z.array(exports.ThumbnailFull),
    description: zod_1.z.string(),
    songs: zod_1.z.array(exports.SongDetailed),
});
exports.PlaylistFull = zod_1.z.object({
    type: zod_1.z.literal("PLAYLIST"),
    playlistId: zod_1.z.string(),
    name: zod_1.z.string(),
    artist: exports.ArtistBasic,
    videoCount: zod_1.z.number(),
    thumbnails: zod_1.z.array(exports.ThumbnailFull),
});
exports.SearchResult = exports.SongDetailed.or(exports.VideoDetailed)
    .or(exports.AlbumDetailed)
    .or(exports.ArtistDetailed)
    .or(exports.PlaylistDetailed);
