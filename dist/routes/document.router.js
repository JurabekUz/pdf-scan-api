"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const document_controller_1 = __importDefault(require("../controllers/document.controller"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const router = (0, express_1.Router)();
router.get("/", document_controller_1.default.getDocuments);
router.get("/:id", document_controller_1.default.getDocument);
router.post("/create", document_controller_1.default.createDocument);
router.put("/update/:id", document_controller_1.default.updateDocument);
router.put("/change-status/:id", user_controller_1.default.checkRole, document_controller_1.default.changeStatus);
router.delete("/:id", document_controller_1.default.deleteDocument);
exports.default = router;
