const { Schema, model, Types } = require('mongoose')

const doubtReplySchema = new Schema(
    {   
        teacher: {
            type: Types.ObjectId,
            ref: 'Teacher',
            required: true
        },
        isChance: {
            type: Boolean,
            default: false
        },
        reply: [{
            attempt:{
                type: Number,
                required: true
            },
            answer: {
                type: String,
                required: true
            },
            link: []
        }],
    },
    {
        timestamps: true,
    }
)

module.exports = new model('DoubtReply', doubtReplySchema)
