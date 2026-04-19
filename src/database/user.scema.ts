import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {UserInterface, UserRoles} from "../models/user.model";

const userSchema = new mongoose.Schema<UserInterface>(
    {
        username: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        file: {type: mongoose.Schema.Types.ObjectId, ref: "File"},
        is_delete: {type: Boolean, default: false},
        password: {type: String, required: true},
        role: {type: Number, enum: UserRoles, default: UserRoles.USER},
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return next();
    } catch (error: any) {
        return next(error);
    }
});

userSchema.pre("find", function () {
        this.populate("file", "-is_delete -__v ");
    }
);

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    // Map role from number to string name (Old logic)
    if (typeof userObject.role === "number") {
        userObject.role = UserRoles[userObject.role];
    }

    // Convert ObjectId to string safely to avoid BSON errors
    if (userObject._id) userObject._id = userObject._id.toString();

    const emptyFile = { _id: "000000000000000000000000", name: "Fayl biriktirilmagan", path: "", size: 0, pageCount: 0 };

    if (userObject.file && typeof userObject.file === "object" && userObject.file._id) {
        const fileIdStr = userObject.file._id.toString();
        // Use spread to avoid readonly issues but KEEP original _id property name
        userObject.file = {
            ...userObject.file,
            _id: fileIdStr
        };
    } else if (!userObject.file || typeof userObject.file !== "object") {
        userObject.file = emptyFile;
    }

    delete userObject.password;
    delete userObject.__v;
    return userObject;
};
export const UserSchema = mongoose.model("User", userSchema);
