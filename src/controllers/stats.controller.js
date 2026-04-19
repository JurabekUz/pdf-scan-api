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
var category_scema_1 = require("../database/category.scema");
var scope_scema_1 = require("../database/scope.scema");
var user_model_1 = require("../models/user.model");
var AbstractStatsController = /** @class */ (function () {
    function AbstractStatsController() {
    }
    return AbstractStatsController;
}());
var StatsController = /** @class */ (function (_super) {
    __extends(StatsController, _super);
    function StatsController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatsController.prototype.getByUser = function (_req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var currentUser, allDocuments, documents, users, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, user_scema_1.UserSchema.findById(_req.body.requestedBy._id)];
                    case 1:
                        currentUser = _a.sent();
                        return [4 /*yield*/, document_scema_1.DocumentSchema.find((currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === user_model_1.UserRoles.USER ? { by: currentUser._id } : {})];
                    case 2:
                        allDocuments = _a.sent();
                        return [4 /*yield*/, document_scema_1.DocumentSchema.aggregate([
                                {
                                    $match: {
                                        is_delete: false,
                                        status: "confirmed"
                                    }
                                },
                                {
                                    $group: {
                                        _id: "$by",
                                        count: { $sum: 1 }
                                    }
                                }
                            ])];
                    case 3:
                        documents = _a.sent();
                        return [4 /*yield*/, user_scema_1.UserSchema.populate(documents, {
                                path: "_id",
                                select: "name",
                            })];
                    case 4:
                        users = _a.sent();
                        res.status(200).json({
                            ok: true,
                            data: users,
                            totalElements: allDocuments.length,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        res.status(500).json({
                            ok: false,
                            message: e_1,
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    StatsController.prototype.getByType = function (_req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var currentUser, allDocuments, documents, categories, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, user_scema_1.UserSchema.findById(_req.body.requestedBy._id)];
                    case 1:
                        currentUser = _a.sent();
                        return [4 /*yield*/, document_scema_1.DocumentSchema.find((currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === user_model_1.UserRoles.USER ? { by: currentUser._id } : {})];
                    case 2:
                        allDocuments = _a.sent();
                        return [4 /*yield*/, document_scema_1.DocumentSchema.aggregate([{
                                    $match: {
                                        is_delete: false,
                                        status: "confirmed"
                                    }
                                },
                                {
                                    $group: {
                                        _id: "$type",
                                        count: { $sum: 1 },
                                    }
                                },
                            ])];
                    case 3:
                        documents = _a.sent();
                        return [4 /*yield*/, category_scema_1.CategorySchema.populate(documents, {
                                path: "_id",
                                select: "name",
                            })];
                    case 4:
                        categories = _a.sent();
                        res.status(200).json({
                            ok: true,
                            data: categories,
                            totalElements: allDocuments.length,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        e_2 = _a.sent();
                        res.status(500).json({
                            ok: false,
                            message: e_2,
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    StatsController.prototype.getByTime = function (_req, _res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    StatsController.prototype.getByScope = function (_req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var currentUser, allDocuments, documents, scopes, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, user_scema_1.UserSchema.findById(_req.body.requestedBy._id)];
                    case 1:
                        currentUser = _a.sent();
                        return [4 /*yield*/, document_scema_1.DocumentSchema.find((currentUser === null || currentUser === void 0 ? void 0 : currentUser.role) === user_model_1.UserRoles.USER ? { by: currentUser._id } : {})];
                    case 2:
                        allDocuments = _a.sent();
                        return [4 /*yield*/, document_scema_1.DocumentSchema.aggregate([
                                {
                                    $match: {
                                        is_delete: false,
                                        status: "confirmed"
                                    }
                                },
                                {
                                    $group: {
                                        _id: "$scope",
                                        count: { $sum: 1 },
                                    }
                                },
                            ])];
                    case 3:
                        documents = _a.sent();
                        return [4 /*yield*/, scope_scema_1.ScopeSchema.populate(documents, {
                                path: "_id",
                                select: "name",
                            })];
                    case 4:
                        scopes = _a.sent();
                        res.status(200).json({
                            ok: true,
                            data: scopes,
                            totalElements: allDocuments.length,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        e_3 = _a.sent();
                        res.status(500).json({
                            ok: false,
                            message: e_3,
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return StatsController;
}(AbstractStatsController));
exports.default = new StatsController();
