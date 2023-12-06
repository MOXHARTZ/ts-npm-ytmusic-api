import { z } from "zod";
export type ThumbnailFull = z.infer<typeof ThumbnailFull>;
export declare const ThumbnailFull: z.ZodObject<{
    url: z.ZodString;
    width: z.ZodNumber;
    height: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    url: string;
    width: number;
    height: number;
}, {
    url: string;
    width: number;
    height: number;
}>;
export type ArtistBasic = z.infer<typeof ArtistBasic>;
export declare const ArtistBasic: z.ZodObject<{
    artistId: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    artistId: string;
}, {
    name: string;
    artistId: string;
}>;
export type AlbumBasic = z.infer<typeof AlbumBasic>;
export declare const AlbumBasic: z.ZodObject<{
    albumId: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    albumId: string;
}, {
    name: string;
    albumId: string;
}>;
export type SongDetailed = z.infer<typeof SongDetailed>;
export declare const SongDetailed: z.ZodObject<{
    type: z.ZodLiteral<"SONG">;
    videoId: z.ZodString;
    name: z.ZodString;
    artists: z.ZodArray<z.ZodObject<{
        artistId: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        artistId: string;
    }, {
        name: string;
        artistId: string;
    }>, "many">;
    album: z.ZodObject<{
        albumId: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        albumId: string;
    }, {
        name: string;
        albumId: string;
    }>;
    duration: z.ZodNumber;
    thumbnails: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        width: number;
        height: number;
    }, {
        url: string;
        width: number;
        height: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "SONG";
    videoId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    album: {
        name: string;
        albumId: string;
    };
    duration: number;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}, {
    name: string;
    type: "SONG";
    videoId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    album: {
        name: string;
        albumId: string;
    };
    duration: number;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}>;
export type VideoDetailed = z.infer<typeof VideoDetailed>;
export declare const VideoDetailed: z.ZodObject<{
    type: z.ZodLiteral<"VIDEO">;
    videoId: z.ZodString;
    name: z.ZodString;
    artists: z.ZodArray<z.ZodObject<{
        artistId: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        artistId: string;
    }, {
        name: string;
        artistId: string;
    }>, "many">;
    duration: z.ZodNumber;
    thumbnails: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        width: number;
        height: number;
    }, {
        url: string;
        width: number;
        height: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "VIDEO";
    videoId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    duration: number;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}, {
    name: string;
    type: "VIDEO";
    videoId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    duration: number;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}>;
export type ArtistDetailed = z.infer<typeof ArtistDetailed>;
export declare const ArtistDetailed: z.ZodObject<{
    artistId: z.ZodString;
    name: z.ZodString;
    type: z.ZodLiteral<"ARTIST">;
    thumbnails: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        width: number;
        height: number;
    }, {
        url: string;
        width: number;
        height: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "ARTIST";
    artistId: string;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}, {
    name: string;
    type: "ARTIST";
    artistId: string;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}>;
export type AlbumDetailed = z.infer<typeof AlbumDetailed>;
export declare const AlbumDetailed: z.ZodObject<{
    type: z.ZodLiteral<"ALBUM">;
    albumId: z.ZodString;
    playlistId: z.ZodString;
    name: z.ZodString;
    artists: z.ZodArray<z.ZodObject<{
        artistId: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        artistId: string;
    }, {
        name: string;
        artistId: string;
    }>, "many">;
    year: z.ZodNullable<z.ZodNumber>;
    thumbnails: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        width: number;
        height: number;
    }, {
        url: string;
        width: number;
        height: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    year: number | null;
    name: string;
    type: "ALBUM";
    albumId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    playlistId: string;
}, {
    year: number | null;
    name: string;
    type: "ALBUM";
    albumId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    playlistId: string;
}>;
export type PlaylistDetailed = z.infer<typeof PlaylistDetailed>;
export declare const PlaylistDetailed: z.ZodObject<{
    type: z.ZodLiteral<"PLAYLIST">;
    playlistId: z.ZodString;
    name: z.ZodString;
    artist: z.ZodObject<{
        artistId: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        artistId: string;
    }, {
        name: string;
        artistId: string;
    }>;
    thumbnails: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        width: number;
        height: number;
    }, {
        url: string;
        width: number;
        height: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "PLAYLIST";
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    playlistId: string;
    artist: {
        name: string;
        artistId: string;
    };
}, {
    name: string;
    type: "PLAYLIST";
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    playlistId: string;
    artist: {
        name: string;
        artistId: string;
    };
}>;
export type SongFull = z.infer<typeof SongFull>;
export declare const SongFull: z.ZodObject<{
    type: z.ZodLiteral<"SONG">;
    videoId: z.ZodString;
    name: z.ZodString;
    artists: z.ZodArray<z.ZodObject<{
        artistId: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        artistId: string;
    }, {
        name: string;
        artistId: string;
    }>, "many">;
    duration: z.ZodNumber;
    thumbnails: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        width: number;
        height: number;
    }, {
        url: string;
        width: number;
        height: number;
    }>, "many">;
    description: z.ZodString;
    formats: z.ZodArray<z.ZodAny, "many">;
    adaptiveFormats: z.ZodArray<z.ZodAny, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "SONG";
    description: string;
    videoId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    duration: number;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    formats: any[];
    adaptiveFormats: any[];
}, {
    name: string;
    type: "SONG";
    description: string;
    videoId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    duration: number;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    formats: any[];
    adaptiveFormats: any[];
}>;
export type VideoFull = z.infer<typeof VideoFull>;
export declare const VideoFull: z.ZodObject<{
    type: z.ZodLiteral<"VIDEO">;
    videoId: z.ZodString;
    name: z.ZodString;
    artists: z.ZodArray<z.ZodObject<{
        artistId: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        artistId: string;
    }, {
        name: string;
        artistId: string;
    }>, "many">;
    duration: z.ZodNumber;
    thumbnails: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        width: number;
        height: number;
    }, {
        url: string;
        width: number;
        height: number;
    }>, "many">;
    description: z.ZodString;
    unlisted: z.ZodBoolean;
    familySafe: z.ZodBoolean;
    paid: z.ZodBoolean;
    tags: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "VIDEO";
    description: string;
    videoId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    duration: number;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    unlisted: boolean;
    familySafe: boolean;
    paid: boolean;
    tags: string[];
}, {
    name: string;
    type: "VIDEO";
    description: string;
    videoId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    duration: number;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    unlisted: boolean;
    familySafe: boolean;
    paid: boolean;
    tags: string[];
}>;
export type ArtistFull = z.infer<typeof ArtistFull>;
export declare const ArtistFull: z.ZodObject<{
    artistId: z.ZodString;
    name: z.ZodString;
    type: z.ZodLiteral<"ARTIST">;
    thumbnails: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        width: number;
        height: number;
    }, {
        url: string;
        width: number;
        height: number;
    }>, "many">;
    description: z.ZodString;
    topSongs: z.ZodArray<z.ZodObject<Omit<{
        type: z.ZodLiteral<"SONG">;
        videoId: z.ZodString;
        name: z.ZodString;
        artists: z.ZodArray<z.ZodObject<{
            artistId: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            artistId: string;
        }, {
            name: string;
            artistId: string;
        }>, "many">;
        album: z.ZodObject<{
            albumId: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            albumId: string;
        }, {
            name: string;
            albumId: string;
        }>;
        duration: z.ZodNumber;
        thumbnails: z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            url: string;
            width: number;
            height: number;
        }, {
            url: string;
            width: number;
            height: number;
        }>, "many">;
    }, "duration">, "strip", z.ZodTypeAny, {
        name: string;
        type: "SONG";
        videoId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        album: {
            name: string;
            albumId: string;
        };
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }, {
        name: string;
        type: "SONG";
        videoId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        album: {
            name: string;
            albumId: string;
        };
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }>, "many">;
    topAlbums: z.ZodArray<z.ZodObject<{
        type: z.ZodLiteral<"ALBUM">;
        albumId: z.ZodString;
        playlistId: z.ZodString;
        name: z.ZodString;
        artists: z.ZodArray<z.ZodObject<{
            artistId: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            artistId: string;
        }, {
            name: string;
            artistId: string;
        }>, "many">;
        year: z.ZodNullable<z.ZodNumber>;
        thumbnails: z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            url: string;
            width: number;
            height: number;
        }, {
            url: string;
            width: number;
            height: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        year: number | null;
        name: string;
        type: "ALBUM";
        albumId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
        playlistId: string;
    }, {
        year: number | null;
        name: string;
        type: "ALBUM";
        albumId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
        playlistId: string;
    }>, "many">;
    topSingles: z.ZodArray<z.ZodObject<{
        type: z.ZodLiteral<"ALBUM">;
        albumId: z.ZodString;
        playlistId: z.ZodString;
        name: z.ZodString;
        artists: z.ZodArray<z.ZodObject<{
            artistId: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            artistId: string;
        }, {
            name: string;
            artistId: string;
        }>, "many">;
        year: z.ZodNullable<z.ZodNumber>;
        thumbnails: z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            url: string;
            width: number;
            height: number;
        }, {
            url: string;
            width: number;
            height: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        year: number | null;
        name: string;
        type: "ALBUM";
        albumId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
        playlistId: string;
    }, {
        year: number | null;
        name: string;
        type: "ALBUM";
        albumId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
        playlistId: string;
    }>, "many">;
    topVideos: z.ZodArray<z.ZodObject<Omit<{
        type: z.ZodLiteral<"VIDEO">;
        videoId: z.ZodString;
        name: z.ZodString;
        artists: z.ZodArray<z.ZodObject<{
            artistId: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            artistId: string;
        }, {
            name: string;
            artistId: string;
        }>, "many">;
        duration: z.ZodNumber;
        thumbnails: z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            url: string;
            width: number;
            height: number;
        }, {
            url: string;
            width: number;
            height: number;
        }>, "many">;
    }, "duration">, "strip", z.ZodTypeAny, {
        name: string;
        type: "VIDEO";
        videoId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }, {
        name: string;
        type: "VIDEO";
        videoId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }>, "many">;
    featuredOn: z.ZodArray<z.ZodObject<{
        type: z.ZodLiteral<"PLAYLIST">;
        playlistId: z.ZodString;
        name: z.ZodString;
        artist: z.ZodObject<{
            artistId: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            artistId: string;
        }, {
            name: string;
            artistId: string;
        }>;
        thumbnails: z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            url: string;
            width: number;
            height: number;
        }, {
            url: string;
            width: number;
            height: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "PLAYLIST";
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
        playlistId: string;
        artist: {
            name: string;
            artistId: string;
        };
    }, {
        name: string;
        type: "PLAYLIST";
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
        playlistId: string;
        artist: {
            name: string;
            artistId: string;
        };
    }>, "many">;
    similarArtists: z.ZodArray<z.ZodObject<{
        artistId: z.ZodString;
        name: z.ZodString;
        type: z.ZodLiteral<"ARTIST">;
        thumbnails: z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            url: string;
            width: number;
            height: number;
        }, {
            url: string;
            width: number;
            height: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "ARTIST";
        artistId: string;
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }, {
        name: string;
        type: "ARTIST";
        artistId: string;
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "ARTIST";
    description: string;
    artistId: string;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    topSongs: {
        name: string;
        type: "SONG";
        videoId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        album: {
            name: string;
            albumId: string;
        };
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }[];
    topAlbums: {
        year: number | null;
        name: string;
        type: "ALBUM";
        albumId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
        playlistId: string;
    }[];
    topSingles: {
        year: number | null;
        name: string;
        type: "ALBUM";
        albumId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
        playlistId: string;
    }[];
    topVideos: {
        name: string;
        type: "VIDEO";
        videoId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }[];
    featuredOn: {
        name: string;
        type: "PLAYLIST";
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
        playlistId: string;
        artist: {
            name: string;
            artistId: string;
        };
    }[];
    similarArtists: {
        name: string;
        type: "ARTIST";
        artistId: string;
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }[];
}, {
    name: string;
    type: "ARTIST";
    description: string;
    artistId: string;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    topSongs: {
        name: string;
        type: "SONG";
        videoId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        album: {
            name: string;
            albumId: string;
        };
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }[];
    topAlbums: {
        year: number | null;
        name: string;
        type: "ALBUM";
        albumId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
        playlistId: string;
    }[];
    topSingles: {
        year: number | null;
        name: string;
        type: "ALBUM";
        albumId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
        playlistId: string;
    }[];
    topVideos: {
        name: string;
        type: "VIDEO";
        videoId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }[];
    featuredOn: {
        name: string;
        type: "PLAYLIST";
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
        playlistId: string;
        artist: {
            name: string;
            artistId: string;
        };
    }[];
    similarArtists: {
        name: string;
        type: "ARTIST";
        artistId: string;
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }[];
}>;
export type AlbumFull = z.infer<typeof AlbumFull>;
export declare const AlbumFull: z.ZodObject<{
    type: z.ZodLiteral<"ALBUM">;
    albumId: z.ZodString;
    playlistId: z.ZodString;
    name: z.ZodString;
    artists: z.ZodArray<z.ZodObject<{
        artistId: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        artistId: string;
    }, {
        name: string;
        artistId: string;
    }>, "many">;
    year: z.ZodNullable<z.ZodNumber>;
    thumbnails: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        width: number;
        height: number;
    }, {
        url: string;
        width: number;
        height: number;
    }>, "many">;
    description: z.ZodString;
    songs: z.ZodArray<z.ZodObject<{
        type: z.ZodLiteral<"SONG">;
        videoId: z.ZodString;
        name: z.ZodString;
        artists: z.ZodArray<z.ZodObject<{
            artistId: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            artistId: string;
        }, {
            name: string;
            artistId: string;
        }>, "many">;
        album: z.ZodObject<{
            albumId: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            albumId: string;
        }, {
            name: string;
            albumId: string;
        }>;
        duration: z.ZodNumber;
        thumbnails: z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            url: string;
            width: number;
            height: number;
        }, {
            url: string;
            width: number;
            height: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        type: "SONG";
        videoId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        album: {
            name: string;
            albumId: string;
        };
        duration: number;
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }, {
        name: string;
        type: "SONG";
        videoId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        album: {
            name: string;
            albumId: string;
        };
        duration: number;
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    year: number | null;
    name: string;
    type: "ALBUM";
    description: string;
    albumId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    playlistId: string;
    songs: {
        name: string;
        type: "SONG";
        videoId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        album: {
            name: string;
            albumId: string;
        };
        duration: number;
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }[];
}, {
    year: number | null;
    name: string;
    type: "ALBUM";
    description: string;
    albumId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    playlistId: string;
    songs: {
        name: string;
        type: "SONG";
        videoId: string;
        artists: {
            name: string;
            artistId: string;
        }[];
        album: {
            name: string;
            albumId: string;
        };
        duration: number;
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }[];
}>;
export type PlaylistFull = z.infer<typeof PlaylistFull>;
export declare const PlaylistFull: z.ZodObject<{
    type: z.ZodLiteral<"PLAYLIST">;
    playlistId: z.ZodString;
    name: z.ZodString;
    artist: z.ZodObject<{
        artistId: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        artistId: string;
    }, {
        name: string;
        artistId: string;
    }>;
    videoCount: z.ZodNumber;
    thumbnails: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        width: number;
        height: number;
    }, {
        url: string;
        width: number;
        height: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "PLAYLIST";
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    playlistId: string;
    artist: {
        name: string;
        artistId: string;
    };
    videoCount: number;
}, {
    name: string;
    type: "PLAYLIST";
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    playlistId: string;
    artist: {
        name: string;
        artistId: string;
    };
    videoCount: number;
}>;
export type SearchResult = z.infer<typeof SearchResult>;
export declare const SearchResult: z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"SONG">;
    videoId: z.ZodString;
    name: z.ZodString;
    artists: z.ZodArray<z.ZodObject<{
        artistId: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        artistId: string;
    }, {
        name: string;
        artistId: string;
    }>, "many">;
    album: z.ZodObject<{
        albumId: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        albumId: string;
    }, {
        name: string;
        albumId: string;
    }>;
    duration: z.ZodNumber;
    thumbnails: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        width: number;
        height: number;
    }, {
        url: string;
        width: number;
        height: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "SONG";
    videoId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    album: {
        name: string;
        albumId: string;
    };
    duration: number;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}, {
    name: string;
    type: "SONG";
    videoId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    album: {
        name: string;
        albumId: string;
    };
    duration: number;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}>, z.ZodObject<{
    type: z.ZodLiteral<"VIDEO">;
    videoId: z.ZodString;
    name: z.ZodString;
    artists: z.ZodArray<z.ZodObject<{
        artistId: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        artistId: string;
    }, {
        name: string;
        artistId: string;
    }>, "many">;
    duration: z.ZodNumber;
    thumbnails: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        width: number;
        height: number;
    }, {
        url: string;
        width: number;
        height: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "VIDEO";
    videoId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    duration: number;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}, {
    name: string;
    type: "VIDEO";
    videoId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    duration: number;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}>]>, z.ZodObject<{
    type: z.ZodLiteral<"ALBUM">;
    albumId: z.ZodString;
    playlistId: z.ZodString;
    name: z.ZodString;
    artists: z.ZodArray<z.ZodObject<{
        artistId: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        artistId: string;
    }, {
        name: string;
        artistId: string;
    }>, "many">;
    year: z.ZodNullable<z.ZodNumber>;
    thumbnails: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        width: number;
        height: number;
    }, {
        url: string;
        width: number;
        height: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    year: number | null;
    name: string;
    type: "ALBUM";
    albumId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    playlistId: string;
}, {
    year: number | null;
    name: string;
    type: "ALBUM";
    albumId: string;
    artists: {
        name: string;
        artistId: string;
    }[];
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    playlistId: string;
}>]>, z.ZodObject<{
    artistId: z.ZodString;
    name: z.ZodString;
    type: z.ZodLiteral<"ARTIST">;
    thumbnails: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        width: number;
        height: number;
    }, {
        url: string;
        width: number;
        height: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "ARTIST";
    artistId: string;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}, {
    name: string;
    type: "ARTIST";
    artistId: string;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}>]>, z.ZodObject<{
    type: z.ZodLiteral<"PLAYLIST">;
    playlistId: z.ZodString;
    name: z.ZodString;
    artist: z.ZodObject<{
        artistId: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        artistId: string;
    }, {
        name: string;
        artistId: string;
    }>;
    thumbnails: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        width: number;
        height: number;
    }, {
        url: string;
        width: number;
        height: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "PLAYLIST";
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    playlistId: string;
    artist: {
        name: string;
        artistId: string;
    };
}, {
    name: string;
    type: "PLAYLIST";
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    playlistId: string;
    artist: {
        name: string;
        artistId: string;
    };
}>]>;
