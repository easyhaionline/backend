const { Schema, model, Types } = require('mongoose')

const paymentSchema = new Schema(
    {
        tag: {
            type: String,
            required: true,
        },
        tagID: {
            type: Types.ObjectId,
            refPath: 'tag',
        },
        tagName: {
            type: String,
        },
        amount: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['SUCCESS', 'FAILURE', 'PENDING'],
            default: 'PENDING',
        },
        date: {
            type: String,
            required: true,
        },
        orderID: {
            type: String,
            required: true,
        },
        testDate: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = new model('Payment', paymentSchema)
