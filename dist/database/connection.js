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
exports.mongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
const user_scema_1 = require("./user.scema");
const user_model_1 = require("../models/user.model");
mongoose_1.default.connect(process.env.MONGO_URL || "mongodb://localhost:27017/express-typescript");
mongoose_1.default.connection.on("connected", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExist = yield user_scema_1.UserSchema.findOne({ username: "admin" });
        console.log("MongoDB connected successfully");
        if (isExist)
            return;
        yield user_scema_1.UserSchema.create({
            role: user_model_1.UserRoles.ADMIN,
            name: "Admin",
            password: process.env.ADMIN_PASSWORD || "narzullayev",
            username: "admin",
        });
    }
    catch (e) {
        console.log(e);
    }
}));
mongoose_1.default.connection.on("error", (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});
