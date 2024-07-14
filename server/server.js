const express = require("express");
const download = require("../controllers/download.controller");
const saveFile = require("../controllers/multer.controller");
const generate = require("../controllers/generate.controller");
const app = express();
const port = 3000;
const domen = process.env.DOMAIN || "http://localhost:3000";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/generate", generate);
app.post("/upload", saveFile.single("file"), async (req, res) => {
  try {
    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error,
    });
  }
});
app.get("/scan", download);

app.listen(port, () => {
  console.log(`Server is running at ${domen}`);
});
