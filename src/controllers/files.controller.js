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
Object.defineProperty(exports, "__esModule", { value: true });
const files_scema_1 = require("../database/files.scema");
class AbstractFileController {
}
class FileController extends AbstractFileController {
    createFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.file;
                const fileData = yield files_scema_1.FileSchema.create({
                    is_delete: false,
                    name: file === null || file === void 0 ? void 0 : file.originalname,
                    path: file === null || file === void 0 ? void 0 : file.path,
                    size: file === null || file === void 0 ? void 0 : file.size
                });
                res.status(201).json({
                    ok: true,
                    data: fileData,
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    message: err
                });
            }
        });
    }
    deleteFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield files_scema_1.FileSchema.findByIdAndUpdate(req.params.id, { is_delete: true }, { new: true });
                res.status(200).json({
                    ok: true,
                    message: "File deleted",
                    data: deleted,
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    message: err
                });
            }
        });
    }
    getFiles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield files_scema_1.FileSchema.find({ is_delete: false });
                res.status(200).json({
                    ok: true,
                    totalElements: categories.length,
                    data: categories,
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    message: err
                });
            }
        });
    }
    getFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileData = yield files_scema_1.FileSchema.findById(req.params.id);
                res.status(200).json({
                    ok: true,
                    data: fileData,
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    message: err
                });
            }
        });
    }
    updateFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newFile = req.body;
                const updatedFile = yield files_scema_1.FileSchema.findByIdAndUpdate(req.params.id, newFile, { new: true });
                res.status(200).json({
                    ok: true,
                    data: updatedFile,
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    message: err
                });
            }
        });
    }
    downloadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileData = yield files_scema_1.FileSchema.findById(req.params.id);
                if (!fileData) {
                    res.status(404).json({
                        ok: false,
                        message: "File not found",
                    });
                    return;
                }
                res.download(fileData === null || fileData === void 0 ? void 0 : fileData.path);
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    message: err
                });
            }
        });
    }
}
exports.default = new FileController();
