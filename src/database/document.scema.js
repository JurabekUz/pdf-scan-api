"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentSchema = void 0;
var mongoose_1 = require("mongoose");
var documentSchema = new mongoose_1.default.Schema({
    type: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    scope: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Scope",
        required: true,
    },
    is_delete: {
        type: Boolean,
        default: false,
    },
    file: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "File",
        required: true,
    },
    by: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    number: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "rejected"],
        default: "pending",
    }
}, {
    timestamps: true,
});
// populate
documentSchema.pre("find", function () {
    this.populate("type", "-is_delete -__v ");
    this.populate("scope", "-is_delete -__v ");
    this.populate("file", "-is_delete -__v ");
    this.populate("by", "-password -is_delete -__v ");
});
exports.DocumentSchema = mongoose_1.default.model("Document", documentSchema);
