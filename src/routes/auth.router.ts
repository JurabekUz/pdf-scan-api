import {Router} from "express";
import authService from "../controllers/auth.controller";
import JwtUtil from "../utils/jwt.util";

const router = Router();

router.post("/login", authService.login);
router.get("/getMe", JwtUtil.middleware,authService.getMe);

export default router;
