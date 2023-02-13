const express = require('express')
const router = express.Router()

const {createMeeting, getMeetings} = require('../controllers/team')

router.route('/create-meeting').post(createMeeting)
router.route('/get-meetings').get(getMeetings)

module.exports = router
