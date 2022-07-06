const {  Schema, model, Types  } = require('mongoose')

const orderSchema = new Schema(
    {
        course: {
            type: Types.ObjectId,
            ref: 'Course',
        },
        pricing: {
            type: Types.ObjectId,
            ref: 'Ourpricing',
        },
        student: {
            type: Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        isPayment: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
)

module.exports = new model('Order', orderSchema)
