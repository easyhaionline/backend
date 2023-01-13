const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const Teacher = require('../models/Teacher')
const Student = require('../models/Student')
const Courses = require('../models/Course')
const Subject = require('../models/Subject')

const getTeachers = asyncHandler(async (req, res) => {
    
    var teacherId = []
    const studentId = req.params.id

    const student = await Student.findOne({ _id: studentId }).populate("courses")

    for (var i = 0; i < student.courses.length; i++) {

      const subject = await Subject.findOne({ _id: student.courses[i].subject }).populate("teachers")
				for(let j = 0; j < subject.teachers.length; j++) {
					teacherId.push(subject.teachers[j])
				}
    }

		console.log(teacherId)
    const data = Array.from(new Set(teacherId.map(JSON.stringify))).map(JSON.parse)
    res.json( data )
})

const getStudents = asyncHandler(async (req, res) => {

    var coursesData = []
    var studentData = []
    const teacherId = req.params.id

    const courses = await Courses.find()
    for (var i = 0; i < courses.length; i++) {
        const subject = await Subject.findOne({ _id: courses[i].subject[0] })
        if (subject.teachers[0] == teacherId) {
            coursesData.push(courses[i]._id)
        }
    }

    const students = await Student.find()
    for (var i = 0; i < students.length; i++) {
        for (var k = 0; k < students[i].courses.length; k++) {
            for (var j = 0; j < coursesData.length; j++) {
                if (students[i].courses[k] == coursesData[j]) {
                    studentData.push(students[i])
                    break
                }
            }
        }
    }

    const data = Array.from(new Set(studentData.map(JSON.stringify))).map(JSON.parse)
    res.json(data)
})

module.exports = { getTeachers, getStudents }