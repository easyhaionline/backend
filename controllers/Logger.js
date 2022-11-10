const Studentlog = require('../models/StudentLogger');
const Teacherlog = require ('../models/TeacherLogger');
const asyncHandler = require('express-async-handler')

// create student log
const createStudentlog = asyncHandler(async(req, res) => {   
    req.body.log = req.body
    req.body.studentId = req.params.id
    const StudentLogger = await Studentlog.create(req.body)
    res.status(200).json(StudentLogger)
});

// get student log
const getStudentlog = asyncHandler(async(req, res) => {
    const studentLog = await Studentlog.findOne({studentId:req.params.id}).populate("studentId", "username email")
    console.log(studentLog)
    res.json(studentLog)
});

// updating student log
const updateStudentlog = asyncHandler(async(req, res) => {
    const {route, startTime, endTime} = req.body
    console.log(req.body)
    const studentlog = await Studentlog.findOneAndUpdate({studentId:req.params.id},{$push:{log:{route, startTime, endTime}}},{new:true,runValidators:true})
    
    // console.log(studentlog)
    res.json(studentlog)
});



// create teacher log
const createTeacherlog = asyncHandler(async(req, res) => {   
    req.body.log = req.body
    req.body.teacherId = req.params.id
    const TeacherLogger = await Teacherlog.create(req.body)
    res.status(200).json(TeacherLogger)
});

// get teacher log
const getTeacherlog = asyncHandler(async(req, res) => {
    const teacherLog = await Teacherlog.findOne({teacherId:req.params.id}).populate("teacherId", "username email")
    console.log(teacherLog)
    res.json(teacherLog)
}); 

// updating teacher log
const updateTeacherlog = asyncHandler(async(req, res) => {
    const {route, startTime, endTime} = req.body
    console.log(req.body)
    const teacherlog = await Teacherlog.findOneAndUpdate({teacherId:req.params.id},{$push:{log:{route, startTime, endTime}}},{new:true,runValidators:true})
    
    // console.log(studentlog)
    res.json(teacherlog)
});

    
module.exports = {createStudentlog, updateStudentlog, getStudentlog, createTeacherlog, getTeacherlog, updateTeacherlog}
