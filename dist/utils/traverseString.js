"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const traverse_1 = __importDefault(require("./traverse"));
exports.default = (data, ...keys) => (index = 0) => {
    const value = (0, traverse_1.default)(data, ...keys);
    const flatValue = [value].flat().at(index);
    return flatValue || "";
};
