"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const multer = require("multer");

var MulterUtil = /** @class */ (function () {
    function MulterUtil() {
    }
    MulterUtil.storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public/uploads");
        },
        filename: function (req, file, cb) {
            cb(null, "".concat(file.originalname));
        },
    });
    MulterUtil.upload = multer({ storage: MulterUtil.storage });
    MulterUtil.uploadFile = MulterUtil.upload.single("file");
    return MulterUtil;
}());

exports.default = MulterUtil;
