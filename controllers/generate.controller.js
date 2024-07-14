const QRCode = require("qrcode");
const UploadedFile = require("../database/models/file");
const fs = require("fs");
const domen = process.env.DOMAIN || "http://localhost:3000";

const generate = async (req, res) => {
  const newId = await UploadedFile.create({});
  const path = `./files/qrcodes/${newId._id}.png`;
  const text = `${domen}/scan?id=${newId._id}`;
  try {
    await QRCode.toFile(path, text, {
      margin: 0,
    });
    res.setHeader("qcid",newId._id);
    res.download(path, (err) => {
      if (err) throw err;
      fs.unlinkSync(path);
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error,
    });
  }
};

module.exports = generate;
