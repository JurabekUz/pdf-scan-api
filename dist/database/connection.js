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
const mongoose_1 = __importDefault(require("mongoose"));
const user_scema_1 = require("./user.scema");
const user_model_1 = require("../models/user.model");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/pdf_scan_api";
mongoose_1.default.connect(mongoUrl)
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("✅ MongoDB ga ulanish muvaffaqiyatli (Mongoose)");
    const adminExist = yield user_scema_1.UserSchema.findOne({ username: "admin" });
    if (!adminExist) {
        yield user_scema_1.UserSchema.create({
            username: "admin",
            password: process.env.ADMIN_PASSWORD || "admin123",
            name: "Administrator",
            role: user_model_1.UserRoles.ADMIN
        });
        console.log("✅ Default Admin yaratildi");
    }
}))
    .catch((err) => {
    console.error("❌ MongoDB ulanishda xatolik:", err);
    process.exit(1);
});
exports.default = mongoose_1.default;
