const Answer = require('../models/Answer');
const asyncHandler = require('express-async-handler')


const createAnswers = asyncHandler(async (req, res) => {

    const { responseString, questionId, studentId } = req.body;

    const newAnswer = await Answer.create({
        questionId,
        answer: responseString,
        studentId
    })

    if (newAnswer) {
        res.status(201).json({
            message: "answer recorder successfully"
        });

    }
    else {
        res.status(500).json({
            message: "some error occured"
        })
    }
})

const updateAnswers = asyncHandler(async (req, res) => {

    const { responseString, questionId, studentId } = req.body;

    const updateAnswer = await Answer.findOneAndUpdate({ questionId, studentId }, { $set: { answer: responseString } });

    if (updateAnswer) {
        res.status(200).json({

            message: "answer updated successfully"
        })
    } else {
        const newAnswer = await Answer.create({
            questionId,
            answer: responseString,
            studentId
        })

        if (newAnswer) {

            res.status(200).json({

                message: "answer updated successfully"
            })
        }
        else {
            res.status(500).json({
                message: "some error occured"
            })
        }
    }
})

module.exports = {
    createAnswers,
    updateAnswers
}
