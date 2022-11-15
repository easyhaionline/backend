const express = require('express')

const {BusinessPartnerLogin } = require('../controllers/businessPartner')

const router = express.Router()

// @route: POST /api/teacher/login
// @desc: To login an existing teacher
// @access: Public
router.post('/login', BusinessPartnerLogin)
module.exports = router
