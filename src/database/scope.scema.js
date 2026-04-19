"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopeSchema = void 0;
var mongoose_1 = require("mongoose");
var scopeSchema = new mongoose_1.default.Schema({
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
exports.ScopeSchema = mongoose_1.default.model("Scope", scopeSchema);
