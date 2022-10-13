const { Schema, model, Types } = require('mongoose')

const doubtSchema = new Schema(
    {   
        student: {
            type: Types.ObjectId,
            ref: 'Student',
            required: true
        },
        question: {
            type: String,
            required: true
        },
        examType: {
            type: String,
            required: true
        },
        link: {
            type: Array,
        },
        teacher: {
            type: Types.ObjectId,
            ref: 'Teacher',
        },
        isResolved: {
            type: Boolean
        },
        isStudentSatisfied: {
            type: Boolean
        },
        doubtReply: {
            type: Types.ObjectId,
            ref: 'DoubtReply'
        },
    },
    {
        timestamps: true,
    }
)

module.exports = new model('DoubtExpert', doubtSchema)
