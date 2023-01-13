const asyncHandler = require('express-async-handler')
const smartTrim = require('../utils/smarttrim')
const { generateCode, regenerateCode } = require('../utils/generateCode')
const Course = require('../models/Course')
const validateCourseInputs = require('../validators/course')
const validateCommonInputs = require('../validators/common')
const validateHighlightsInput = require('../validators/highlights')
const validateMongoID = require('../validators/id')
const formidable = require('formidable');
const cloudinary = require("cloudinary").v2;
const UploadApiResponse = require("cloudinary").v2;
const _ = require("lodash")

// to create a new course ***********************************************************
const courseCreate =  (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => { 
    const {
        name,
        stream,
        details,
        program,
        startDate,
        endDate,
        standard,
        actualPrice,
        discountPrice,
        description,
        highlights,
        location,
        classes,
        courses,
        time,
        priority,
        examtype,
        subject,
    } = fields
    console.log("I am standards",standard);
    // validating inputs
    const { isValid: isValidCommon, message: messageCommon } = validateCommonInputs(
        fields,
        2,
        true
    )
    if (!isValidCommon) {
        res.status(400)
        throw new Error(messageCommon)
    }
    const { isValid, message } = validateCourseInputs(fields)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }

    if (!file)
    return res.status(401).json({ message: "Select your file" })
    
    let uploadedFile = UploadApiResponse
    // console.log("Let File", uploadedFile);
    // Image Uploading
    try {
        uploadedFile =cloudinary.uploader.upload(file.path, {
            folder: "image",
            resource_type: "auto"
        })
    }
    catch (err) {
        // console.log("Line1", err.message);
        res.status(400).json({ message: "Server Error:(" })
    }

    // console.log(uploadedFile);
    const { secure_url } = uploadedFile;
    const desktopImage=secure_url;
    const mobileImage=secure_url;

    // generating a UNIQUE code for the program
    let code = generateCode('COURSE', name)

    // getting the email of the logged in admin
    const createdByEmail = req.authAdmin.email

    // checking if the generated code is unique or not
    const codeBase = code.split('__')[0]
    const foundCoursesWithSimilarCode = Course.find({
        code: { $regex: codeBase + '__' + '.*' },
    }).sort({ createdAt: -1 })
    if (foundCoursesWithSimilarCode.length > 0) {
        const latestCode = foundCoursesWithSimilarCode[0].code
        code = regenerateCode(latestCode)
    }

    const mindescription  = smartTrim(description, 220, ' ', ' ...');
    const newCourse =  Course.create({
        name,
        desktopImage,
        mobileImage,
        code,
        stream,
        program,
        startDate,
        endDate,
        standard,
        actualPrice,
        discountPrice,
        description,
        highlights,
        location,
        classes,
        courses,
        time,
        mindescription,
        priority,
        examtype,
        subject,
        createdBy: createdByEmail,
    })

    if (newCourse) {
        res.status(200).json({
            message: 'Course created successfully!',
            data: newCourse,
        })
    } else {
        res.status(500)
        throw new Error("New course can't be created at the moment! Try again later.")
    }
})
}

// to toggle an existing course ********************************************************
const courseToggle = asyncHandler(async (req, res) => {
    const { courseCode } = req.params

    const foundCourseToToggle = await Course.findOne({ code: courseCode })

    if (foundCourseToToggle) {
        // getting the email of logged in admin
        const updatedByEmail = req.authAdmin.email

        foundCourseToToggle.isActive = foundCourseToToggle.isActive ? false : true
        foundCourseToToggle.updatedBy = updatedByEmail
        foundCourseToToggle.save()

        res.status(200).json({
            message: foundCourseToToggle.isActive
                ? 'Course Activated!'
                : 'Course Deactivated!',
                data:foundCourseToToggle
        })
    } else {
        res.status(404)
        throw new Error('Course not found!')
    }
})

// to get all the courses **************************************************************
const courseGetAll = asyncHandler(async (req, res) => {
    const foundCourses = await Course.find().sort({ createdAt: -1 }).populate({
        path: 'stream program',
        select: 'name code',
    }).populate("standard","_id name").populate("subject","_id name")

    res.status(200).json(foundCourses)
})
// to get course by id **************************************************************
const readCourseByid = asyncHandler(async (req,res) => {
    const {id} =req.params; 
    console.log(id)
    const foundCourses = await Course.findOne({_id:id}).sort({ createdAt: -1 }).populate({
        path: 'stream program',
        select: 'name code',
    }).populate("standard","_id name").populate("subject","_id name")

    res.status(200).json(foundCourses)
})

// to get the ACTIVE courses **************************************************************
const courseGetActive = asyncHandler(async (req, res) => {
    const foundCourses = await Course.find({ isActive: true })
        .sort({ createdAt: -1 })
        .populate({
            path: 'stream program',
            select: 'name code',
        }).populate("standard","_id name").populate("subject","_id name")

    res.status(200).json(foundCourses)
})

// to update a course ***********************************************************
const courseUpdate = asyncHandler(async (req, res) => {
    const {
        code,
        name,
        desktopImage,
        mobileImage,
        startDate,
        endDate,
        standard,
        actualPrice,
        discountPrice,
        description,
        details = [],
        highlights = [],
        location,
        classes,
        courses,
        time,
        examtype,
        subject,
        priority,
    } = req.body

    if (!code) {
        res.status(400)
        throw new Error('Please provide Program Code')
    }

    // validating inputs
    const { isValid: isValidCommon, message: messageCommon } = validateCommonInputs(
        req.body,
        2,
        true
    )
    if (!isValidCommon) {
        res.status(400)
        throw new Error(messageCommon)
    }
    const { isValid, message } = validateCourseInputs(req.body)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }
   
   
    const { isValid: isValidHighlight, message: messageHighlight } =
        validateHighlightsInput(highlights, 4)
    if (!isValidHighlight) {
        res.status(400)
        throw new Error(messageHighlight)
    }
    const { isValid: isValidDetail, message: messageDetail } = validateHighlightsInput(
        details,
        3
    )
    if (!isValidDetail) {
        res.status(400)
        throw new Error(messageDetail)
    }

    // getting the email of the logged in admin
    const updatedByEmail = req.authAdmin.email

    // getting the course that is need to be updated
    const foundCourse = await Course.findOne({ code })

    if (foundCourse) {
        let newCode = code

        // checking if the code needs to be updated or not
        if (name !== foundCourse.name) {
            // generating a UNIQUE code for the course
            newCode = generateCode('COURSE', name)

            // checking if the generated code is unique or not
            const codeBase = newCode.split('__')[0]
            const foundCoursesWithSimilarCode = await Course.find({
                code: { $regex: codeBase + '__' + '.*' },
            }).sort({ createdAt: -1 })
            if (foundCoursesWithSimilarCode.length > 0) {
                const latestCode = foundCoursesWithSimilarCode[0].code
                newCode = regenerateCode(latestCode)
            }
        }

        foundCourse.code = newCode
        if (name) foundCourse.name = name
        if (desktopImage) foundCourse.desktopImage = desktopImage
        if (mobileImage) foundCourse.mobileImage = mobileImage
    
       
        if (startDate) foundCourse.startDate = startDate
        if (endDate) foundCourse.endDate = endDate
        if (standard) foundCourse.standard = standard
        if (examtype) foundCourse.examtype = examtype
        if (subject) foundCourse.subject = subject
        
        
        if (classes) foundCourse.classes = classes
        if (courses) foundCourse.courses = courses
        if (time) foundCourse.time = time
        if (location) foundCourse.location = location
        if (actualPrice !== undefined) foundCourse.actualPrice = actualPrice
        if (discountPrice !== undefined) foundCourse.discountPrice = discountPrice
        if (priority !== undefined) foundCourse.priority = priority
        if (details.length > 0) foundCourse.details = details
        
        if (description) (foundCourse.description = description
            ,foundCourse.mindescription  = smartTrim(description, 220, ' ', ' ...'))
        if (highlights.length > 0) foundCourse.highlights = highlights
        foundCourse.updatedBy = updatedByEmail

        foundCourse.save()

        res.status(200).json({
            message: 'Course updated successfully!',
            data: foundCourse,
        })
    } else {
        res.status(404)
        throw new Error('No course exists with this code!')
    }
})

module.exports = {
    courseCreate,
    courseToggle,
    courseGetAll,
    courseGetActive,
    courseUpdate,
    readCourseByid
}
