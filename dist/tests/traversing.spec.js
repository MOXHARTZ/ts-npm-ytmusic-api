"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arktype_1 = require("arktype");
const assert_1 = require("assert");
const bun_test_1 = require("bun:test");
const types_1 = require("../@types/types");
const YTMusic_1 = __importDefault(require("../YTMusic"));
const errors = [];
const queries = ["Lilac", "Weekend", "Eill", "Eminem", "Lisa Hannigan"];
const expect = (data, type) => {
    const result = type(data);
    if (result.problems?.length) {
        errors.push(...result.problems);
    }
    else {
        const empty = JSON.stringify(result.data).match(/"\w+":""/g);
        if (empty) {
            console.log(result.data, empty);
        }
        (0, assert_1.equal)(empty, null);
    }
    (0, assert_1.equal)(result.problems, undefined);
};
const ytmusic = new YTMusic_1.default();
(0, bun_test_1.beforeAll)(() => ytmusic.initialize());
queries.forEach(query => {
    (0, bun_test_1.describe)("Query: " + query, () => {
        (0, bun_test_1.it)("Search suggestions", async () => {
            const suggestions = await ytmusic.getSearchSuggestions(query);
            expect(suggestions, (0, arktype_1.type)("string[]"));
        });
        (0, bun_test_1.it)("Search Songs", async () => {
            const songs = await ytmusic.searchSongs(query);
            expect(songs, (0, arktype_1.arrayOf)(types_1.SongDetailed));
        });
        (0, bun_test_1.it)("Search Videos", async () => {
            const videos = await ytmusic.searchVideos(query);
            expect(videos, (0, arktype_1.arrayOf)(types_1.VideoDetailed));
        });
        (0, bun_test_1.it)("Search Artists", async () => {
            const artists = await ytmusic.searchArtists(query);
            expect(artists, (0, arktype_1.arrayOf)(types_1.ArtistDetailed));
        });
        (0, bun_test_1.it)("Search Albums", async () => {
            const albums = await ytmusic.searchAlbums(query);
            expect(albums, (0, arktype_1.arrayOf)(types_1.AlbumDetailed));
        });
        (0, bun_test_1.it)("Search Playlists", async () => {
            const playlists = await ytmusic.searchPlaylists(query);
            expect(playlists, (0, arktype_1.arrayOf)(types_1.PlaylistDetailed));
        });
        (0, bun_test_1.it)("Search All", async () => {
            const results = await ytmusic.search(query);
            expect(results, (0, arktype_1.arrayOf)(types_1.SearchResult));
        });
        (0, bun_test_1.it)("Get lyrics of the first song result", async () => {
            const songs = await ytmusic.searchSongs(query);
            const lyrics = await ytmusic.getLyrics(songs[0].videoId);
            expect(lyrics, (0, arktype_1.type)("string[]|null"));
        });
        (0, bun_test_1.it)("Get details of the first song result", async () => {
            const songs = await ytmusic.searchSongs(query);
            const song = await ytmusic.getSong(songs[0].videoId);
            expect(song, types_1.SongFull);
        });
        (0, bun_test_1.it)("Get details of the first video result", async () => {
            const videos = await ytmusic.searchVideos(query);
            const video = await ytmusic.getVideo(videos[0].videoId);
            expect(video, types_1.VideoFull);
        });
        (0, bun_test_1.it)("Get details of the first artist result", async () => {
            const artists = await ytmusic.searchArtists(query);
            const artist = await ytmusic.getArtist(artists[0].artistId);
            expect(artist, types_1.ArtistFull);
        });
        (0, bun_test_1.it)("Get the songs of the first artist result", async () => {
            const artists = await ytmusic.searchArtists(query);
            const songs = await ytmusic.getArtistSongs(artists[0].artistId);
            expect(songs, (0, arktype_1.arrayOf)(types_1.SongDetailed));
        });
        (0, bun_test_1.it)("Get the albums of the first artist result", async () => {
            const artists = await ytmusic.searchArtists(query);
            const albums = await ytmusic.getArtistAlbums(artists[0].artistId);
            expect(albums, (0, arktype_1.arrayOf)(types_1.AlbumDetailed));
        });
        (0, bun_test_1.it)("Get details of the first album result", async () => {
            const albums = await ytmusic.searchAlbums(query);
            const album = await ytmusic.getAlbum(albums[0].albumId);
            expect(album, types_1.AlbumFull);
        });
        (0, bun_test_1.it)("Get details of the first playlist result", async () => {
            const playlists = await ytmusic.searchPlaylists(query);
            const playlist = await ytmusic.getPlaylist(playlists[0].playlistId);
            expect(playlist, types_1.PlaylistFull);
        });
        (0, bun_test_1.it)("Get the videos of the first playlist result", async () => {
            const playlists = await ytmusic.searchPlaylists(query);
            const videos = await ytmusic.getPlaylistVideos(playlists[0].playlistId);
            expect(videos, (0, arktype_1.arrayOf)(types_1.VideoDetailed));
        });
    });
});
(0, bun_test_1.afterAll)(() => console.log("Issues:", errors));
