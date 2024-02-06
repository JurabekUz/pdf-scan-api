"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
class MulterUtil {
}
MulterUtil.storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});
MulterUtil.upload = (0, multer_1.default)({ storage: MulterUtil.storage });
MulterUtil.uploadFile = MulterUtil.upload.single("file");
exports.default = MulterUtil;
