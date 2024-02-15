import {Request, Response} from "express";
import {ScopeSchema} from "../database/scope.scema";
import {ScopeInterface} from "../models/scope.model";

abstract class AbstractScopeController {
    abstract getScopes(req: Request, res: Response): void;

    abstract getScope(req: Request, res: Response): void;

    abstract createScope(req: Request, res: Response): void;

    abstract updateScope(req: Request, res: Response): void;

    abstract deleteScope(req: Request, res: Response): void;
}


class ScopeController extends AbstractScopeController {
    async createScope(req: Request, res: Response): Promise<void> {
        try {
            const category = await ScopeSchema.create(req.body);
            res.status(201).json({
                ok: true,
                data: category,
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: err
            });
        }
    }

    async deleteScope(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await ScopeSchema.findByIdAndUpdate(req.params.id, {is_delete: true}, {new: true});
            res.status(200).json({
                ok: true,
                message: "Scope deleted",
                data: deleted,
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: err
            });

        }
    }

    async getScopes(req: Request, res: Response): Promise<void> {
        try {
            const categories = await ScopeSchema.find(
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

    async getScope(req: Request, res: Response): Promise<void> {
        try {
            const category = await ScopeSchema.findById(req.params.id);
            res.status(200).json({
                ok: true,
                data: category,
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: err
            });

        }
    }

    async updateScope(req: Request, res: Response): Promise<void> {
        try {
            const newScope: ScopeInterface = req.body;
            const updatedScope = await ScopeSchema.findByIdAndUpdate(req.params.id, newScope, {new: true});
            res.status(200).json({
                ok: true,
                data: updatedScope,
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: err
            });

        }
    }
}

export default new ScopeController();
