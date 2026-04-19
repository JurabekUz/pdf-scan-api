import e, {Request, Response} from "express";
import mongoose from "mongoose";
import {FileSchema} from "../database/files.scema";
import {FileInterface} from "../models/file.model";

abstract class AbstractFileController {
    abstract getFiles(req: Request, res: Response): void;

    abstract getFile(req: Request, res: Response): void;

    abstract downloadFile(req: Request, res: Response): void;

    abstract createFile(req: Request, res: Response): void;

    abstract updateFile(req: Request, res: Response): void;

    abstract deleteFile(req: Request, res: Response): void;
}


class FileController extends AbstractFileController {
    async createFile(req: Request, res: Response): Promise<void> {
        try {
            const file: Express.Multer.File | undefined = req.file;
            const fileData = await FileSchema.create({
                is_delete: false,
                name: file?.originalname,
                path: file?.path,
                size: file?.size,
                pageCount: req.body.pageCount || 0,
            });
            res.status(201).json({
                ok: true,
                data: fileData,
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: err
            });
        }
    }

    async deleteFile(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await FileSchema.findByIdAndUpdate(req.params.id, {is_delete: true}, {new: true});
            res.status(200).json({
                ok: true,
                message: "File deleted",
                data: deleted,
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: err
            });

        }
    }

    async getFiles(req: Request, res: Response): Promise<void> {
        try {
            const categories = await FileSchema.find(
                {is_delete: false},
            );
            res.status(200).json({
                ok: true,
                totalElements: categories.length,
                data: categories,
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: err
            });
        }
    }

    async getFile(req: Request, res: Response): Promise<void> {
        try {
            const fileData = await FileSchema.findById(req.params.id);
            res.status(200).json({
                ok: true,
                data: fileData,
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: err
            });

        }
    }

    async updateFile(req: Request, res: Response): Promise<void> {
        try {
            const newFile: FileInterface = req.body;
            const updatedFile = await FileSchema.findByIdAndUpdate(req.params.id, newFile, {new: true});
            res.status(200).json({
                ok: true,
                data: updatedFile,
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: err
            });

        }
    }

    async downloadFile(req: e.Request, res: e.Response): Promise<void> {
        try {
            const id = req.params.id;
            let fileData = null;

            if (mongoose.Types.ObjectId.isValid(id)) {
                fileData = await FileSchema.findById(id);
            }

            if (!fileData) {
                fileData = await FileSchema.findOne({ name: `${id}.pdf` });
            }

            if (!fileData) {
                res.status(404).json({
                    ok: false,
                    message: "File not found",
                });
                return;
            }
            res.download(fileData?.path);
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: err
            });
        }
    }
}

export default new FileController();
