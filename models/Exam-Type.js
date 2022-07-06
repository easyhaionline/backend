const { Schema, model, Types } = require('mongoose')


const subjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
       
        standard: [
            {
              type: Types.ObjectId,
              ref: "Standard",
            },
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

module.exports = new model('ExamType', subjectSchema)
