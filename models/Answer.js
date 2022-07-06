const { Schema, model, Types } = require('mongoose')

const answerSchema = new Schema(
    {
        answer: {
            type: String,
        },
        questionId: {
            type: String
        },
        studentId: {
            type: String
        }
    },
    {
        timestamps: true,
    }
)

module.exports = new model('Answer', answerSchema)
