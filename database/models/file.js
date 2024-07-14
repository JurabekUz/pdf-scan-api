const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    local_path:String,
    remote_path:String,
  },
  {
    timestamps: true,
  }
);

const UploadedFile = mongoose.model("UploadedFile", fileSchema);

module.exports = UploadedFile;
