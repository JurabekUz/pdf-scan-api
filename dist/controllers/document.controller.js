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
const document_scema_1 = require("../database/document.scema");
const user_scema_1 = require("../database/user.scema");
const user_model_1 = require("../models/user.model");
class AbstractDocumentController {
}
class DocumentController extends AbstractDocumentController {
    createDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const documentData = Object.assign(Object.assign({}, req.body), { by: req.body.requestedBy.id, date: Date.now() });
                // Explicitly cast all ObjectId fields
                if (req.body.file)
                    documentData.file = new mongoose_1.default.Types.ObjectId(req.body.file);
                if (req.body.type)
                    documentData.type = new mongoose_1.default.Types.ObjectId(req.body.type);
                if (req.body.scope)
                    documentData.scope = new mongoose_1.default.Types.ObjectId(req.body.scope);
                if (documentData.by)
                    documentData.by = new mongoose_1.default.Types.ObjectId(documentData.by);
                const document = yield document_scema_1.DocumentSchema.create(documentData);
                res.status(201).json({
                    ok: true,
                    data: document,
                });
            }
            catch (err) {
                console.error("Document Create Error:", err);
                res.status(400).json({
                    ok: false,
                    message: err.message || err,
                });
            }
        });
    }
    deleteDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield document_scema_1.DocumentSchema.findByIdAndUpdate(req.params.id, {
                    is_delete: true,
                });
                res.status(200).json({
                    ok: true,
                    message: "Document deleted",
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    message: err,
                });
            }
        });
    }
    getDocuments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let page = req.query.page ? parseInt(req.query.page.toString()) : 1;
                page = page < 1 ? 1 : page;
                const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 15;
                const skip = (page - 1) * limit;
                const search = req.query.search ? req.query.search.toString() : "";
                const from = req.query.from ? req.query.from.toString() : null;
                const to = req.query.to ? req.query.to.toString() : null;
                const filterBy = req.query.filterBy ? req.query.filterBy.toString() : "";
                const filterValue = req.query.filterValue ? req.query.filterValue.toString() : "";
                const reqById = req.body.requestedBy;
                const user = yield user_scema_1.UserSchema.findById(reqById.id);
                let documents;
                let totalElements;
                const query = { is_delete: false };
                if ((user === null || user === void 0 ? void 0 : user.role) !== user_model_1.UserRoles.ADMIN && (user === null || user === void 0 ? void 0 : user.role) !== user_model_1.UserRoles.DIRECTOR) {
                    query.by = reqById.id;
                }
                if (search) {
                    query.$or = [
                        { customerName: { $regex: search, $options: "i" } },
                        { number: { $regex: search, $options: "i" } }
                    ];
                }
                if (from && to) {
                    query.createdAt = {
                        $gte: new Date(from),
                        $lt: new Date(to)
                    };
                }
                if (filterBy && filterValue && (user === null || user === void 0 ? void 0 : user.role) !== user_model_1.UserRoles.USER) {
                    if (filterBy === "category")
                        query.type = filterValue;
                    else if (filterBy === "scope")
                        query.scope = filterValue;
                    else if (filterBy === "by")
                        query.by = filterValue;
                }
                documents = yield document_scema_1.DocumentSchema.find(query).skip(skip).limit(limit);
                totalElements = yield document_scema_1.DocumentSchema.countDocuments(query);
                res.status(200).json({
                    ok: true,
                    totalElements: totalElements,
                    data: documents,
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    message: err,
                });
            }
        });
    }
    getDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const document = yield document_scema_1.DocumentSchema.findById(req.params.id);
                res.status(200).json({
                    ok: true,
                    data: document,
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    message: err,
                });
            }
        });
    }
    updateDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newDocument = req.body;
                const updatedDocument = yield document_scema_1.DocumentSchema.findByIdAndUpdate(req.params.id, newDocument, { new: true });
                res.status(200).json({
                    ok: true,
                    data: updatedDocument,
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    message: err,
                });
            }
        });
    }
    changeStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const status = req.body.status;
                const updatedDocument = yield document_scema_1.DocumentSchema.findByIdAndUpdate(req.params.id, {
                    status: status,
                }, { new: true });
                res.status(200).json({
                    ok: true,
                    data: updatedDocument,
                });
            }
            catch (err) {
                res.status(500).json({
                    ok: false,
                    message: err,
                });
            }
        });
    }
}
exports.default = new DocumentController();
