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
const user_scema_1 = require("../database/user.scema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_util_1 = __importDefault(require("../utils/jwt.util"));
class AbstractAuthController {
}
class AuthController extends AbstractAuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reqUser = req.body;
                const currentUser = yield user_scema_1.UserSchema.findOne({
                    username: reqUser.username,
                });
                if (!currentUser) {
                    return res.status(404).json({
                        ok: false,
                        message: "User not found",
                    });
                }
                const isPasswordCorrect = yield comparePassword(reqUser.password, currentUser === null || currentUser === void 0 ? void 0 : currentUser.password);
                if (!isPasswordCorrect) {
                    return res.status(401).json({
                        ok: false,
                        message: "Wrong password",
                    });
                }
                const token = jwt_util_1.default.generateToken({ id: currentUser === null || currentUser === void 0 ? void 0 : currentUser._id });
                res.status(200).json({
                    ok: true,
                    data: currentUser.toJSON(),
                    token,
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
function comparePassword(password, password1) {
    try {
        return bcrypt_1.default.compareSync(password, password1 !== null && password1 !== void 0 ? password1 : "");
    }
    catch (error) {
        return false;
    }
}
exports.default = new AuthController();
