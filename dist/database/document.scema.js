"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const documentSchema = new mongoose_1.default.Schema({
    type: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
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
    }
}, {
    timestamps: true,
});
// populate
documentSchema.pre("find", function () {
    this.populate("type", "-is_delete -__v ");
    this.populate("file", "-is_delete -__v ");
    this.populate("by", "-password -is_delete -__v ");
});
exports.DocumentSchema = mongoose_1.default.model("Document", documentSchema);
