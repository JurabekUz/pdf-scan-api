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

    const idStr = userObject._id.toString();
    userObject.id = idStr;
    userObject._id = idStr;

    // Dual role strategy
    const roleNum = Number(userObject.role);
    userObject.role_id = roleNum;
    userObject.role = UserRoles[roleNum]; // Revert to original String format
    userObject.role_name = UserRoles[roleNum];
    userObject.roleName = UserRoles[roleNum];

    // Snake_case timestamps for Flutter
    userObject.created_at = userObject.createdAt;
    userObject.updated_at = userObject.updatedAt;

    if (!userObject.file) {
        userObject.file = {
            _id: "000000000000000000000000",
            id: "000000000000000000000000",
            name: "Fayl biriktirilmagan",
            path: "",
            size: 0,
            pageCount: 0,
            created_at: new Date(),
            updated_at: new Date()
        };
    } else if (typeof userObject.file === "object") {
        userObject.file.id = userObject.file._id ? userObject.file._id.toString() : "";
        userObject.file.created_at = userObject.file.createdAt;
        userObject.file.updated_at = userObject.file.updatedAt;
    }

    delete userObject.password;
    delete userObject.__v;

    return userObject;
};
export const UserSchema = mongoose.model("User", userSchema);
