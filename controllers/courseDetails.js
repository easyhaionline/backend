const asyncHandler = require('express-async-handler')
const CourseDetails = require('../models/courseDetails')
const validateExamInputs = require('../validators/exam-type')
const validateMongoID = require('../validators/subject')

// to create a new Course Detials ********************************************************
const courseDetailsAdd = asyncHandler(async (req, res) => {
  const { email, mobile, courseid } = req.body

  const isAlreadyAvail = await CourseDetails.findOne({ email: email });

  const courseDetails = async() => {
    if (isAlreadyAvail == null) {
      return await CourseDetails.create({
        email, mobile, courseid
      })
    } else {
      return await CourseDetails.findOneAndUpdate({email:email}, 
        { email, mobile, courseid }, {new:true, runValidators:true})
    }
  }

  if (courseDetails()) {
    res.status(200).json({
      message: 'Course Details is added successfully!',
      data: courseDetails,
    })
  } else {
    res.status(500)
    throw new Error("New Course Details can't be created at the moment! Try again later.")
  }
})

const getCouseDetailsByEmail = asyncHandler(async (req, res) => {
  const email = req.params.email;
  await CourseDetails.find({ email, status: "new" }).exec((err, data) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    res.status(200).json(data)
  })

})
const getCouseDetailsBymobile = asyncHandler(async (req, res) => {
  const mobile = req.params.mobile;
  await CourseDetails.find({ mobile, status: "new" }).exec((err, data) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    res.status(200).json(data)
  })

})


const courseDetailUpdate = asyncHandler(async (req, res) => {
  const email = req.params.email;
  await CourseDetails.updateMany({ email, status: "new" }, { status: 'old' }).exec((err, data) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    res.status(200).json(data)
  })

})




module.exports = {
  courseDetailsAdd,
  getCouseDetailsByEmail,
  courseDetailUpdate,
  getCouseDetailsBymobile
}
