const express = require('express');
const router = express.Router();

const { displaycoursecreate, list, update, remove,read } = require('../controllers/coursespart2');
const { runValidation } = require('../validators');
const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage })

router.post('/createpricing', upload.single('myFile'), runValidation, displaycoursecreate);
router.get('/pricinglist', runValidation, list);
router.put('/updatepricing/:id', runValidation, upload.single('myFile'), update);
router.delete('/removepricing/:id', runValidation, remove)
router.get('/pricinglist/:id', runValidation, read)

module.exports = router
