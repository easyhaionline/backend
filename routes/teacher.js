const express = require('express')

const { protectAdmin } = require('../middleware/protect')
const { teacherLogin, teacherGetAll } = require('../controllers/teacher')

const router = express.Router()

// @route: POST /api/teacher/login
// @desc: To login an existing teacher
// @access: Public
router.post('/login', teacherLogin)

// @route: GET /api/teacher
// @desc: To get all teachers
// @access: Private
// router.get('/', protectAdmin, teacherGetAll)
router.get('/', teacherGetAll)

module.exports = router
