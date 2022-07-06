const express = require("express");
const router = express.Router();
const uploaded = require("../utils/upload").single("file");
const multer = require("multer");

const upload = require("../utils/uploads/multer");
const cloudinary = require("../utils/uploads/cloudinary");

const fs = require("fs");

// router.post("/upload-images", (req, res) => {
//   uploaded(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       res.send("Please enter the mentioned size image");
//     } else if (err) {
//       console.log("err", err);
//       res.send("Please Format write extension type");
//     } else {
//       console.log("file", req.file);
//       res.send(req.file);
//     }
//   });
// });
router.post("/", upload.array("image"), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, "Images");

  const urls = [];
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    console.log(path);
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }
  res.status(200).json({
    message: "Uploaded Successfully",
    data: urls,
  });

  //  }else{
  //      res.status(400).json({
  //          err:"Images not uploaded successfully"
  //      })
  //  }
});

module.exports = router;