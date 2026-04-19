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

    // Ultimate safe role strategy (Hardcoded mapping)
    const roleMap: any = { 0: "ADMIN", 1: "DIRECTOR", 2: "USER" };
    const roleNum = Number(userObject.role);
    
    userObject.role_id = roleNum;
    userObject.role = roleMap[roleNum] || "USER";
    userObject.role_name = roleMap[roleNum] || "USER";
    userObject.roleName = roleMap[roleNum] || "USER";

    // Snake_case timestamps for Flutter (ISO string)
    if (user.createdAt) userObject.created_at = (user.createdAt as Date).toISOString();
    if (user.updatedAt) userObject.updated_at = (user.updatedAt as Date).toISOString();

    if (!userObject.file) {
        userObject.file = {
            _id: "000000000000000000000000",
            id: "000000000000000000000000",
            name: "Fayl biriktirilmagan",
            path: "",
            size: 0,
            pageCount: 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
    } else if (userObject.file && typeof userObject.file === "object" && userObject.file._id) {
        const fileIdStr = userObject.file._id.toString();
        userObject.file.id = fileIdStr;
        userObject.file._id = fileIdStr; // MAJBURIY: _id ni ham string qilib qo'yamiz
        if (userObject.file.createdAt) userObject.file.created_at = (userObject.file.createdAt as Date).toISOString();
        if (userObject.file.updatedAt) userObject.file.updated_at = (userObject.file.updatedAt as Date).toISOString();
    }

    delete userObject.password;
    delete userObject.__v;

    return userObject;
};
export const UserSchema = mongoose.model("User", userSchema);
