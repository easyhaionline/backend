const express = require('express')
const router = express.Router()

const {createMeeting} = require('../controllers/team')

router.route('/create-meeting').post(createMeeting)

module.exports = router
