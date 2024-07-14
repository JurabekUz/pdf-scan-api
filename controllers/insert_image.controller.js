const pdf = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const qrCode = require("qrcode");
const { log } = require("console");

const insertImage = async (pathToPdf, options) => {
  const xPercent = options.xPercent * 1;
  const yPercent = options.yPercent * 1;
  const zoom = 1;
  try {
    const pdfBytes = fs.readFileSync(pathToPdf);
    const pdfDoc = await pdf.PDFDocument.load(pdfBytes);
    const downloadUrl =
      "http://localhost:3000/d?i=5f4c9f4e1d8d0f2d4c6d4c9f";
    const qrCodeImage = await qrCode.toBuffer(downloadUrl, {
      width: options.width * zoom,
      margin: 0,
    });
    const image = await pdfDoc.embedPng(qrCodeImage);
    const pages = pdfDoc.getPages();
    const firstPage = pages[1];
    // get size of the first page
    const { height, width } = firstPage.getSize();
    log({ xPercent, yPercent, w: image.width, h: image.height });
    log({width,height});
    firstPage.drawImage(image, {
      x: xPercent * width,
      y: (1 - yPercent) * height - image.height / zoom,
      width: image.width / zoom,
      height: image.height / zoom,
    });
    const pdfBytesNew = await pdfDoc.save();
    fs.writeFileSync(
      path.join(__dirname, "..", "files", "file_updated.pdf"),
      pdfBytesNew
    );
    return pdfBytesNew;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { insertImage };
