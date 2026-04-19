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
    if (docObject.type && typeof docObject.type === "object" && docObject.type._id) docObject.type.id = docObject.type._id.toString();
    if (docObject.scope && typeof docObject.scope === "object" && docObject.scope._id) docObject.scope.id = docObject.scope._id.toString();
    if (docObject.file && typeof docObject.file === "object" && docObject.file._id) docObject.file.id = docObject.file._id.toString();
    if (docObject.by && typeof docObject.by === "object" && docObject.by._id) docObject.by.id = docObject.by._id.toString();

    delete docObject.__v;
    return docObject;
};

export const DocumentSchema = mongoose.model("Document", documentSchema);
