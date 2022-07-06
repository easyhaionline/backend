const { Schema, model, Types } = require('mongoose')

const responseSchema = new Schema(
    {
        answer: {
            type: String,
        },
        image: {
            type: String,
        },
        complaint:{
            type: Types.ObjectId,
            ref: 'Complaint'
        }

      
    },
    {
        timestamps: true,
    }
)
// photo -> click -> 

module.exports = new model('Response', responseSchema)
