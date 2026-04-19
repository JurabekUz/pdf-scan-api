import mongoose from "mongoose";
import {DocumentInterface} from "../models/document.model";

const documentSchema = new mongoose.Schema<DocumentInterface>(
    {
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        scope: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Scope",
            required: true,
        },
        is_delete: {
            type: Boolean,
            default: false,
        },
        file: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "File",
            required: true,
        },
        by: {
            type: mongoose.Schema.Types.ObjectId,
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
    },
    {
        timestamps: true,
    }
);

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

    // Ensure main _id is string for BSON safety
    if (docObject._id) docObject._id = docObject._id.toString();

    const emptyFile = { _id: "000000000000000000000000", name: "Fayl yo'q", path: "", size: 0, pageCount: 0 };
    const emptyUser = { _id: "000000000000000000000000", username: "noma'lum", name: "Noma'lum foydalanuvchi", role: "USER" };
    const emptyCategory = { _id: "000000000000000000000000", name: "Noma'lum" };

    // Populated fields handling with safe spread - KEEPING original _id names
    if (docObject.type && typeof docObject.type === "object" && docObject.type._id) {
        docObject.type = { ...docObject.type, _id: docObject.type._id.toString() };
    } else if (!docObject.type || typeof docObject.type !== "object") {
        docObject.type = emptyCategory;
    }

    if (docObject.scope && typeof docObject.scope === "object" && docObject.scope._id) {
        docObject.scope = { ...docObject.scope, _id: docObject.scope._id.toString() };
    } else if (!docObject.scope || typeof docObject.scope !== "object") {
        docObject.scope = emptyCategory;
    }

    if (docObject.file && typeof docObject.file === "object" && docObject.file._id) {
        docObject.file = { ...docObject.file, _id: docObject.file._id.toString() };
    } else if (!docObject.file || typeof docObject.file !== "object") {
        docObject.file = emptyFile;
    }

    if (docObject.by && typeof docObject.by === "object" && docObject.by._id) {
        docObject.by = { ...docObject.by, _id: docObject.by._id.toString() };
    } else if (!docObject.by || typeof docObject.by !== "object") {
        docObject.by = emptyUser;
    }

    delete docObject.__v;
    return docObject;
};

export const DocumentSchema = mongoose.model("Document", documentSchema);
