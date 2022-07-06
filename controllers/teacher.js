const asyncHandler = require('express-async-handler')

const Teacher = require('../models/Teacher')
const generateToken = require('../utils/generateToken')

// to login an existing teacher *************************************************************************
const teacherLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // finding the teacher
    const foundTeacher = await Teacher.findOne({
        email,
        isActive: true,
    })

    if (foundTeacher && (await foundTeacher.matchPassword(password))) {
        res.send({
            email: foundTeacher.email,
            username: foundTeacher.username,
            image: foundTeacher.image,
            subject: foundTeacher.subject.name,
            phone: foundTeacher.phone,
            token: generateToken(foundTeacher._id),
        })
    } else {
        res.status(401)
        throw new Error(
            'Either your credentials are wrong or your account is deactivated! Try again.'
        )
    }
})

// to get all the Teachers ****************************************************************************
const teacherGetAll = asyncHandler(async (_, res) => {
    const foundTeachers = await Teacher.find()
        .select('-password')
        .sort({ createdAt: -1 })
        .populate({
            path: 'subject standard',
            select: 'name',
        })

    res.status(200).json(foundTeachers)
})

module.exports = {
    teacherLogin,
    teacherGetAll,
}
