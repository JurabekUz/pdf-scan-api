import mongoose from "mongoose";
import {ScopeInterface} from "../models/scope.model";

const scopeSchema = new mongoose.Schema<ScopeInterface>(
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


export const ScopeSchema = mongoose.model("Scope", scopeSchema);

