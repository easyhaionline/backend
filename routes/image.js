const express = require("express");
const router = express.Router();
const uploaded = require("../utils/uploads/upload").single("file");
const multer = require("multer");

const upload = require("../utils/uploads/multer2");
const cloudinary = require("../utils/uploads/cloudinary");

const fs = require("fs");
router.post("/single-image", upload.array("image"), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, "Images");

  const urls = [];
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    console.log(path)
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }
  res.status(200).json({
    message: "Upload Successfully",
    data: urls,
  });

});

module.exports = router;
