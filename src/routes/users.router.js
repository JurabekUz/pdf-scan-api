"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = (0, express_1.Router)();
router.get("/", user_controller_1.default.getUsers);
router.get("/:id", user_controller_1.default.getUser);
router.post("/create", user_controller_1.default.checkRole, user_controller_1.default.createUser);
router.put("/:id", user_controller_1.default.checkRole, user_controller_1.default.updateUser);
router.delete("/:id", user_controller_1.default.checkRole, user_controller_1.default.deleteUser);
exports.default = router;
