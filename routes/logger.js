const express = require('express')
const {createStudentlog, getStudentlog, updateStudentlog, createTeacherlog, getTeacherlog, updateTeacherlog} = require('../controllers/Logger');


const router = express.Router();

// student log route
router.post('/student/:id', createStudentlog)
router.get('/student/getlog/:id', getStudentlog)
router.put('/student/updatelog/:id', updateStudentlog);

// teacher log route
router.post('/teacher/:id', createTeacherlog)
router.get('/teacher/getlog/:id', getTeacherlog)
router.put('/teacher/updatelog/:id', updateTeacherlog);

module.exports = router