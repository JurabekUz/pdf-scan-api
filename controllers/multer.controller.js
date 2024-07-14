const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files/sources");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    req.body.filename = file.originalname;
  },
});

// Create the multer instance
const saveFile = multer({ storage: storage });

module.exports = saveFile;
