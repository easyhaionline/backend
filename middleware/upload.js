const multer = require("multer"); //Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files.
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "website",
  },
});

const uploaded = multer({
  storage: storage,
});

module.exports = uploaded;
