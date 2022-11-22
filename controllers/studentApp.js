const Student = require('../models/Student')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const Cryptr = require('cryptr');

const studentRegister = asyncHandler(async (req, res) => {
    const { username, email, number, password, courseId } = req.body;
    //  checking for the uniqueness of email address
    const isUniqueEmail = (await Student.countDocuments({ email })) > 0 ? false : true
    if (!isUniqueEmail) {
        res.status(200).json({status: false , message:"Email is already registered!"})
        return 
    }
    console.log(req.body)

    const foundAdmin = await Student.create({
        username,
        email,
        password,
        number,
        courses:courseId
    });
    
    if (foundAdmin) {
        // removing password before sending to client
        foundAdmin.password = null
        const token = generateToken(foundAdmin._id)
        // await foundAdmin.save();
        return res.json({
            status: true,
            fulltoken: token,
            _id: foundAdmin._id,
            email: foundAdmin.email,
            username: foundAdmin.username,
            student: foundAdmin
        })
    } else {
        res.status(500)
        throw new Error(
            "New admin can't be registered at the moment! Try again later."
        )
    }
});

const studentLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // finding the admin
    const foundAdmin = await Student.findOne({
        email,
        isActive: true,
    })
    if (foundAdmin && (await foundAdmin.matchPassword(password))) {
        const token = generateToken(foundAdmin._id)
        res.json({
            fulltoken: token,
            _id: foundAdmin._id,
            email: foundAdmin.email,
            username: foundAdmin.username,
            image: foundAdmin.image,
            student: foundAdmin
        })
    } else {
        res.status(401)
        throw new Error(
            'Either your credentials are wrong or your account is deactivated! Try again.'
        )
    }
})

module.exports= {
    studentRegister,
    studentLogin
}