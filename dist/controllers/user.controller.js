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
const user_scema_1 = require("../database/user.scema");
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AbstractUserController {
}
class UserController extends AbstractUserController {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_scema_1.UserSchema.find({}, { password: 0 } // means exclude passwordHash field
                );
                res.status(200).json({
                    ok: true,
                    totalElements: users.length,
                    data: users,
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_scema_1.UserSchema.findById(req.params.id, { password: 0 });
                res.status(200).json({
                    ok: true,
                    data: user,
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let role = req.body.role;
                if (typeof role === "string") {
                    role = user_model_1.UserRoles[role];
                }
                // Explicitly cast file ID if present
                const userData = Object.assign(Object.assign({}, req.body), { role: role });
                if (req.body.file && mongoose_1.default.Types.ObjectId.isValid(req.body.file)) {
                    userData.file = new mongoose_1.default.Types.ObjectId(req.body.file);
                }
                const user = yield user_scema_1.UserSchema.create(userData);
                res.status(201).json({
                    ok: true,
                    data: user,
                });
            }
            catch (error) {
                console.error("User Create Error:", error);
                res.status(400).json({
                    ok: false,
                    message: error.message || error,
                });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.body.role !== undefined) {
                    let role = req.body.role;
                    if (typeof role === "string") {
                        role = user_model_1.UserRoles[role];
                    }
                    req.body.role = role;
                }
                if (req.body.password) {
                    req.body.password = yield bcryptjs_1.default.hash(req.body.password, 10);
                }
                const user = yield user_scema_1.UserSchema.findByIdAndUpdate(req.params.id, req.body, {
                    new: true,
                });
                res.status(200).json({
                    ok: true,
                    data: user,
                });
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    message: error.message || error,
                });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_scema_1.UserSchema.findByIdAndUpdate(req.params.id, { is_delete: true }, { new: true });
                res.status(200).json({
                    ok: true,
                    data: user,
                });
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    message: error.message || error,
                });
            }
        });
    }
    checkRole(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.requestedBy.id;
                const user = yield user_scema_1.UserSchema.findById(userId);
                if ((user === null || user === void 0 ? void 0 : user.role) == user_model_1.UserRoles.DIRECTOR || (user === null || user === void 0 ? void 0 : user.role) == user_model_1.UserRoles.ADMIN) {
                    next();
                }
                else {
                    res.status(403).json({
                        ok: false,
                        message: "You don't have permission to do this action",
                    });
                }
            }
            catch (error) {
                return res.status(500).json(error);
            }
        });
    }
}
exports.default = new UserController();
