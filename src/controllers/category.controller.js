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
const category_scema_1 = require("../database/category.scema");
class AbstractCategoryController {
}
class CategoryController extends AbstractCategoryController {
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_scema_1.CategorySchema.create(req.body);
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
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleted = yield category_scema_1.CategorySchema.findByIdAndUpdate(req.params.id, { is_delete: true }, { new: true });
                res.status(200).json({
                    ok: true,
                    message: "Category deleted",
                    data: deleted,
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
    getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield category_scema_1.CategorySchema.find({ is_delete: false });
                res.status(200).json({
                    ok: true,
                    totalElements: categories.length,
                    data: categories,
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
    getCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield category_scema_1.CategorySchema.findById(req.params.id);
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
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCategory = req.body;
                const updatedCategory = yield category_scema_1.CategorySchema.findByIdAndUpdate(req.params.id, newCategory, { new: true });
                res.status(200).json({
                    ok: true,
                    data: updatedCategory,
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
exports.default = new CategoryController();
