import mongoose from "mongoose";
import {UserSchema} from "./user.scema";
import {UserRoles} from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/pdf_scan_api";

mongoose.connect(mongoUrl)
    .then(async () => {
        console.log("✅ MongoDB ga ulanish muvaffaqiyatli (Mongoose)");
        const adminExist = await UserSchema.findOne({username: "admin"});
        if (!adminExist) {
            await UserSchema.create({
                username: "admin",
                password: process.env.ADMIN_PASSWORD || "admin123",
                name: "Administrator",
                role: UserRoles.ADMIN
            });
            console.log("✅ Default Admin yaratildi");
        }
    })
    .catch((err) => {
        console.error("❌ MongoDB ulanishda xatolik:", err);
        process.exit(1);
    });

export default mongoose;
