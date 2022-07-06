const asyncHandler = require('express-async-handler')
const { ObjectId } = require('mongodb')

const Question = require('../models/Question')
const Test = require('../models/Test')
const validateMongoID = require('../validators/id')
const validateQuestionInputs = require('../validators/question')

/*****************Route to update the status */

// to create a new question ********************************************************
const questionCreate = asyncHandler(async (req, res) => {
    const {
        statement,
        image,
        options,
        correctOptions,
        solution,
        hint,
        difficulty,
        type,
        subject,
        chapter,
        topic,
        time,
        marks,
        negativeMarks,
        previousYear,
    } = req.body

    const { isValid, message } = validateQuestionInputs(req.body)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }

    const createdBy = req.authAdmin.email

    const newQuestion = await Question.create({
        statement,
        image,
        options,
        correctOptions,
        solution,
        hint,
        difficulty,
        type,
        subject,
        chapter,
        topic,
        time,
        marks,
        negativeMarks,
        previousYear,
        createdBy,
    })

    if (newQuestion) {
        res.status(200).json({
            message: 'Question created successfully!',
            data: newQuestion,
        })
    } else {
        res.status(500)
        throw new Error("New Question can't be created at the moment! Try again later.")
    }
})

// to fetch all questions by type available *******************************************************
const questionGetAllByType = asyncHandler(async (req, res) => {
    const type = req.params.type.toUpperCase()
    const foundQuestions = await Question.find({ type }).populate("subject", "_id name ").populate("chapter", "_id title ").sort({ createdAt: -1 })

    res.status(200).json(foundQuestions)
})
// to fetch all questions available *******************************************************
const questionGetAll = asyncHandler(async (req, res) => {

    const foundQuestions = await Question.find().populate("subject", "_id name ").populate("chapter", "_id title ").sort({ createdAt: -1 })

    res.status(200).json(foundQuestions)
})
// to fetch all  sorting questions available *******************************************************
const sortingGetAll = asyncHandler(async (req, res) => {
    const type = req.params.type.toUpperCase()
    const foundQuestions = await Question.find().populate("subject", "_id name ").populate("chapter", "_id title ").sort({ type: -1 })

    res.status(200).json(foundQuestions)
})


// to toggle the state of question **************************************************************
const questionToggle = asyncHandler(async (req, res) => {
    const { questionID } = req.params

    const { isValid, message } = validateMongoID(questionID)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }

    const foundQuestionToToggle = await Question.findOne({ _id: questionID })

    if (foundQuestionToToggle) {
        foundQuestionToToggle.isActive = foundQuestionToToggle.isActive ? false : true
        foundQuestionToToggle.save()

        res.status(200).json({
            message: foundQuestionToToggle.isActive
                ? 'Question Activated!'
                : 'Question Deactivated!',
        })
    } else {
        res.status(404)
        throw new Error('Question not found!')
    }
})

// delete the question **************************************************************
const deleteQuestion = asyncHandler(async (req, res) => {
    const { questionID } = req.params

    const { isValid, message } = validateMongoID(questionID)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }

    const foundQuestionToToggle = await Question.findByIdAndDelete({ _id: questionID })

    if (foundQuestionToToggle) {

        res.status(200).json({
            message: 'question is deleted '
        })
    } else {

        res.status(404)
        throw new Error('Question not found!')
    }
})

// to review a question **************************************************************
const questionReview = asyncHandler(async (req, res) => {
    const { questionID } = req.params

    const { isValid, message } = validateMongoID(questionID)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }

    const foundQuestionToReview = await Question.findOne({ _id: questionID })

    if (foundQuestionToReview) {
        foundQuestionToReview.status = 'APPROVED'
        foundQuestionToReview.save()

        res.status(200).json({
            message: 'Question Approved!',
        })
    } else {
        res.status(404)
        throw new Error('Question not found!')
    }
})

// to update a question **************************************************************
const questionUpdate = asyncHandler(async (req, res) => {
    const {
        _id,
        statement,
        image,
        options,
        correctOptions,
        solution,
        hint,
        difficulty,
        type,
        subject,
        chapter,
        topic,
        time,
        marks,
        negativeMarks,
        previousYear,
    } = req.body

    const { isValid: isValidID, message: messageID } = validateMongoID(_id)
    if (!isValidID) {
        res.status(400)
        throw new Error(messageID)
    }
    const { isValid, message } = validateQuestionInputs(req.body)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }

    const foundQuestion = await Question.findOne({ _id })
    if (!foundQuestion) {
        res.status(404)
        throw new Error('No such Question exists!')
    }

    const updatedBy = req.authAdmin.email

    if (statement) foundQuestion.statement = statement
    if (image) foundQuestion.image = image
    if (options) foundQuestion.options = options
    if (correctOptions) foundQuestion.correctOptions = correctOptions
    if (solution) foundQuestion.solution = solution
    if (hint) foundQuestion.hint = hint
    if (difficulty) foundQuestion.difficulty = difficulty
    if (type) foundQuestion.type = type
    if (subject) foundQuestion.subject = subject
    if (chapter) foundQuestion.chapter = chapter
    if (topic) foundQuestion.topic = topic
    if (time) foundQuestion.time = time
    if (marks) foundQuestion.marks = marks
    if (negativeMarks) foundQuestion.negativeMarks = negativeMarks
    if (previousYear) foundQuestion.previousYear = previousYear
    foundQuestion.updatedBy = updatedBy

    foundQuestion.save()

    res.status(200).json({
        message: 'Question updated successfully!',
        data: foundQuestion,
    })

})

const getQuestionByTestId = asyncHandler(async (req, res) => {
    console.log("here comes the request    :::")
    const { testId, nextQuestionIdx, timer } = req.body;
    console.log(testId, nextQuestionIdx, timer);
    const testObj = await Test.findOne({ _id: ObjectId(testId) });
    console.log(testObj)
    if (testObj) {
        const questionID = testObj.questions[nextQuestionIdx];
        const question = await Question.findOne({ _id: ObjectId(questionID) })
        if (question) {
            res.status(200).json({
                question: question,
                duration: timer
            })
        }
        else {
            res.status(500).json({ message: "error ocurred in question fetch" })
        }
    }
    else {
        res.status(500).json({ message: "test does not exist::" })
    }

})

module.exports = {
    questionCreate,
    questionGetAll,
    questionReview,
    questionToggle,
    questionUpdate,
    sortingGetAll,
    deleteQuestion,
    questionGetAllByType,
    getQuestionByTestId
}
