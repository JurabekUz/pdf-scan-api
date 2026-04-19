"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSchema = void 0;
var mongoose_1 = require("mongoose");
var documentSchema = new mongoose_1.default.Schema({
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
