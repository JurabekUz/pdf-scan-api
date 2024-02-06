import {Router} from "express";
import qrCodeService from "../controllers/qrcode.controller";
import JwtUtil from "../utils/jwt.util";
import filesService from "../controllers/files.controller";
import QrcodeController from "../controllers/qrcode.controller";

const router = Router();

router.get("/qrcode/generate", qrCodeService.generateQrCode);
router.get("/scan/:id", QrcodeController.scanQrCode);
router.get("/scan/download/:id", filesService.downloadFile);

export default router;
