"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseString = exports.traverseList = exports.traverse = void 0;
const traverse = (data, ...keys) => {
    const again = (data, key, deadEnd = false) => {
        const res = [];
        if (data instanceof Object && key in data) {
            res.push(data[key]);
            if (deadEnd)
                return res.length === 1 ? res[0] : res;
        }
        if (data instanceof Array) {
            res.push(...data.map(v => again(v, key)).flat());
        }
        else if (data instanceof Object) {
            res.push(...Object.keys(data)
                .map(k => again(data[k], key))
                .flat());
        }
        return res.length === 1 ? res[0] : res;
    };
    let value = data;
    const lastKey = keys.at(-1);
    for (const key of keys) {
        value = again(value, key, lastKey === key);
    }
    return value;
};
exports.traverse = traverse;
const traverseList = (data, ...keys) => {
    return [(0, exports.traverse)(data, ...keys)].flat();
};
exports.traverseList = traverseList;
const traverseString = (data, ...keys) => {
    return (0, exports.traverseList)(data, ...keys).at(0) || "";
};
exports.traverseString = traverseString;
