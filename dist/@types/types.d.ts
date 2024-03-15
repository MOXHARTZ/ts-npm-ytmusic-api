export type ThumbnailFull = typeof ThumbnailFull.infer;
export declare const ThumbnailFull: import("arktype").Type<{
    url: string;
    width: number;
    height: number;
}>;
export type ArtistBasic = typeof ArtistBasic.infer;
export declare const ArtistBasic: import("arktype").Type<{
    artistId: string | null;
    name: string;
}>;
export type AlbumBasic = typeof AlbumBasic.infer;
export declare const AlbumBasic: import("arktype").Type<{
    albumId: string;
    name: string;
}>;
export type SongDetailed = typeof SongDetailed.infer;
export declare const SongDetailed: import("arktype").Type<{
    type: "SONG";
    videoId: string;
    name: string;
    artist: {
        artistId: string | null;
        name: string;
    };
    album: {
        albumId: string;
        name: string;
    } | null;
    duration: number | null;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}>;
export type VideoDetailed = typeof VideoDetailed.infer;
export declare const VideoDetailed: import("arktype").Type<{
    type: "VIDEO";
    videoId: string;
    name: string;
    artist: {
        artistId: string | null;
        name: string;
    };
    duration: number | null;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}>;
export type ArtistDetailed = typeof ArtistDetailed.infer;
export declare const ArtistDetailed: import("arktype").Type<{
    artistId: string;
    name: string;
    type: "ARTIST";
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}>;
export type AlbumDetailed = typeof AlbumDetailed.infer;
export declare const AlbumDetailed: import("arktype").Type<{
    type: "ALBUM";
    albumId: string;
    playlistId: string;
    name: string;
    artist: {
        artistId: string | null;
        name: string;
    };
    year: number | null;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}>;
export type PlaylistDetailed = typeof PlaylistDetailed.infer;
export declare const PlaylistDetailed: import("arktype").Type<{
    type: "PLAYLIST";
    playlistId: string;
    name: string;
    artist: {
        artistId: string | null;
        name: string;
    };
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}>;
export type SongFull = typeof SongFull.infer;
export declare const SongFull: import("arktype").Type<{
    type: "SONG";
    videoId: string;
    name: string;
    artist: {
        artistId: string | null;
        name: string;
    };
    duration: number;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    formats: any[];
    adaptiveFormats: any[];
}>;
export type VideoFull = typeof VideoFull.infer;
export declare const VideoFull: import("arktype").Type<{
    type: "VIDEO";
    videoId: string;
    name: string;
    artist: {
        artistId: string | null;
        name: string;
    };
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
export type ArtistFull = typeof ArtistFull.infer;
export declare const ArtistFull: import("arktype").Type<{
    artistId: string;
    name: string;
    type: "ARTIST";
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    topSongs: {
        type: "SONG";
        videoId: string;
        name: string;
        artist: {
            artistId: string | null;
            name: string;
        };
        album: {
            albumId: string;
            name: string;
        } | null;
        duration: number | null;
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }[];
    topAlbums: {
        type: "ALBUM";
        albumId: string;
        playlistId: string;
        name: string;
        artist: {
            artistId: string | null;
            name: string;
        };
        year: number | null;
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }[];
    topSingles: {
        type: "ALBUM";
        albumId: string;
        playlistId: string;
        name: string;
        artist: {
            artistId: string | null;
            name: string;
        };
        year: number | null;
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }[];
    topVideos: {
        type: "VIDEO";
        videoId: string;
        name: string;
        artist: {
            artistId: string | null;
            name: string;
        };
        duration: number | null;
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }[];
    featuredOn: {
        type: "PLAYLIST";
        playlistId: string;
        name: string;
        artist: {
            artistId: string | null;
            name: string;
        };
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }[];
    similarArtists: {
        artistId: string;
        name: string;
        type: "ARTIST";
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }[];
}>;
export type AlbumFull = typeof AlbumFull.infer;
export declare const AlbumFull: import("arktype").Type<{
    type: "ALBUM";
    albumId: string;
    playlistId: string;
    name: string;
    artist: {
        artistId: string | null;
        name: string;
    };
    year: number | null;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
    songs: {
        type: "SONG";
        videoId: string;
        name: string;
        artist: {
            artistId: string | null;
            name: string;
        };
        album: {
            albumId: string;
            name: string;
        } | null;
        duration: number | null;
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    }[];
}>;
export type PlaylistFull = typeof PlaylistFull.infer;
export declare const PlaylistFull: import("arktype").Type<{
    type: "PLAYLIST";
    playlistId: string;
    name: string;
    artist: {
        artistId: string | null;
        name: string;
    };
    videoCount: number;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}>;
export type SearchResult = typeof SearchResult.infer;
export declare const SearchResult: import("arktype").Type<{
    type: "SONG";
    videoId: string;
    name: string;
    artist: {
        artistId: string | null;
        name: string;
    };
    album: {
        albumId: string;
        name: string;
    } | null;
    duration: number | null;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
} | {
    type: "VIDEO";
    videoId: string;
    name: string;
    artist: {
        artistId: string | null;
        name: string;
    };
    duration: number | null;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
} | {
    artistId: string;
    name: string;
    type: "ARTIST";
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
} | {
    type: "ALBUM";
    albumId: string;
    playlistId: string;
    name: string;
    artist: {
        artistId: string | null;
        name: string;
    };
    year: number | null;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
} | {
    type: "PLAYLIST";
    playlistId: string;
    name: string;
    artist: {
        artistId: string | null;
        name: string;
    };
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}>;
export type PlaylistWatch = typeof PlaylistWatch.infer;
export declare const PlaylistWatch: import("arktype").Type<{
    type: "PLAYLIST";
    playlistId: string;
    name: string;
    thumbnails: {
        url: string;
        width: number;
        height: number;
    }[];
}>;
export type HomePageContent = typeof HomePageContent.infer;
export declare const HomePageContent: import("arktype").Type<{
    title: string;
    contents: ({
        type: "SONG";
        videoId: string;
        name: string;
        artist: {
            artistId: string | null;
            name: string;
        };
        album: {
            albumId: string;
            name: string;
        } | null;
        duration: number | null;
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    } | {
        artistId: string;
        name: string;
        type: "ARTIST";
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    } | {
        type: "ALBUM";
        albumId: string;
        playlistId: string;
        name: string;
        artist: {
            artistId: string | null;
            name: string;
        };
        year: number | null;
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    } | {
        type: "PLAYLIST";
        playlistId: string;
        name: string;
        artist: {
            artistId: string | null;
            name: string;
        };
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    } | {
        type: "PLAYLIST";
        playlistId: string;
        name: string;
        thumbnails: {
            url: string;
            width: number;
            height: number;
        }[];
    })[];
}>;
export type YTCookie = {
    name: string;
    value: string;
    expirationDate: number | string;
    domain: string;
    path: string;
    secure: boolean;
    httpOnly: boolean;
    sameSite: string;
    hostOnly: boolean;
};
