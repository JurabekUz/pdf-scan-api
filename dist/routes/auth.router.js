"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const jwt_util_1 = __importDefault(require("../utils/jwt.util"));
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.default.login);
router.get("/getMe", jwt_util_1.default.middleware, auth_controller_1.default.getMe);
exports.default = router;
