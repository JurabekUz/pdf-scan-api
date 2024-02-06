import { Request, Response } from "express";
import { DocumentSchema } from "../database/document.scema";
import { DocumentInterface } from "../models/document.model";

abstract class AbstractDocumentController {
  abstract getDocuments(req: Request, res: Response): void;

  abstract getDocument(req: Request, res: Response): void;

  abstract createDocument(req: Request, res: Response): void;

  abstract updateDocument(req: Request, res: Response): void;

  abstract deleteDocument(req: Request, res: Response): void;
}

class DocumentController extends AbstractDocumentController {
  async createDocument(req: Request, res: Response): Promise<void> {
    try {
      const category = await DocumentSchema.create({
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
    } catch (err) {
      res.status(500).json({
        ok: false,
        message: err,
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
      const page = req.query.page ? parseInt(req.query.page.toString()) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 15;
      const skip = (page - 1) * limit;
      const search = req.query.search ? req.query.search.toString() : "";
      const documents = await DocumentSchema.find({
        is_delete: false,
        $or: [{ customerName: { $regex: search, $options: "i" } }],
      })
        .skip(skip)
        .limit(limit);

      res.status(200).json({
        ok: true,
        totalElements: documents.length,
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
      const category = await DocumentSchema.findById(req.params.id);
      res.status(200).json({
        ok: true,
        data: category,
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
        { new: true }
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
