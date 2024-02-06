import {Router} from "express";
import categoryService from "../controllers/category.controller";

const router = Router();

router.get("/", categoryService.getCategories);
router.get("/:id", categoryService.getCategory);
router.post("/create", categoryService.createCategory);
router.put("/:id", categoryService.updateCategory);
router.delete("/:id", categoryService.deleteCategory);

export default router;
