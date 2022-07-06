const multer = require("multer");

//specify the storage engine

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //here we are asigning a random name to the image new date will create a random name and assign to the image
  },
});

//file validation

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "pdf" || file.mimetype === "pdf") {
    cb(null, true);
  } else {
    //prevent the upload
    cb({ message: "Unsupported File Format dj" }, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
});

module.exports = upload;
