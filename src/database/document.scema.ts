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
documentSchema.pre("find", function () {
    this.populate("type", "-is_delete -__v ");
    this.populate("scope", "-is_delete -__v ");
    this.populate("file", "-is_delete -__v ");
    this.populate("by", "-password -is_delete -__v ");
});

documentSchema.methods.toJSON = function () {
    const document = this;
    const docObject = document.toObject();

    docObject.id = docObject._id.toString();

    // Snake_case timestamps (ISO string)
    if (document.createdAt) docObject.created_at = (document.createdAt as Date).toISOString();
    if (document.updatedAt) docObject.updated_at = (document.updatedAt as Date).toISOString();

    // Populated fields ID handling
    // Populated fields ID handling with safe spread to avoid ReadOnly errors
    if (docObject.type && typeof docObject.type === "object" && docObject.type._id) {
        const typeIdStr = docObject.type._id.toString();
        docObject.type = { ...docObject.type, id: typeIdStr, _id: typeIdStr };
    }
    if (docObject.scope && typeof docObject.scope === "object" && docObject.scope._id) {
        const scopeIdStr = docObject.scope._id.toString();
        docObject.scope = { ...docObject.scope, id: scopeIdStr, _id: scopeIdStr };
    }
    if (docObject.file && typeof docObject.file === "object" && docObject.file._id) {
        const fileIdStr = docObject.file._id.toString();
        docObject.file = { ...docObject.file, id: fileIdStr, _id: fileIdStr };
    }
    if (docObject.by && typeof docObject.by === "object" && docObject.by._id) {
        const byIdStr = docObject.by._id.toString();
        docObject.by = { ...docObject.by, id: byIdStr, _id: byIdStr };
    }

    delete docObject.__v;
    return docObject;
};

export const DocumentSchema = mongoose.model("Document", documentSchema);
