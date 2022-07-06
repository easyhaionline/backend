const express = require('express');
const { uploadphotos,getphoto,update,remove,read } = require('../controllers/flickerphoto');
const { runValidation } = require('../validators/index');
const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage })
const router = express.Router();

router.post('/uploadphotos', runValidation, upload.single('myFile'), uploadphotos)
router.get('/getphoto', getphoto)
router.get('/getphoto/:id', read)
router.put('/updateuploadphotos/:id', runValidation, upload.single('myFile'), update)
router.delete('/deleteflickerphoto/:id', runValidation, upload.single('myFile'), remove)

module.exports = router