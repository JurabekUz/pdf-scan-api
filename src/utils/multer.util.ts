import multer from "multer";

class MulterUtil {
    static storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public/uploads");
        },
        filename: (req, file, cb) => {
            cb(null, `${file.originalname}`);
        },
    });

    static upload = multer({storage: MulterUtil.storage});

    static uploadFile = MulterUtil.upload.single("file");
}

export default MulterUtil;
