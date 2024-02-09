import {Request, Response} from "express";
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
            const qrStream = new PassThrough();
            const uuid = v4();
            const scanUrl = `${process.env.QR_CODE_SCAN_URL}/${uuid}`;
            await QRCode.toFileStream(qrStream, scanUrl, {
                type: "png",
                width: width,
                errorCorrectionLevel: "H",
            });
            res.setHeader("x-qrcode-id", uuid);
            res.setHeader("Content-Type", "image/png");
            res.setHeader("Content-Disposition", "attachment; filename=qr-code.png");
            qrStream.pipe(res);
        } catch (err) {
            console.error("Failed to return content", err);
        }
    }

    async scanQrCode(req: Request, res: Response): Promise<void> {
        try {
            const fileName = req.params.id;
            const file = await FileSchema.findOne({
                name: `${fileName}.pdf`,
            });
            const document = await DocumentSchema.findOne(
                {
                    file: file?.id,
                },
                {},
                {
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
                }
            );
            if (!document || !file) {
                res.send("Document not found");
            } else if (document.status.toString() != "confirmed") {
                res.send("Document not found");
            } else {
                const doc = {
                    number: document.number,
                    pageCount: file?.pageCount ?? "0",
                    customerName: document.customerName,
                    value: document.value,
                    date: document.date.toLocaleDateString("uz-UZ", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }),
                    scannedFile: `${process.env.QR_CODE_SCAN_URL}/download/${document.file}`,
                    byFile: `${process.env.QR_CODE_SCAN_URL}/download/${document.by.file._id}`,
                    byName: document.by.name,
                };
                console.log(doc);
                res.render("scan", doc);
            }
        } catch (err) {
            res.send("Document not found");
        }
    }
}

export default new QrCodeController();
