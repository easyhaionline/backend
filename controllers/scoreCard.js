const Answer = require('../models/Answer');
const Question = require('../models/Question');
const Score = require('../models/Score');
const { ObjectId } = require('mongodb');
const Test = require('../models/Test');
const { data } = require('./sample')
const asyncHandler = require('express-async-handler');
const { ObjectID } = require('mongodb');

const testSubmission = asyncHandler(async (req, res) => {
    const { testId, studentId, testEndedTimeStamp } = req.body;
    const scoreParametersObj = await getScoreForTest(testId, studentId);

    const existingScoreCard = await Score.findOne({ testId, studentId });
    if (existingScoreCard && existingScoreCard.submitted === 'SUBMITTED') {
        res.status(201).json({
            message: "test already submitted"
        })
    }

    const scoreCard = await Score.findOneAndUpdate({ testId: ObjectId(testId), studentId, submitted: "IN_PROGRESS" }, {
        $set: {
            endTimeStamp: testEndedTimeStamp,
            questionAttempted: scoreParametersObj.questionAttempted,
            correctQuestions: scoreParametersObj.correctAnswers,
            obtainedMarks: scoreParametersObj.obtainedMarks,
            questionsList: scoreParametersObj.questionsList,
            submitted: "SUBMITTED"

        }
    })
    if (scoreCard) {
        res.status(201).json({
            message: "test submitted successfully"
        })
    }
    else {
        res.status(500).json({
            message: "some error occured"
        })
    }
});


const testStart = asyncHandler(async (req, res) => {
    const { studentId, testId, startTimeStamp } = req.body;


    const existingScoreCard = await Score.findOne({ testId, studentId });

    if (existingScoreCard) {

        if (existingScoreCard.submitted === "submitted") {
            res.status(201).json({
                message: "test already submitted"
            })
        }
        else {


            const testObj = await Test.findOne({ _id: ObjectId(testId) });
            const question = await Question.findOne({ _id: ObjectId(testObj.questions[0]) })
            if (question) {
                question.number = 1;
            }
            const questionsList = await Question.find({ _id: { $in: testObj.questions.map(ele => ObjectId(ele)) } }, { _id: 1, subject: 1, number: 1 })
            questionsList.forEach((ele, idx) => {
                ele.number = idx + 1;
            })
            console.log(questionsList)
            res.status(200).json({
                question,
                questionsLists: questionsList,
                startTime: existingScoreCard.startTime,
                duration: existingScoreCard.duration,
                reload: true
            })
        }
    }
    else {
        // const startTime = new Date(startTimeStamp);
        const scoreCardObj = {
            testId,
            studentId,
            startTimeStamp,
        }
        console.log(testId);
        const testObj = await Test.findOne({ _id: ObjectId(testId) });
        console.log()
        console.log(testObj)
        if (testObj) {
            console.log(startTimeStamp);
            const question = await Question.findOne({ _id: ObjectId(testObj.questions[0]) });
            if (question) {
                question.number = 1;
            }
            const questionsList = await Question.find({ _id: { $in: testObj.questions.map(ele => ObjectId(ele)) } }, { _id: 1, subject: 1, number: 1 })
            questionsList.forEach((ele, idx) => {
                ele.number = idx + 1;
            })
            scoreCardObj.totalQuestions = testObj.questions.length;
            scoreCardObj.maximumMarks = testObj.totalMarks;
            scoreCardObj.testType = testObj.testType
            scoreCardObj.testName = testObj.name
            scoreCardObj.startTime = startTimeStamp
            scoreCardObj.submitted = 'IN_PROGRESS'
            scoreCardObj.duration = 3 * 60 * 60 * 1000;
            scoreCardObj.subject = testObj.subjectName
            console.log("this is testType")
            console.log(scoreCardObj.testType)
            const scoreCard = await Score.create(scoreCardObj);
            if (scoreCard) {
                res.status(201).json({
                    question,
                    questionLists: questionsList,
                    startTime: startTimeStamp,
                    duration: 3 * 60 * 60 * 1000,
                    reload: false
                })
            }
            else {
                res.status(500).json({
                    message: "some error occured"
                })
            }
        }
        else {
            res.status(500).json({
                message: "test does not exist"
            })
        }
    }
})


const getAnalyticalData = asyncHandler(async (req, res) => {

    const { studentId } = req.body;

    const scoreCardsQuestionAnalytics = await Score.aggregate([
        { $match: { studentId: studentId.toString() } },
        {
            $group: {

                _id: "$testType",
                questionAttempted: { $sum: "$questionAttempted" },
                correctQuestions: { $sum: "$correctQuestions" },
                totalQuestions: { $sum: "$totalQuestions" },
                obtainedMarks: { $sum: "$obtainedMarks" },
                testTaken: { $sum: 1 }
            }
        }
    ]);
    console.log(scoreCardsQuestionAnalytics)
    const scoreCardRecentAttempts = await Score.find({ studentId }).sort({ createdDate: -1 }).limit(10);
    scoreCardRecentAttempts.forEach(ele => {
        ele.accuracy = ele.correctQuestions / ele.questionAttempted;
    })
    const chartRawDataObj = {
        latestTest: await subjectWiseScoreDistribution(scoreCardRecentAttempts[0]),
        oldestTest: await subjectWiseScoreDistribution(scoreCardRecentAttempts.slice(-1)[0])
    }

    if (scoreCardsQuestionAnalytics.length) {
        scoreCardsQuestionAnalytics.forEach(ele => {
            ele.incorrectQuestions = (ele.questionAttempted - ele.correctQuestions) || 0
            ele.overallAccuracy = ele.questionAttempted / ele.totalQuestions
            ele.percentile = (ele.obtainedMarks / ele.maximumMarks) * 100;

        })
        res.status(200).json({
            data: {
                questionData: scoreCardsQuestionAnalytics,
                recentAttempts: scoreCardRecentAttempts,
                chartData: chartRawDataObj
            }
        })
    }
    else {
        res.status(500).json({
            message: "score card does not exists::"
        })
    }
})


const getResults = asyncHandler(async (req, res) => {
    const { studentId, testId } = req.body;
    const scoreCard = await Score.findOne({ studentId, testId });
    if (scoreCard) {
        const responseObj = await subjectWiseScoreDistribution(scoreCard);
        res.status(200).json({
            data: responseObj
        })
    }
    else {
        res.status(404).json({ message: "score card does not exist" })
    }

})

const getScoreForTest = asyncHandler(async (examId, studentId) => {
    const scoreCard = {
        questionAttempted: 0,
        correctAnswers: 0,
        subjectWiseScore: {}
    }
    const test = await Test.findOne({ _id: ObjectId(examId) });
    if (test) {
        const questionsList = test.questions.map(ele => ObjectId(ele));
        const answers = await Answer.find({ questionId: { $in: [...questionsList] }, studentId })
        if (answers) {
            scoreCard.questionAttempted = answers.length;
            const attemptedQuestionMapping = answers.reduce((acc, ele) => {
                acc[ele.questionId] = ele.answer;
                return acc;
            }, {})

            const questions = await Question.find({ _id: { $in: [...questionsList] } });
            const correctQuestionKeys = questions.reduce((acc, ele) => {
                acc[ele._id] = {
                    correctAnswer: ele.correctAnswer,
                    marks: ele.marks
                }
                return acc;
            }, {})
            Object.keys(attemptedQuestionMapping).forEach(ele => {
                if (correctQuestionKeys[ele].correctAnswer === attemptedQuestionMapping[ele]) {
                    scoreCard.correctAnswers++;
                    if (!scoreCard.obtainedMarks)
                        scoreCard.obtainedMarks = 0;

                    scoreCard.obtainedMarks += (correctQuestionKeys[ele].marks || 0)
                    if (!scoreCard.questionsList) {
                        scoreCard.questionsList = [ele];
                    }
                    else {
                        scoreCard.questionsList.push(ele);
                    }
                }

            })
            return scoreCard;
        }
        else {
            return scoreCard;
        }
    }

    return scoreCard

});

const subjectWiseScoreDistribution = async (scoreCard) => {

    const testObj = await Test.findOne({ _id: ObjectId(scoreCard.testId) });
    scoreCard.subjectWiseScore = {};
    if (testObj) {
        const questionsList = testObj.questions;
        const questions = await Question.find({ _id: { $in: [...questionsList.map(ele => ObjectId(ele))] } })

        questions.forEach(ele => {

            if (scoreCard.subjectWiseScore[ele.subject]) {
                scoreCard.subjectWiseScore[ele.subject].totalQuestions += 1;
                scoreCard.subjectWiseScore[ele.subject].totalScore += ele.marks;
                if (scoreCard.questionsList.indexOf(ele._id) !== -1) {
                    scoreCard.subjectWiseScore[ele.subject].correctQuestions += 1;

                    scoreCard.subjectWiseScore[ele.subject].totalScore += ele.marks;
                }
                scoreCard.subjectWiseScore[ele.subject].incorrect += (scoreCard.subjectWiseScore[ele.subject].totalQuestions -
                    scoreCard.subjectWiseScore[ele.subject].correctQuestions)

            }
            else {
                scoreCard.subjectWiseScore[ele.subject] = {};

                scoreCard.subjectWiseScore[ele.subject].totalQuestions = 1;
                scoreCard.subjectWiseScore[ele.subject].totalScore = ele.marks;
                if (scoreCard.questionsList.indexOf(ele._id) !== -1) {
                    console.log(ele.subject);

                    scoreCard.subjectWiseScore[ele.subject].correctQuestions = 1;
                    scoreCard.subjectWiseScore[ele.subject].totalScore = ele.marks;
                }
                else {
                    scoreCard.subjectWiseScore[ele.subject].correctQuestions = 0;
                    scoreCard.subjectWiseScore[ele.subject].totalScore = ele.marks;
                }
                scoreCard.subjectWiseScore[ele.subject].incorrect = (scoreCard.subjectWiseScore[ele.subject].totalQuestions -
                    scoreCard.subjectWiseScore[ele.subject].correctQuestions) || 0
            }

        })
    }
    console.log(scoreCard);
    return scoreCard

}


module.exports = {
    testSubmission,
    testStart,
    getAnalyticalData,
    getResults
}