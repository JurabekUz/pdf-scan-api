import {Router} from "express";
import filesService from "../controllers/files.controller";
import MulterUtil from "../utils/multer.util";

const router = Router();

router.get("/", filesService.getFiles);
router.get("/:id", filesService.getFile);
router.get("/download/:id", filesService.downloadFile);
router.post("/upload", MulterUtil.uploadFile, filesService.createFile);
router.put("/:id", filesService.updateFile);
router.delete("/:id", filesService.deleteFile);

export default router;
