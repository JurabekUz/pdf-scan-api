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
const document_scema_1 = require("../database/document.scema");
class AbstractDocumentController {
}
class DocumentController extends AbstractDocumentController {
    createDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield document_scema_1.DocumentSchema.create({
                    file: req.body.file,
                    type: req.body.type,
                    by: req.body.requestedBy.id,
                    date: Date.now(),
                    number: req.body.number,
                    value: req.body.value,
                    customerName: req.body.customerName,
                });
                res.status(201).json({
                    ok: true,
                    data: category,
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
    deleteDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield document_scema_1.DocumentSchema.findByIdAndUpdate(req.params.id, { is_delete: true });
                res.status(200).json({
                    ok: true,
                    message: "Document deleted"
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
    getDocuments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = req.query.page ? parseInt(req.query.page.toString()) : 1;
                const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 15;
                const skip = (page - 1) * limit;
                const search = req.query.search ? req.query.search.toString() : '';
                const documents = yield document_scema_1.DocumentSchema.find({
                    is_delete: false,
                    $or: [
                        { customerName: { $regex: search, $options: 'i' } }
                    ],
                }).skip(skip).limit(limit);
                res.status(200).json({
                    ok: true,
                    totalElements: documents.length,
                    data: documents,
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
    getDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield document_scema_1.DocumentSchema.findById(req.params.id);
                res.status(200).json({
                    ok: true,
                    data: category,
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
                    message: err
                });
            }
        });
    }
}
exports.default = new DocumentController();
