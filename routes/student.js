const express = require('express')

const { protectAdmin } = require('../middleware/protect')
const {
    studentRegister,
    studentLogin,
    studentVerifyOtp,
    studentGetAll,
    profileUpdate
} = require('../controllers/student')

const router = express.Router()

// @route: POST /api/student
// @desc: To register a new student
// @access: Public
router.post('/', studentRegister)

// @route: POST /api/student/login
// @desc: To login an existing student
// @access: Public
router.post('/login', studentLogin)

// @route: POST /api/student/login/verify-otp
// @desc: To verify otp of existing student
// @access: Public
router.post('/login/verify-otp', studentVerifyOtp)

// @route: GET /api/student
// @desc: To get all students
// @access: Private
router.get('/', protectAdmin, studentGetAll)

router.put('/profile-update',  profileUpdate);

module.exports = router
