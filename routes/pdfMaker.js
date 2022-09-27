const express = require('express');
const { pdfMaker } = require('../controllers/pdfMaker');

const router = express.Router();

router.get('/', pdfMaker);

module.exports = router;