const express = require('express');
const { photo, create, createImages, update, remove,read,imagesUpload} = require('../controllers/banner');
const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage })

const router = express.Router();

router.post('/upload',  upload.single('myFile'), createImages)
router.post('/image-upload',  upload.single('myFile'), imagesUpload)

router.get('/banners', photo)
router.get('/banners/:id', read)
router.put('/upload/:id',  upload.single('myFile'), update)
router.delete('/delete/:id',  upload.single('myFile'), remove)

module.exports = router