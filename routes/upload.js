const express = require("express");
const router = express.Router();
const uploaded = require("../utils/upload").single("file");
const multer = require("multer");

const upload = require("../utils/uploads/multer");
const cloudinary = require("../utils/uploads/cloudinary");

const fs = require("fs");

router.post("/", upload.array("image"), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, "Images");

  const urls = [];
  const files = req.files;
  for (var file of files) {
    const { path } = files;
    console.log(path);
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }
  res.status(200).json({
    message: "Uploaded Successfully",
    data: urls,
  });

});

module.exports = router;