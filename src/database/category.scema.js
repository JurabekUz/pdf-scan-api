"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    is_delete: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.CategorySchema = mongoose_1.default.model("Category", categorySchema);
