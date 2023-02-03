const asyncHandler = require('express-async-handler')

const Teacher = require('../models/Teacher')
const Subject = require('../models/Subject')

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

const teacherById = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    console.log("This is my ID",_id)
     await Teacher.findById(_id).exec((err,data)=>{
      if (err) {
        return res.json({
          error: err,
        });
      }
      else{
    //    Subject.find().filter()
    //         const foundSubjects = Subject.find().populate("standard","_id name").populate("chapters","_id name").populate("teachers","_id username email").sort({ createdAt: -1 }).populate(
    //         "chapters",
    //         "_id name"
    //         )
    // res.status(200).json(foundSubjects)


      res.status(200).json(data)
        }
     })
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
    const foundTeacher = await Teacher.findOne({
        email,
    })


    if (foundTeacher) {
        // checking if the logged in user is updating his own details or else he is a super admin
        // (super admin can update any admin's details)


        if (username) foundTeacher.username = username
        if (image) foundTeacher.image = image[1]
        if (number) foundTeacher.number = number
        foundTeacher.save();
        res.status(200).json({
            message: 'User updated successfully!',  
            data: { ...foundTeacher._doc, password: null },
        })
    } else {
        res.status(404)
        throw new Error('No user exists with this email!')
    }
})

const getAllTeachersEmail = asyncHandler(async(req, res) => {
    const teachers = await Teacher.find()

    let data = []
    for(let i = 0; i < teachers.length; i++) {
        data.push(teachers[i].email)
    }

    res.send(data)
})

const getAllTeachersMobile = asyncHandler(async(req, res) => {
    const teachers = await Teacher.find()

    let data = []
    for(let i = 0; i < teachers.length; i++) {
        data.push(teachers[i].phone)
    }
    res.send(data)
})

module.exports = {
    teacherLogin,
    teacherById,
    teacherGetAll,
    profileUpdate,
    getAllTeachersEmail,
    getAllTeachersMobile
}


// get Teacher by id 
