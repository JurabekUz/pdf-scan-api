"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const documentSchema = new mongoose_1.default.Schema({
    is_delete: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
    },
    pageCount: {
        type: Number,
    },
    path: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.FileSchema = mongoose_1.default.model("File", documentSchema);
