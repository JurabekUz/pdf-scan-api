import {Router} from "express";
import scopeController from "../controllers/scope.controller";

const router = Router();

router.get("/", scopeController.getScopes);
router.get("/:id", scopeController.getScope);
router.post("/create", scopeController.createScope);
router.put("/:id", scopeController.updateScope);
router.delete("/:id", scopeController.deleteScope);

export default router;
