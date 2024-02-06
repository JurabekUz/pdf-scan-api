import mongoose from "mongoose";
import {CategoryInterface} from "../models/category.model";

const categorySchema = new mongoose.Schema<CategoryInterface>(
    {
        name: {
            type: String,
            required: true,
        },
        is_delete: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);


export const CategorySchema = mongoose.model("Category", categorySchema);

