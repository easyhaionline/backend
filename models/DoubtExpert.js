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
        attempt:{
            type: Number,
            default: 0
        },
        isResolved: {
            type: Boolean
        },
        isStudentSatisfied: {
            type: Boolean
        },
        isChance: {
            type: Boolean,
            default: false
        },
        doubtReply: [{
            teacher: {
                type: Types.ObjectId,
                ref: 'Teacher',
            },
            reply: {
                type: String,
                required: true
            },
            link: {
                type: Array,
            },
        }],
    },
    {
        timestamps: true,
    }
)

module.exports = new model('DoubtExpert', doubtSchema)
