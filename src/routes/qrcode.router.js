"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const qrcode_controller_1 = __importDefault(require("../controllers/qrcode.controller"));
const files_controller_1 = __importDefault(require("../controllers/files.controller"));
const qrcode_controller_2 = __importDefault(require("../controllers/qrcode.controller"));
const router = (0, express_1.Router)();
router.get("/qrcode/generate", qrcode_controller_1.default.generateQrCode);
router.get("/scan/:id", qrcode_controller_2.default.scanQrCode);
router.get("/scan/download/:id", files_controller_1.default.downloadFile);
exports.default = router;
