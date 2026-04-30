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
const stream_1 = require("stream");
const qrcode_1 = __importDefault(require("qrcode"));
const uuid_1 = require("uuid");
const document_scema_1 = require("../database/document.scema");
const files_scema_1 = require("../database/files.scema");
const user_scema_1 = require("../database/user.scema");
const user_model_1 = require("../models/user.model");
class AbstractQrCodeController {
}
class QrCodeController extends AbstractQrCodeController {
    generateQrCode(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const width = req.query.width
                    ? parseFloat(req.query.width.toString())
                    : 200;
                const id = ((_a = req.query.id) === null || _a === void 0 ? void 0 : _a.toString()) || (0, uuid_1.v4)();
                const qrStream = new stream_1.PassThrough();
                const scanUrl = `${process.env.QR_CODE_SCAN_URL}/${id}`;
                yield qrcode_1.default.toFileStream(qrStream, scanUrl, {
                    type: "png",
                    width: width,
                    errorCorrectionLevel: "H",
                });
                res.setHeader("x-qrcode-id", id);
                res.setHeader("Content-Type", "image/png");
                res.setHeader("Content-Disposition", "attachment; filename=qr-code.png");
                qrStream.pipe(res);
            }
            catch (err) {
                console.error("Failed to return content", err);
                res.status(500).send("Internal Server Error");
            }
        });
    }
    scanQrCode(req, res) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                let file = null;
                if (mongoose_1.default.Types.ObjectId.isValid(id)) {
                    file = yield files_scema_1.FileSchema.findById(id);
                }
                if (!file) {
                    file = yield files_scema_1.FileSchema.findOne({ name: `${id}.pdf` });
                }
                if (!file) {
                    res.status(404).send("File not found");
                    return;
                }
                const document = yield document_scema_1.DocumentSchema.findOne({ file: file._id })
                    .populate({
                    path: "by",
                    select: "name file",
                    populate: {
                        path: "file",
                        select: "_id",
                    },
                });
                const director = yield user_scema_1.UserSchema.findOne({ role: user_model_1.UserRoles.DIRECTOR, is_delete: false }).sort({ createdAt: -1 });
                if (!document || document.is_delete || document.status.toString() !== "confirmed") {
                    res.setHeader("X-Error", "Document not found or deleted or not confirmed");
                    res.send("Hujjat topilmadi yoki tasdiqlanmagan");
                }
                else {
                    const doc = {
                        number: document.number,
                        pageCount: (_a = file.pageCount) !== null && _a !== void 0 ? _a : "0",
                        customerName: document.customerName,
                        value: document.value,
                        date: document.date.toLocaleDateString("uz-UZ", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }),
                        categoryName: (_c = (_b = document.type) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : "Nomaʼlum",
                        scopeName: (_e = (_d = document.scope) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : "Nomaʼlum",
                        scannedFile: `/scan/download/${file._id}`,
                        byFile: ((_f = document.by) === null || _f === void 0 ? void 0 : _f.file) ? `/scan/download/${document.by.file._id}` : "#",
                        directorFile: (director === null || director === void 0 ? void 0 : director.file) ? `/scan/download/${director.file._id}` : "#",
                        byName: (_h = (_g = document.by) === null || _g === void 0 ? void 0 : _g.name) !== null && _h !== void 0 ? _h : "Nomaʼlum",
                        directorName: (_j = director === null || director === void 0 ? void 0 : director.name) !== null && _j !== void 0 ? _j : "Nomaʼlum",
                    };
                    console.log(`🔗 [SCAN] Generated download link: ${doc.scannedFile}`);
                    res.render("scan", doc);
                }
            }
            catch (err) {
                res.setHeader("X-Error", "Document not found or invalid: " + err);
                res.send("Xatolik yuz berdi: " + err);
            }
        });
    }
}
exports.default = new QrCodeController();
