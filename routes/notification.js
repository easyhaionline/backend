const express = require('express')
const router = express.Router()

const {verify, checkEmailStatus, sendEmail} = require('../controllers/notification')

router.route('/send-email').post(sendEmail)
router.route('/verify').post(verify)
router.route('/email-status/:email').get(checkEmailStatus)

module.exports = router