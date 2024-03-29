const asyncHandler = require('express-async-handler')

const Student = require('../models/Student')
const ChatUser = require('../models/chatUser')
const BusinessPartner = require('../models/BusinessPartner');
const SubBusinessPartner = require('../models/SubBusinessPartner');
const validateStudentInputs = require('../validators/student')
const Studentlog = require('../models/StudentLogger');
const StudentAttendancelog = require('../models/StudentAttendance');

// to register a new student *******************************************************************************
const studentRegister = asyncHandler(async (req, res) => {
    const { name, username, email, phone, standard, course, freeTrial , referralCode} = req.body
    let number = phone;
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
    const isUniquePhone = (await Student.countDocuments({ number: phone })) > 0 ? false : true
    if (!isUniquePhone) {
        res.status(400)
        throw new Error('Phone is already registered! Try Logging in.')
    }

    const newStudent = await Student.create({
        name,
        username,
        email,
        number : phone,
        standard,
        course,
        freeTrial,
        referralCode
    })

    console.log(newStudent)
    var partner = await SubBusinessPartner.findOne({referralCode});
    if(partner){
        const partnerObject = await SubBusinessPartner.updateOne({ referralCode: referralCode }, { $push: { students: newStudent._id }});
    }

    await ChatUser.create({_id:newStudent._id, username: newStudent.username})
    await Studentlog.create({studentId:newStudent._id})
    await StudentAttendancelog.create({studentId:newStudent._id})

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

// to get single Student ****************************************************************************
const studentGetById = asyncHandler(async (req, res) => {
    const foundStudent = await Student.findOne({_id:req.params.id})

    if(!foundStudent) {
        res.status(404).json({msg:"Student not found"})
    }

    res.status(200).json(foundStudent)
})

// edit profile
const profileUpdate = asyncHandler(async (req, res) => {
    const { username, image, email, number } = req.body

    console.log(req.body)
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
        if (image) foundStudent.image = image
        if (number) foundStudent.number = number
        foundStudent.save();
        res.status(200).json({
            message: 'User updated successfully!',  
            data: { ...foundStudent._doc, password: null },
        })
    } else {
        res.status(200).json({status: false,message: "No user exist with this email!"})
        return
        // throw new Error('No user exists with this email!')
    }
})

const getStudentsNumber = asyncHandler(async (req, res) => {
    const students = await Student.find({courses:{$in:[req.params.courseId]}})

    if(!students) {
        res.status(404).json({msg:"Students not found"})
    }

    res.status(200).json(students)
})

module.exports = {
    studentRegister,
    studentLogin,
    studentVerifyOtp,
    studentGetAll,
    profileUpdate,
    studentGetById,
    getStudentsNumber
}
