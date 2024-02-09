import {Router} from "express";
import documentService from "../controllers/document.controller";
import UserController from "../controllers/user.controller";

const router = Router();

router.get("/", documentService.getDocuments);
router.get("/:id", documentService.getDocument);
router.post("/create", documentService.createDocument);
router.put("/update/:id", documentService.updateDocument);
router.put("/change-status/:id", UserController.checkRole, documentService.changeStatus);
router.delete("/:id", documentService.deleteDocument);

export default router;
