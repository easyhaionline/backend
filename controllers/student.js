const asyncHandler = require('express-async-handler')

const Student = require('../models/Student')
const ChatUser = require('../models/chatUser')
const validateStudentInputs = require('../validators/student')

// to register a new student *******************************************************************************
const studentRegister = asyncHandler(async (req, res) => {
    const { name, username, email, phone, standard, course, freeTrial } = req.body

    // validating inputs
    const { isValid, message } = validateStudentInputs(req.body)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }

    //  checking for the uniqueness of email address
    const isUniqueEmail = (await Student.countDocuments({ email })) > 0 ? false : true
    if (!isUniqueEmail) {
        res.status(400)
        throw new Error('Email is already registered! Try Logging in.')
    }

    //  checking for the uniqueness of phone number
    const isUniquePhone = (await Student.countDocuments({ phone })) > 0 ? false : true
    if (!isUniquePhone) {
        res.status(400)
        throw new Error('Phone is already registered! Try Logging in.')
    }

    const newStudent = await Student.create({
        name,
        username,
        email,
        phone,
        standard,
        course,
        freeTrial,
    })

    await ChatUser.create({_id:newStudent._id, username: newStudent.username})

    if (newStudent) {
        res.status(200).json(newStudent)
    } else {
        res.status(500)
        throw new Error("New student can't be registered at the moment! Try again later.")
    }
})

// to login an existing student *************************************************************************
const studentLogin = asyncHandler(async (req, res) => {
    const { phone } = req.body

    const foundStudent = await Student.findOne({ phone })

    if (!foundStudent) {
        res.status(401)
        throw new Error('This phone number is not registered!')
    }

    let otp = phone.substring(4)

    foundStudent.otp = otp
    foundStudent.save()

    // send otp
    res.status(200).json({ message: `Your otp is:${otp}` })
})

// to verify otp of given student ****************************************************************************
const studentVerifyOtp = asyncHandler(async (req, res) => {
    const { phone, otp } = req.body
    const foundStudent = await Student.findOne({ phone })

    if (!foundStudent) {
        res.status(401)
        throw new Error('This phone number is not registered!')
    }

    // update result as per given end point4
    result = foundStudent.otp === foundStudent.phone.substring(4) ? true : false

    if (result === false) {
        res.status(401)
        throw new Error('Incorrect OTP! Try again.')
    }

    foundStudent.isPhoneVerified = true
    foundStudent.save()

    res.status(200).json(foundStudent)
})

// to get all the Students ****************************************************************************
const studentGetAll = asyncHandler(async (_, res) => {
    const foundStudents = await Student.find().sort({ createdAt: -1 })

    res.status(200).json(foundStudents)
})

// edit profile
const profileUpdate = asyncHandler(async (req, res) => {
    const { username, image, email, number } = req.body

    console.log(image)

    // validating inputs
    // const { isValid, message } = validateStudentInputs(req.body, true)
    // if (!isValid) {
    //     res.status(400)
    //     throw new Error(message)
    // }

    // finding the admin whose details are need to be updated
    const foundStudent = await Student.findOne({
        email,
    })


    if (foundStudent) {
        // checking if the logged in user is updating his own details or else he is a super admin
        // (super admin can update any admin's details)


        if (username) foundStudent.username = username
        if (image) foundStudent.image = image[1]
        if (number) foundStudent.number = number
        foundStudent.save();
        res.status(200).json({
            message: 'User updated successfully!',  
            data: { ...foundStudent._doc, password: null },
        })
    } else {
        res.status(404)
        throw new Error('No user exists with this email!')
    }
})

module.exports = {
    studentRegister,
    studentLogin,
    studentVerifyOtp,
    studentGetAll,
    profileUpdate
}
