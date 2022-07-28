const { Schema, model, Types } = require('mongoose')


const complaintSchema = new Schema(
    {
        query: {
            type: String,
        },
        status: {
            type: String,
            required: true,
            default: "Issued"
        },
        mobile: {
            type: String,
            required: true
        },
        student: {
            type: Types.ObjectId,
            ref: 'Student',
        },
        teacher: {
            type: Types.ObjectId,
            ref: 'Teacher',            
        },
        seprater: {
            type: String,
            default:"C"            
        }
        ,image:{
            type:String
        },
        feedback:{
            type: String
        },
        response:{
            type: Types.ObjectId,
            ref: 'Response'
        }
    },
    {
        timestamps: true,
    }
)
// photo -> click -> 

module.exports = new model('Complaint', complaintSchema)
