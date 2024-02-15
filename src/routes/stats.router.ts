import {Router} from "express";
import statService from "../controllers/stats.controller";

const router = Router();

router.get("/user", statService.getByUser);
router.get("/category", statService.getByType);
router.get("/scope", statService.getByScope);
router.get("/time", statService.getByTime);

export default router;
