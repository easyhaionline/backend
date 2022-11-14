const StudentAttendancelog = require('../models/StudentAttendance');
const TeacherAttendance = require('../models/TeacherAttendance')
const asyncHandler = require('express-async-handler');

// create student attendancelog
const createstudentattendancelog = asyncHandler(async(req, res) => {
    req.body.log = req.body
    req.body.studentId = req.params.id
    const AttendanceLogger = await StudentAttendancelog.create(req.body)
    res.status(200).json(AttendanceLogger)
});

// update student attendancelog
const updatestudentattendance = asyncHandler(async(req, res) => {
    const {lectureId ,date, attendance} = req.body
    console.log(req.body)
    const studentattendancelog = await StudentAttendancelog.findOneAndUpdate({studentId:req.params.id},{$push:{ispresent:{lectureId, date, attendance}}},{new:true,runValidators:true})
    res.json(studentattendancelog)
})

//get student attendancelog
const getStudentattendance = asyncHandler(async(req, res) => {
    const studentAttendancelog = await StudentAttendancelog.findOne({studentId:req.params.id}).populate("studentId", "username email")
    console.log(studentAttendancelog)
    res.json(studentAttendancelog)
});

// create teacher attendancelog
const createteacherattendancelog = asyncHandler(async(req, res) => {
    req.body.teacherId = req.params.id
    const AttendanceLogger = await TeacherAttendance.create(req.body)
    res.status(200).json(AttendanceLogger)
});

// update teacher attendancelog
const updateteacherattendance = asyncHandler(async(req, res) => {
    const {lectureId ,date, attendance} = req.body
    console.log(req.body)
    const teacherattendancelog = await TeacherAttendance.findOneAndUpdate({teacherId:req.params.id},{$push:{ispresent:{lectureId, date, attendance}}},{new:true,runValidators:true})
    res.json(teacherattendancelog)
});

//get teacher attendancelog
const getTeacherattendance = asyncHandler(async(req, res) => {
    const teacherAttendancelog = await TeacherAttendance.findOne({teacherId:req.params.id}).populate("teacherId", "username email")
    console.log(teacherAttendancelog)
    res.json(teacherAttendancelog)
})



module.exports = {createstudentattendancelog, updatestudentattendance, getStudentattendance, createteacherattendancelog, updateteacherattendance, getTeacherattendance}