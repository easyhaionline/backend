const { Schema, model, Types } = require('mongoose')

const questionSchema = new Schema(
    {
        statement: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        options: [String],
        correctOptions: [String],
        solution: {
            type: String,
        },
        hint: {
            type: String,
        },
        difficulty: {
            type: String,
            enum: ['EASY', 'MEDIUM', 'HARD'],
            required: true,
        },
        type: {
            type: String,
            enum: ['SINGLE-CORRECT', 'MULTIPLE-CORRECT', 'INTEGER', 'ASSERTION'],
            required: true,
        },
        subject: {
            type: Types.ObjectId,
            ref: 'Subject',
        },
        correctAnswer : {
            type : String , 

        },
        chapter: {
            type: Types.ObjectId,
            ref: 'chapters',
        },
        topic: {
            type: String,
        },
        time: {
            type: Number,
            min: 0,
        },
        status: {
            type: String,
            enum: ['IN-REVIEW', 'APPROVED', 'REJECTED'],
            default: 'IN-REVIEW',
        },
        marks: {
            type: Number,
            required: true,
            min: 0,
        },
        negativeMarks: {
            type: Number,
            default: 0,
            max: 0,
        },
        previousYear: {
            type: String,
            default: '000000',
        },
        createdBy: {
            type: String,
            required: true,
        },
        updatedBy: {
            type: String,
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        number : {
            type : Number
        }
    },
    {
        timestamps: true,
    }
)

module.exports = new model('questions', questionSchema)
