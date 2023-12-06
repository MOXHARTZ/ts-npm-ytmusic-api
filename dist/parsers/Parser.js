"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Parser {
    static parseDuration(time) {
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
}
exports.default = Parser;
