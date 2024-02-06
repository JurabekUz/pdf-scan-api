import mongoose from "mongoose";
import {FileInterface} from "../models/file.model";

const documentSchema = new mongoose.Schema<FileInterface>(
    {
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
        path: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


export const FileSchema = mongoose.model("File", documentSchema);
