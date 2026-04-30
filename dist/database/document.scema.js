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
documentSchema.pre(["find", "findOne"], function () {
    this.populate("type", "-is_delete -__v ");
    this.populate("scope", "-is_delete -__v ");
    this.populate("file", "-is_delete -__v ");
    this.populate("by", "-password -is_delete -__v ");
});
documentSchema.methods.toJSON = function () {
    const document = this;
    const docObject = document.toObject();
    const dummyDate = new Date().toISOString();
    if (docObject._id)
        docObject._id = docObject._id.toString();
    if (docObject.type && typeof docObject.type === "object" && docObject.type._id) {
        docObject.type = Object.assign(Object.assign({}, docObject.type), { _id: docObject.type._id.toString() });
    }
    else {
        docObject.type = { _id: "000000000000000000000000", name: "Nomaʼlum", createdAt: dummyDate, updatedAt: dummyDate };
    }
    if (docObject.scope && typeof docObject.scope === "object" && docObject.scope._id) {
        docObject.scope = Object.assign(Object.assign({}, docObject.scope), { _id: docObject.scope._id.toString() });
    }
    else {
        docObject.scope = { _id: "000000000000000000000000", name: "Nomaʼlum", createdAt: dummyDate, updatedAt: dummyDate };
    }
    if (docObject.file && typeof docObject.file === "object" && docObject.file._id) {
        docObject.file = Object.assign(Object.assign({}, docObject.file), { _id: docObject.file._id.toString() });
    }
    else {
        docObject.file = { _id: "000000000000000000000000", name: "O‘chirilgan fayl", path: "", size: 0, pageCount: 0, createdAt: dummyDate, updatedAt: dummyDate };
    }
    if (docObject.by && typeof docObject.by === "object" && docObject.by._id) {
        const byIdStr = docObject.by._id.toString();
        let roleName = docObject.by.role;
        if (typeof docObject.by.role === "number") {
            const roleMap = { 0: "ADMIN", 1: "DIRECTOR", 2: "USER" };
            roleName = roleMap[docObject.by.role] || "USER";
        }
        docObject.by = Object.assign(Object.assign({}, docObject.by), { _id: byIdStr, role: roleName });
        if (!docObject.by.file) {
            docObject.by.file = { _id: "000000000000000000000000", name: "", path: "", size: 0, pageCount: 0, createdAt: dummyDate, updatedAt: dummyDate };
        }
    }
    else {
        docObject.by = {
            _id: "000000000000000000000000",
            name: "O‘chirilgan",
            username: "unknown",
            role: "USER",
            file: { _id: "000000000000000000000000", name: "", path: "", size: 0, pageCount: 0, createdAt: dummyDate, updatedAt: dummyDate },
            createdAt: dummyDate,
            updatedAt: dummyDate
        };
    }
    delete docObject.__v;
    return docObject;
};
exports.DocumentSchema = mongoose_1.default.model("Document", documentSchema);
