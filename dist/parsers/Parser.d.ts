import { HomePageContent } from "../@types/types";
export default class Parser {
    static parseDuration(time: string): number | null;
    static parseNumber(string: string): number;
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
    static parseMixedContent(data: any): HomePageContent | null;
}
