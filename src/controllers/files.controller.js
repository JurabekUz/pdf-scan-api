"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var files_scema_1 = require("../database/files.scema");
var AbstractFileController = /** @class */ (function () {
    function AbstractFileController() {
    }
    return AbstractFileController;
}());
var FileController = /** @class */ (function (_super) {
    __extends(FileController, _super);
    function FileController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileController.prototype.createFile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var file, fileData, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        file = req.file;
                        return [4 /*yield*/, files_scema_1.FileSchema.create({
                                is_delete: false,
                                name: file === null || file === void 0 ? void 0 : file.originalname,
                                path: file === null || file === void 0 ? void 0 : file.path,
                                size: file === null || file === void 0 ? void 0 : file.size,
                                pageCount: req.body.pageCount || 0,
                            })];
                    case 1:
                        fileData = _a.sent();
                        res.status(201).json({
                            ok: true,
                            data: fileData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.status(500).json({
                            ok: false,
                            message: err_1
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileController.prototype.deleteFile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var deleted, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, files_scema_1.FileSchema.findByIdAndUpdate(req.params.id, { is_delete: true }, { new: true })];
                    case 1:
                        deleted = _a.sent();
                        res.status(200).json({
                            ok: true,
                            message: "File deleted",
                            data: deleted,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(500).json({
                            ok: false,
                            message: err_2
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileController.prototype.getFiles = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var categories, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, files_scema_1.FileSchema.find({ is_delete: false })];
                    case 1:
                        categories = _a.sent();
                        res.status(200).json({
                            ok: true,
                            totalElements: categories.length,
                            data: categories,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        res.status(500).json({
                            ok: false,
                            message: err_3
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileController.prototype.getFile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var fileData, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, files_scema_1.FileSchema.findById(req.params.id)];
                    case 1:
                        fileData = _a.sent();
                        res.status(200).json({
                            ok: true,
                            data: fileData,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        res.status(500).json({
                            ok: false,
                            message: err_4
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileController.prototype.updateFile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var newFile, updatedFile, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newFile = req.body;
                        return [4 /*yield*/, files_scema_1.FileSchema.findByIdAndUpdate(req.params.id, newFile, { new: true })];
                    case 1:
                        updatedFile = _a.sent();
                        res.status(200).json({
                            ok: true,
                            data: updatedFile,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        res.status(500).json({
                            ok: false,
                            message: err_5
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileController.prototype.downloadFile = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var fileData, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, files_scema_1.FileSchema.findById(req.params.id)];
                    case 1:
                        fileData = _a.sent();
                        if (!fileData) {
                            res.status(404).json({
                                ok: false,
                                message: "File not found",
                            });
                            return [2 /*return*/];
                        }
                        res.download(fileData === null || fileData === void 0 ? void 0 : fileData.path);
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        res.status(500).json({
                            ok: false,
                            message: err_6
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FileController;
}(AbstractFileController));
exports.default = new FileController();
