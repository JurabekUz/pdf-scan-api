import {Request, Response} from "express";
import mongoose from "mongoose";
import {PassThrough} from "stream";
import QRCode from "qrcode";
import {v4} from "uuid";
import {DocumentSchema} from "../database/document.scema";
import {FileSchema} from "../database/files.scema";

abstract class AbstractQrCodeController {
    abstract generateQrCode(req: Request, res: Response): Promise<void>;

    abstract scanQrCode(req: Request, res: Response): Promise<void>;
}

class QrCodeController extends AbstractQrCodeController {
    async generateQrCode(req: Request, res: Response): Promise<void> {
        try {
            const width = req.query.width
                ? parseFloat(req.query.width.toString())
                : 200;
            const id = req.query.id?.toString() || v4();
            const qrStream = new PassThrough();
            const scanUrl = `${process.env.QR_CODE_SCAN_URL}/${id}`;
            await QRCode.toFileStream(qrStream, scanUrl, {
                type: "png",
                width: width,
                errorCorrectionLevel: "H",
            });
            res.setHeader("x-qrcode-id", id);
            res.setHeader("Content-Type", "image/png");
            res.setHeader("Content-Disposition", "attachment; filename=qr-code.png");
            qrStream.pipe(res);
        } catch (err) {
            console.error("Failed to return content", err);
            res.status(500).send("Internal Server Error");
        }
    }

    async scanQrCode(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            let file = null;
            
            if (mongoose.Types.ObjectId.isValid(id)) {
                file = await FileSchema.findById(id);
            }
            
            if (!file) {
                file = await FileSchema.findOne({ name: `${id}.pdf` });
            }

            if (!file) {
                res.status(404).send("File not found");
                return;
            }

            const document = await DocumentSchema.findOne({ file: file._id })
                .populate({
                    path: "by",
                    select: "name file",
                    populate: {
                        path: "file",
                        select: "_id",
                    },
                });

            if (!document || document.is_delete || document.status.toString() !== "confirmed") {
                res.setHeader("X-Error", "Document not found or deleted or not confirmed");
                res.send("Hujjat topilmadi yoki tasdiqlanmagan");
            } else {
                const doc = {
                    number: document.number,
                    pageCount: file.pageCount ?? "0",
                    customerName: document.customerName,
                    value: document.value,
                    date: document.date.toLocaleDateString("uz-UZ", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }),
                    categoryName: (document.type as any)?.name ?? "Noma'lum",
                    scopeName: (document.scope as any)?.name ?? "Noma'lum",
                    scannedFile: `/scan/download/${file._id}`,
                    byFile: document.by?.file ? `/scan/download/${document.by.file._id}` : "#",
                    byName: document.by?.name ?? "Noma'lum",
                };
                console.log(`🔗 [SCAN] Generated download link: ${doc.scannedFile}`);
                res.render("scan", doc);
            }
        } catch (err) {
            res.setHeader("X-Error", "Document not found or invalid: " + err);
            res.send("Xatolik yuz berdi: " + err);
        }
    }
}

export default new QrCodeController();
