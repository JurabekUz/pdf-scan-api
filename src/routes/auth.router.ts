import {Router} from "express";
import authService from "../controllers/auth.controller";

const router = Router();

router.post("/login", authService.login);

export default router;
