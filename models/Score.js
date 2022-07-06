const { Schema, model, Types } = require('mongoose')


const scoreSchema = new Schema({

    studentId: {
        type: String,
        ref: "Student"
    },
    startTimeStamp: {
        type: Date
    },
    endTimeStamp: {
        type: Date
    },
    testId: {
        type: Types.ObjectId,
        ref: "Test"
    },
    testName: {
        type: String
    },
    testType: {
        type: String
    },
    questionAttempted: {
        type: Number,

    },
    correctQuestions: {
        type: Number
    },
    totalQuestions: {
        type: Number
    },
    obtainedMarks: {
        type: Number
    },
    maximumMarks: {
        type: Number
    },
    duration: {
        type: Number
    },
    startTime: {
        type: Number
    },
    subject : {
        type : String
    },
    questionsList: {
        type: Array
    },
    subjectWiseScore: {
        type: Object
    },
    submitted: {
        enum: ["IN_PROGRESS", "SUBMITTED"],
        type: String
    }
}, {
    timestamps: true
})

module.exports = new model('Score', scoreSchema);