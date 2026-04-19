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
var document_scema_1 = require("../database/document.scema");
var user_scema_1 = require("../database/user.scema");
var user_model_1 = require("../models/user.model");
var AbstractDocumentController = /** @class */ (function () {
    function AbstractDocumentController() {
    }
    return AbstractDocumentController;
}());
var DocumentController = /** @class */ (function (_super) {
    __extends(DocumentController, _super);
    function DocumentController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DocumentController.prototype.createDocument = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var document_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, document_scema_1.DocumentSchema.create({
                                file: req.body.file,
                                type: req.body.type,
                                by: req.body.requestedBy.id,
                                date: Date.now(),
                                number: req.body.number,
                                value: req.body.value,
                                customerName: req.body.customerName,
                                scope: req.body.scope,
                            })];
                    case 1:
                        document_1 = _a.sent();
                        res.status(201).json({
                            ok: true,
                            data: document_1,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.status(500).json({
                            ok: false,
                            message: err_1,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DocumentController.prototype.deleteDocument = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, document_scema_1.DocumentSchema.findByIdAndUpdate(req.params.id, {
                                is_delete: true,
                            })];
                    case 1:
                        _a.sent();
                        res.status(200).json({
                            ok: true,
                            message: "Document deleted",
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(500).json({
                            ok: false,
                            message: err_2,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DocumentController.prototype.getDocuments = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var page, limit, skip, search, from, to, filterBy, filterValue, reqById, user, documents, totalElements, _a, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 20, , 21]);
                        page = req.query.page ? parseInt(req.query.page.toString()) : 1;
                        page = page < 1 ? 1 : page;
                        limit = req.query.limit ? parseInt(req.query.limit.toString()) : 15;
                        skip = (page - 1) * limit;
                        search = req.query.search ? req.query.search.toString() : "";
                        from = req.query.from ? (req.query.from.toString()) : null;
                        to = req.query.to ? (req.query.to.toString()) : null;
                        filterBy = req.query.filterBy ? req.query.filterBy.toString() : "";
                        filterValue = req.query.filterValue ? req.query.filterValue.toString() : "";
                        reqById = req.body.requestedBy;
                        return [4 /*yield*/, user_scema_1.UserSchema.findById(reqById.id)];
                    case 1:
                        user = _b.sent();
                        documents = void 0;
                        totalElements = void 0;
                        if (!(limit == null && (user === null || user === void 0 ? void 0 : user.role) != user_model_1.UserRoles.USER)) return [3 /*break*/, 3];
                        return [4 /*yield*/, document_scema_1.DocumentSchema.find()];
                    case 2:
                        documents = _b.sent();
                        totalElements = documents.length;
                        return [3 /*break*/, 19];
                    case 3:
                        if (!(limit == null && (user === null || user === void 0 ? void 0 : user.role) == user_model_1.UserRoles.USER)) return [3 /*break*/, 5];
                        return [4 /*yield*/, document_scema_1.DocumentSchema.find({
                                is_delete: false,
                                by: reqById.id,
                                $or: [{ customerName: { $regex: search, $options: "i" } }, { number: { $regex: search, $options: "i" } },
                                ]
                            })];
                    case 4:
                        documents = _b.sent();
                        totalElements = documents.length;
                        return [3 /*break*/, 19];
                    case 5:
                        if (!(from && to && (user === null || user === void 0 ? void 0 : user.role) != user_model_1.UserRoles.USER)) return [3 /*break*/, 7];
                        return [4 /*yield*/, document_scema_1.DocumentSchema.find({
                                is_delete: false,
                                by: ((user === null || user === void 0 ? void 0 : user.role) === user_model_1.UserRoles.ADMIN || (user === null || user === void 0 ? void 0 : user.role) === user_model_1.UserRoles.DIRECTOR) ? { $exists: true } : reqById.id,
                                createdAt: {
                                    $gte: new Date(from),
                                    $lt: new Date(to),
                                }
                            })
                                .skip(skip)
                                .limit(limit)];
                    case 6:
                        documents = _b.sent();
                        totalElements = documents.length;
                        return [3 /*break*/, 19];
                    case 7:
                        if (!(filterBy != null && filterValue != null && (user === null || user === void 0 ? void 0 : user.role) != user_model_1.UserRoles.USER)) return [3 /*break*/, 17];
                        _a = filterBy;
                        switch (_a) {
                            case "category": return [3 /*break*/, 8];
                            case "scope": return [3 /*break*/, 10];
                            case "by": return [3 /*break*/, 12];
                        }
                        return [3 /*break*/, 14];
                    case 8: return [4 /*yield*/, document_scema_1.DocumentSchema.find({
                            is_delete: false,
                            by: ((user === null || user === void 0 ? void 0 : user.role) === user_model_1.UserRoles.ADMIN || (user === null || user === void 0 ? void 0 : user.role) === user_model_1.UserRoles.DIRECTOR) ? { $exists: true } : reqById.id,
                            type: filterValue,
                        })
                            .skip(skip)
                            .limit(limit)];
                    case 9:
                        documents = _b.sent();
                        totalElements = documents.length;
                        return [3 /*break*/, 16];
                    case 10: return [4 /*yield*/, document_scema_1.DocumentSchema.find({
                            is_delete: false,
                            by: ((user === null || user === void 0 ? void 0 : user.role) === user_model_1.UserRoles.ADMIN || (user === null || user === void 0 ? void 0 : user.role) === user_model_1.UserRoles.DIRECTOR) ? { $exists: true } : reqById.id,
                            scope: filterValue,
                        })
                            .skip(skip)
                            .limit(limit)];
                    case 11:
                        documents = _b.sent();
                        totalElements = documents.length;
                        return [3 /*break*/, 16];
                    case 12: return [4 /*yield*/, document_scema_1.DocumentSchema.find({
                            is_delete: false,
                            by: filterValue,
                        })
                            .skip(skip)
                            .limit(limit)];
                    case 13:
                        documents = _b.sent();
                        totalElements = documents.length;
                        return [3 /*break*/, 16];
                    case 14: return [4 /*yield*/, document_scema_1.DocumentSchema.find({
                            is_delete: false,
                            by: ((user === null || user === void 0 ? void 0 : user.role) === user_model_1.UserRoles.ADMIN || (user === null || user === void 0 ? void 0 : user.role) === user_model_1.UserRoles.DIRECTOR) ? { $exists: true } : reqById.id,
                            $or: [{ customerName: { $regex: search, $options: "i" } }, {
                                    number: {
                                        $regex: search,
                                        $options: "i"
                                    }
                                },
                            ]
                        })
                            .skip(skip)
                            .limit(limit)];
                    case 15:
                        documents = _b.sent();
                        totalElements = documents.length;
                        return [3 /*break*/, 16];
                    case 16: return [3 /*break*/, 19];
                    case 17: return [4 /*yield*/, document_scema_1.DocumentSchema.find({
                            is_delete: false,
                            by: ((user === null || user === void 0 ? void 0 : user.role) === user_model_1.UserRoles.ADMIN || (user === null || user === void 0 ? void 0 : user.role) === user_model_1.UserRoles.DIRECTOR) ? { $exists: true } : reqById.id,
                            $or: [{ customerName: { $regex: search, $options: "i" } }, { number: { $regex: search, $options: "i" } },
                            ]
                        })
                            .skip(skip)
                            .limit(limit)];
                    case 18:
                        documents = _b.sent();
                        totalElements = documents.length;
                        _b.label = 19;
                    case 19:
                        res.status(200).json({
                            ok: true,
                            totalElements: totalElements,
                            data: documents,
                        });
                        return [3 /*break*/, 21];
                    case 20:
                        err_3 = _b.sent();
                        res.status(500).json({
                            ok: false,
                            message: err_3,
                        });
                        return [3 /*break*/, 21];
                    case 21: return [2 /*return*/];
                }
            });
        });
    };
    DocumentController.prototype.getDocument = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var document_2, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, document_scema_1.DocumentSchema.findById(req.params.id)];
                    case 1:
                        document_2 = _a.sent();
                        res.status(200).json({
                            ok: true,
                            data: document_2,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        res.status(500).json({
                            ok: false,
                            message: err_4,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DocumentController.prototype.updateDocument = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var newDocument, updatedDocument, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        newDocument = req.body;
                        return [4 /*yield*/, document_scema_1.DocumentSchema.findByIdAndUpdate(req.params.id, newDocument, { new: true })];
                    case 1:
                        updatedDocument = _a.sent();
                        res.status(200).json({
                            ok: true,
                            data: updatedDocument,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        res.status(500).json({
                            ok: false,
                            message: err_5,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DocumentController.prototype.changeStatus = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var status_1, updatedDocument, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        status_1 = req.body.status;
                        return [4 /*yield*/, document_scema_1.DocumentSchema.findByIdAndUpdate(req.params.id, {
                                status: status_1,
                            }, { new: true })];
                    case 1:
                        updatedDocument = _a.sent();
                        res.status(200).json({
                            ok: true,
                            data: updatedDocument,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        res.status(500).json({
                            ok: false,
                            message: err_6,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return DocumentController;
}(AbstractDocumentController));
exports.default = new DocumentController();
