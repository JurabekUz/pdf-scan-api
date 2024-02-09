import mongoose from "mongoose";
import {DocumentInterface} from "../models/document.model";

const documentSchema = new mongoose.Schema<DocumentInterface>(
    {
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
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
    this.populate("file", "-is_delete -__v ");
    this.populate("by", "-password -is_delete -__v ");
});
export const DocumentSchema = mongoose.model("Document", documentSchema);
