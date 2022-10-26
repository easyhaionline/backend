const asyncHandler = require('express-async-handler')
const ChatUser = require('../models/chatUser')
const Teacher = require('../models/Teacher')
const Student = require('../models/Student')
const Courses = require('../models/Course')
const Subject = require('../models/Subject')

const getTeachers = asyncHandler(async (req, res) => {

    var data = []
    const studentId = req.params.id

    const student = await Student.findOne({ _id: studentId })
    // console.log("AAAAAAAAAA", student);

    for (var i = 0; i < student.courses.length; i++) {
        const course = await Courses.findOne({ _id: student.courses[i] })

        // console.log(course.subject)

        const subject = await Subject.findOne({ _id: course.subject })
        // console.log(`TEACHER ${j}: `, subject.teachers)
        for (var j = 0; j < subject.teachers.length; j++) {

            const teacher = await Teacher.findOne({ _id: subject.teachers[j] })

            data.push(teacher)
        }
    }

    // console.log(student.courses)
    res.json({ data })
})


const getStudents = asyncHandler(async (req, res) => {

    var coursesData = []
    var data = []
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
                if (students[i].courses[j] == coursesData[k])
                    data.push(students[i])
            }
        }
    }

    res.json(data)
})

module.exports = { getTeachers, getStudents }