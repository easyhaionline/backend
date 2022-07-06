const { Schema, model, Types } = require('mongoose')

const standardSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        examtype: {
            type: Types.ObjectId,
            ref: 'ExamType',
        },
        course:[
            {
                type:Types.ObjectId,
                ref:'Course'
            }
        ],

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = new model('Standard', standardSchema)
