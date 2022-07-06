const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const subQuestionSchema = new mongoose.Schema({
    question: {
        quesDesc: { type: String, required: true },
        photo: { type: String }
    },
    quesType: {
        type: String,
        required: true
    },
    options: [{
        answer: String, isCorrect: String
    }],
    answer: {
        ansDesc: { type: String },
        photo: { type: String }
    },
    solution: {
        solnDesc: { type: String },
        photo: { type: String }
    },
    positiveMarks: {
        type: Number,
        required: true
    },
    negativeMarks: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('SubQuestions', subQuestionSchema);