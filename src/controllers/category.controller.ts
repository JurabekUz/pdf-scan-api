import {Request, Response} from "express";
import {CategorySchema} from "../database/category.scema";
import {CategoryInterface} from "../models/category.model";

abstract class AbstractCategoryController {
    abstract getCategories(req: Request, res: Response): void;

    abstract getCategory(req: Request, res: Response): void;

    abstract createCategory(req: Request, res: Response): void;

    abstract updateCategory(req: Request, res: Response): void;

    abstract deleteCategory(req: Request, res: Response): void;
}


class CategoryController extends AbstractCategoryController {
    async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const category = await CategorySchema.create(req.body);
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

    async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await CategorySchema.findByIdAndUpdate(req.params.id, {is_delete: true}, {new: true});
            res.status(200).json({
                ok: true,
                message: "Category deleted",
                data: deleted,
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: err
            });

        }
    }

    async getCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await CategorySchema.find(
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

    async getCategory(req: Request, res: Response): Promise<void> {
        try {
            const category = await CategorySchema.findById(req.params.id);
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

    async updateCategory(req: Request, res: Response): Promise<void> {
        try {
            const newCategory: CategoryInterface = req.body;
            const updatedCategory = await CategorySchema.findByIdAndUpdate(req.params.id, newCategory, {new: true});
            res.status(200).json({
                ok: true,
                data: updatedCategory,
            });
        } catch (err) {
            res.status(500).json({
                ok: false,
                message: err
            });

        }
    }
}

export default new CategoryController();
