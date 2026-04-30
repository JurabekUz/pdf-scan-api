import {Request, Response} from "express";
import mongoose from "mongoose";
import {DocumentSchema} from "../database/document.scema";
import {DocumentInterface} from "../models/document.model";
import {UserSchema} from "../database/user.scema";
import {UserRoles} from "../models/user.model";

abstract class AbstractDocumentController {
    abstract getDocuments(req: Request, res: Response): void;

    abstract getDocument(req: Request, res: Response): void;

    abstract createDocument(req: Request, res: Response): void;

    abstract updateDocument(req: Request, res: Response): void;

    abstract deleteDocument(req: Request, res: Response): void;

    abstract changeStatus(req: Request, res: Response): void;
}

class DocumentController extends AbstractDocumentController {
    async createDocument(req: Request, res: Response): Promise<void> {
        try {
            const documentData = {
                ...req.body,
                by: req.body.requestedBy.id,
                date: Date.now(),
            };

            // Explicitly cast all ObjectId fields
            if (req.body.file) documentData.file = new mongoose.Types.ObjectId(req.body.file);
            if (req.body.type) documentData.type = new mongoose.Types.ObjectId(req.body.type);
            if (req.body.scope) documentData.scope = new mongoose.Types.ObjectId(req.body.scope);
            if (documentData.by) documentData.by = new mongoose.Types.ObjectId(documentData.by);

            const document = await DocumentSchema.create(documentData);
            res.status(201).json({
                ok: true,
                data: document,
            });
        } catch (err: any) {
            console.error("Document Create Error:", err);
            res.status(400).json({
                ok: false,
                message: err.message || err,
            });
        }
    }

    async deleteDocument(req: Request, res: Response): Promise<void> {
        try {
            await DocumentSchema.findByIdAndUpdate(req.params.id, {
                is_delete: true,
            });
            res.status(200).json({
                ok: true,
                message: "Document deleted",
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: err,
            });
        }
    }
    async getDocuments(req: Request, res: Response): Promise<void> {
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

            const user = await UserSchema.findById(reqById.id);
            let documents: any[];
            let totalElements: number;

            const query: any = { is_delete: false };

            if (user?.role !== UserRoles.ADMIN && user?.role !== UserRoles.DIRECTOR) {
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

            if (filterBy && filterValue && user?.role !== UserRoles.USER) {
                if (filterBy === "category") query.type = filterValue;
                else if (filterBy === "scope") query.scope = filterValue;
                else if (filterBy === "by") query.by = filterValue;
            }

            documents = await DocumentSchema.find(query).skip(skip).limit(limit);
            totalElements = await DocumentSchema.countDocuments(query);

            res.status(200).json({
                ok: true,
                totalElements: totalElements,
                data: documents,
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: err,
            });
        }
    }

    async getDocument(req: Request, res: Response): Promise<void> {
        try {
            const document = await DocumentSchema.findById(req.params.id);
            res.status(200).json({
                ok: true,
                data: document,
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: err,
            });
        }
    }

    async updateDocument(req: Request, res: Response): Promise<void> {
        try {
            const newDocument: DocumentInterface = req.body;
            const updatedDocument = await DocumentSchema.findByIdAndUpdate(
                req.params.id,
                newDocument,
                {new: true}
            );
            res.status(200).json({
                ok: true,
                data: updatedDocument,
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: err,
            });
        }
    }

    async changeStatus(req: Request, res: Response): Promise<void> {
        try {
            const status = req.body.status;
            const updatedDocument = await DocumentSchema.findByIdAndUpdate(
                req.params.id,
                {
                    status: status,
                },
                {new: true}
            );
            res.status(200).json({
                ok: true,
                data: updatedDocument,
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: err,
            });
        }
    }
}


export default new DocumentController();
