"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var jwt_util_1 = require("../utils/jwt.util");
var router = (0, express_1.Router)();
router.post("/login", auth_controller_1.default.login);
router.get("/getMe", jwt_util_1.default.middleware, auth_controller_1.default.getMe);
exports.default = router;
