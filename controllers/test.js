const asyncHandler = require('express-async-handler')

const Test = require('../models/Test')
const Score = require('../models/Score')
const validateMongoID = require('../validators/id')
const validateTestInputs = require('../validators/test')

// to create new test
const testCreate = asyncHandler(async (req, res) => {
    const { name, date, time, subject, chapter, totalMarks, topic, type, difficulty, questions } =
        req.body

    const { isValid, message } = validateTestInputs(req.body)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }
    const createdBy = req.authAdmin.email

    const newTest = await Test.create({
        name, date, time, subject, chapter, totalMarks, topic, type, difficulty, questions, createdBy
    })

    if (newTest) {
        res.status(200).json({
            message: 'Test created successfully!',
            data: newTest,
        })
    } else {
        res.status(500)
        throw new Error("New Test can't be created at the moment! Try again later.")
    }

    // calculate marks
    // provide questions
    //
})

// to fetch all tests available *******************************************************
const testGetAll = asyncHandler(async (req, res) => {
    const type = req.params.type.toUpperCase()
    const foundTests = await Test.find({ type }).populate("subject", "_id name ").populate("chapter", "_id title ").populate("questions", "_id statement date").sort({ createdAt: -1 })

    res.status(200).json(foundTests)
})

// to fetch all active tests available *******************************************************
const testGetActive = asyncHandler(async (req, res) => {
    const type = req.params.type.toUpperCase()
    const foundTests = await Test.find({ type, isActive: true }).populate("subject", "_id name ").populate("chapter", "_id title ").populate("questions", "_id statement date").sort({
        createdAt: -1,
    })

    res.status(200).json(foundTests)
})

// to toggle the state of test **************************************************************
const testToggle = asyncHandler(async (req, res) => {
    const { testID } = req.params

    const { isValid, message } = validateMongoID(testID)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }

    const foundTestToToggle = await Test.findOne({ _id: testID })

    if (foundTestToToggle) {
        foundTestToToggle.isActive = foundTestToToggle.isActive ? false : true
        foundTestToToggle.save()

        res.status(200).json({
            message: foundTestToToggle.isActive ? 'Test Activated!' : 'Test Deactivated!',
        })
    } else {
        res.status(404)
        throw new Error('Test not found!')
    }
})

// to review a test **************************************************************
const testReview = asyncHandler(async (req, res) => {
    const { testID } = req.params

    const { isValid, message } = validateMongoID(testID)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }

    const foundTestToReview = await Test.findOne({ _id: testID })

    if (foundTestToReview) {
        foundTestToReview.status = 'APPROVED'
        foundTestToReview.save()

        res.status(200).json({
            message: 'Test Approved!',
        })
    } else {
        res.status(404)
        throw new Error('Test not found!')
    }
})


const getEvaluatedTests = asyncHandler(async (req, res) => {
    const { studentId } = req.body

    const evaulatedTests = await Score.find({ studentId });
    const responseObj = {}
    if (evaulatedTests) {
        evaulatedTests.forEach(ele => {
            if (responseObj[ele.testType]) {
                responseObj[ele.testType].push(ele);
            }
            else {
                responseObj[ele.testType] = [ele];
            }
        })
        res.status(200).json(responseObj)
    }
    else {
        res.status(500).json({
            message: "score card not found"
        })
    }


})

// to update test
const testUpdate = asyncHandler(async (req, res) => { })

module.exports = {
    testCreate,
    testGetAll,
    testGetActive,
    testToggle,
    testReview,
    testUpdate,
    getEvaluatedTests
}
