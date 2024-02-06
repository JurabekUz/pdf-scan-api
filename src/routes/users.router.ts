import {Router} from "express";
import userService from "../controllers/user.controller";

const router = Router();

router.get("/", userService.getUsers);
router.get("/:id", userService.getUser);
router.post("/create",
    userService.checkRole,
    userService.createUser);
router.put("/:id",
    userService.checkRole,
    userService.updateUser);
router.delete("/:id",
    userService.checkRole,
    userService.deleteUser);

export default router;
