const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const questionSchema = new mongoose.Schema({
    standard: {
        type: ObjectId,
        ref: 'Standard',
        required: true
    },
    examType: {
        type: ObjectId,
        ref: 'ExamType',
        required: true
    },
    subject: {
        type: ObjectId,
        ref: 'Subject',
        required: true
    },
    chapter: {
        type: ObjectId,
        ref: 'chapters',
        required: true
    },
    topic: {
        type: ObjectId,
        ref: 'topic',
        required: true
    },
    subTopic: {
        type: ObjectId,
        ref: 'Subtopic',
        required: true
    },
    question: {
        type: String,
        required: true
    },
    quesType: {
        type: String,
        required: true
    },
    subQuestions: [{
        type: ObjectId,
        ref: 'SubQuestions',
        required: true
    }]

}, {timestamps: true})

module.exports = mongoose.model('Questions', questionSchema);