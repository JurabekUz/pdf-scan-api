"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const files_controller_1 = __importDefault(require("../controllers/files.controller"));
const multer_util_1 = __importDefault(require("../utils/multer.util"));
const router = (0, express_1.Router)();
router.get("/", files_controller_1.default.getFiles);
router.get("/:id", files_controller_1.default.getFile);
router.get("/download/:id", files_controller_1.default.downloadFile);
router.post("/upload", multer_util_1.default.uploadFile, files_controller_1.default.createFile);
router.put("/:id", files_controller_1.default.updateFile);
router.delete("/:id", files_controller_1.default.deleteFile);
exports.default = router;
