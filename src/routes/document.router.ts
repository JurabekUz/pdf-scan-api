import {Router} from "express";
import documentService from "../controllers/document.controller";

const router = Router();

router.get("/", documentService.getDocuments);
router.get("/:id", documentService.getDocument);
router.post("/create", documentService.createDocument);
router.put("/:id", documentService.updateDocument);
router.delete("/:id", documentService.deleteDocument);

export default router;
