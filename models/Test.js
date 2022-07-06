const { Schema, model, Types } = require('mongoose')

const testSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        date: {
            type: String,
        },
        timeAlloted: {
            type: Number,
            min: 10,
        },
        totalMarks: {
            type: Number,
            required: true,
        },
        questions: [
            {
                type: Types.ObjectId,
                ref: 'Question',
            },
        ],
        subject: {
            type: Types.ObjectId,
            ref: 'Subject',
        },
        subjectName: {
            type: String
        },
        chapter: {
            type: Types.ObjectId,
            ref: 'Chapter',
        },
        topic: {
            type: String,
        },
        testType: {
            type: String,
            // enum: ['PRACTICE', 'SERIES', 'ASSIGNMENT', ' PREVIOUS', 'PREPARATORY'],
            required: true,
        },
        status: {
            type: String,
            enum: ['IN-REVIEW', 'APPROVED', 'REJECTED'],
            default: 'IN-REVIEW',
        },
        difficulty: {
            type: String,
            enum: ['EASY', 'MEDIUM', 'HARD'],
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)


// totalQuesrions:0,
// easyquestions:0,
// hardquestions:0,
// mediumquestions:0,

// difficulty: "",
// chapter:"",
// type: "",
// standard: "",
// subject: "",
// chapter: "",
// topic: "",
// time: 0,
// examtype: "",
// marks: 0,
// negativeMarks: -7,
// previousYear: 0,
// prreviousMonth: 0,

module.exports = new model('tests', testSchema)
