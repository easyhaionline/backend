const express = require('express');
const { create, list, update, read, createheadingLink, headinglistlink, headingupdateLink, removeheadingLink, editHeadingLink } = require('../controllers/footer');
const { runValidation } = require('../validators');
const router = express.Router();

router.post('/create', runValidation, create)
router.get('/footerlist', runValidation, list)
router.put('/updatefooter/:id', runValidation, update)
router.get('/footerlist/:id', runValidation, read)

router.post('/createheading', runValidation, createheadingLink);
router.post('/createheaingLinks/:id', runValidation, editHeadingLink);
router.get('/headinglinks', runValidation, headinglistlink);
router.put('/headinglinksupdate/:id', headingupdateLink);
router.put('/deleteheadinglinks/:id', runValidation, removeheadingLink)

module.exports = router