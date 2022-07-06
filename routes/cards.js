const express = require('express');
const { create, list, read, update,remove } = require('../controllers/cards');
const { runValidation } = require('../validators');
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage })

router.post('/createcards', runValidation, upload.single('myFile'), create)
router.get('/cardlist', runValidation, list)
router.get('/cardlist/:id', runValidation, read)
router.put('/updatecard/:id', runValidation, upload.single('myFile'), update);
router.delete('/deletecard/:id', runValidation, remove);

// router.put('/footerupdate/:id', runValidation, update)
// router.get('/footerlist/:id', runValidation, read)

module.exports = router