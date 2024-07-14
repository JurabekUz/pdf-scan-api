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
const stream_1 = require("stream");
const qrcode_1 = __importDefault(require("qrcode"));
const uuid_1 = require("uuid");
const document_scema_1 = require("../database/document.scema");
const files_scema_1 = require("../database/files.scema");
class AbstractQrCodeController {
}
class QrCodeController extends AbstractQrCodeController {
    generateQrCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const width = req.query.width
                    ? parseFloat(req.query.width.toString())
                    : 200;
                const qrStream = new stream_1.PassThrough();
                const uuid = (0, uuid_1.v4)();
                const scanUrl = `${process.env.QR_CODE_SCAN_URL}/${uuid}`;
                yield qrcode_1.default.toFileStream(qrStream, scanUrl, {
                    type: "png",
                    width: width,
                    errorCorrectionLevel: "H",
                });
                res.setHeader("x-qrcode-id", uuid);
                res.setHeader("Content-Type", "image/png");
                res.setHeader("Content-Disposition", "attachment; filename=qr-code.png");
                qrStream.pipe(res);
            }
            catch (err) {
                console.error("Failed to return content", err);
            }
        });
    }
    scanQrCode(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileName = req.params.id;
                const file = yield files_scema_1.FileSchema.findOne({
                    name: `${fileName}.pdf`,
                });
                const document = yield document_scema_1.DocumentSchema.findOne({
                    file: file === null || file === void 0 ? void 0 : file.id,
                }, {}, {
                    populate: [
                        {
                            path: "by",
                            select: "name file",
                            populate: {
                                path: "file",
                                select: "_id",
                            },
                        },
                    ],
                });
                if (!document || !file || document.is_delete || document.status.toString() != "confirmed") {
                    res.setHeader("X-Error", "Document not found or deleted or not confirmed");
                    res.send("Document not found");
                }
                else {
                    const doc = {
                        number: document.number,
                        pageCount: (_a = file === null || file === void 0 ? void 0 : file.pageCount) !== null && _a !== void 0 ? _a : "0",
                        customerName: document.customerName,
                        value: document.value,
                        date: document.date.toLocaleDateString("uz-UZ", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }),
                        scannedFile: `${process.env.QR_CODE_SCAN_URL}/download/${document.file}`,
                        byFile: `${process.env.QR_CODE_SCAN_URL}/download/${(_b = document.by.file) === null || _b === void 0 ? void 0 : _b._id}`,
                        byName: document.by.name,
                    };
                    res.render("scan", doc);
                }
            }
            catch (err) {
                res.setHeader("X-Error", "Document not found or invalid: " + err);
                res.send("Document not found or invalid" + err);
            }
        });
    }
}
exports.default = new QrCodeController();
