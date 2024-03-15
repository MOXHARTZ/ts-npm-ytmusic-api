import YTMusic from "./YTMusic"

type YTCookie = {
	name: string,
	value: string,
	expirationDate: number | string,
	domain: string,
	path: string,
	secure: boolean,
	httpOnly: boolean,
	sameSite: string,
	hostOnly: boolean
}

export type {
	AlbumBasic,
	AlbumDetailed,
	AlbumFull,
	ArtistBasic,
	ArtistDetailed,
	ArtistFull,
	PlaylistDetailed,
	PlaylistFull,
	SearchResult,
	SongDetailed,
	SongFull,
	ThumbnailFull,
	VideoDetailed,
	VideoFull,
} from "./@types/types"

export type {
	YTCookie,
}

export default YTMusic
