const express = require('express');
const router = express.Router();
const { contactForm } = require('../controllers/email');


//validators


router.post('/contact',  contactForm );




module.exports = router;