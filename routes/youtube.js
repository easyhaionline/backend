const express = require('express')

const { protectAdmin } = require('../middleware/protect')

const { googleaccess,generatetokenaccess,googleaccess2,generatetokenaccess2 } = require('../controllers/youtube')

const { zoomMeeting } = require('../controllers/zoom')

const router = express.Router()

// @route: POST /api/teacher/login
// @desc: To schedule a live stream
// @access: Public
router.get('/google', googleaccess)
router.post('/google-token', generatetokenaccess)
router.get('/google/d', googleaccess2)
router.post('/google-token/d', generatetokenaccess2)

module.exports = router





