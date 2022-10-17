const { Schema, model, Types } = require('mongoose')

const doubtReplySchema = new Schema(
    {
        doubtReply: [{
            teacher: {
                type: Types.ObjectId,
                ref: 'Teacher',
                required: true
            },
            reply: [{
                answer: {
                    type: String,
                    required: true
                },
                link: []
            }],
        }],
    },
    {
        timestamps: true,
    }
)

module.exports = new model('DoubtReply', doubtReplySchema)
