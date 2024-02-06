import mongoose from "mongoose";
import {UserSchema} from "./user.scema";
import {UserRoles} from "../models/user.model";

mongoose.connect(
    process.env.MONGO_URL || "mongodb://localhost:27017/express-typescript"
);
mongoose.connection.on("connected", async () => {
    try {
        const isExist = await UserSchema.findOne({username: "admin"});
        console.log("MongoDB connected successfully");
        if (isExist) return;
        await UserSchema.create({
            role: UserRoles.ADMIN,
            name: "Admin",
            password: process.env.ADMIN_PASSWORD || "narzullayev",
            username: "admin",
        });
    } catch (e) {
        console.log(e);
    }
});
mongoose.connection.on("error", (err) => {
    console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
    process.exit();
});

export {mongoose};
