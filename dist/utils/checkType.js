"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (data, type) => {
    const result = type(data);
    if (result.data) {
        return result.data;
    }
    else {
        if ("error" in result) {
            console.error("Invalid data type, please report to https://github.com/zS1L3NT/ts-npm-ytmusic-api/issues/new/choose", JSON.stringify({
                type: type.definition,
                data,
                error: result.error,
            }, null, 2));
        }
        return data;
    }
};
