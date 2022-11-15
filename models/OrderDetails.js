const { Schema, model, Types } = require('mongoose')

const orderDetailschema = new Schema(
    {
        order_id: {
            type: String,
            required: true,
        },
        tracking_id: {
            type: String,
        },
        bank_ref_no: {
            type: String,
        },
        order_status: {
            type: String,
        },
        payment_mode: {
            type: String,
        },
        amount: {
            type: String,
        },
        billing_name:{
            type: String,
        },
        billing_address: {
            type:String
        },
        billing_city:{
            type:String
        },
        billing_state:{
            type:String
        },
        billing_zip:{
            type:String
        },
        billing_country:{
            type:String
        },
        billing_tel:{
            type:String
        },
        studentid: {
            type: Types.ObjectId,
            ref: 'Student',
        },
        courseid: {
            type: Types.ObjectId,
            ref: 'Course',
        },
        status: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = new model('OrderDetails', orderDetailschema)
