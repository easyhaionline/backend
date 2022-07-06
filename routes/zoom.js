const express = require('express')

const { protectAdmin } = require('../middleware/protect')


const { zoomMeeting, zoomSignature } = require('../controllers/zoom')

const router = express.Router()


router.post("/meeting", zoomMeeting);

router.post("/signature", zoomSignature);




module.exports = router





