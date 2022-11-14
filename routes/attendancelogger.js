const express = require('express');
const router = express.Router();
const {createstudentattendancelog, updatestudentattendance, getStudentattendance, createteacherattendancelog, updateteacherattendance, getTeacherattendance} = require('../controllers/attendance');

// student attendance
router.post('/student/:id', createstudentattendancelog);
router.put('/student/updatelog/:id', updatestudentattendance);
router.get('/student/getattendance/:id',getStudentattendance);

// teacher attendance
router.post('/teacher/:id', createteacherattendancelog);
router.put('/teacher/updatelog/:id', updateteacherattendance);
router.get('/teacher/getattendance/:id',getTeacherattendance);


module.exports = router