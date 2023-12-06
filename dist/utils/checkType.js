"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_to_json_schema_1 = __importDefault(require("zod-to-json-schema"));
exports.default = (data, schema) => {
    const result = schema.safeParse(data);
    if (result.success) {
        return data;
    }
    else {
        if ("error" in result) {
            console.error("Invalid data schema, please report to https://github.com/zS1L3NT/ts-npm-ytmusic-api/issues/new/choose", JSON.stringify({
                schema: (0, zod_to_json_schema_1.default)(schema),
                data,
                error: result.error,
            }, null, 2));
        }
        return data;
    }
};
