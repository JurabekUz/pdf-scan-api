"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    file: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "File" },
    is_delete: { type: Boolean, default: false },
    password: { type: String, required: true },
    role: { type: Number, enum: user_model_1.UserRoles, default: user_model_1.UserRoles.USER },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified("password"))
            return next();
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            user.password = yield bcrypt_1.default.hash(user.password, salt);
            return next();
        }
        catch (error) {
            return next(error);
        }
    });
});
userSchema.pre("find", function () {
    this.populate("file", "-is_delete -__v ");
});
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    // userObject.role = user_model_1.UserRoles[userObject.role];
    delete userObject.password;
    return userObject;
};
exports.UserSchema = mongoose_1.default.model("User", userSchema);
