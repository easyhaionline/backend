const { Schema, model, Types } = require('mongoose')

const courseDetails = new Schema(
    {
        email: {
            type: String,
        },
        mobile: {
            type: String,
        },
        courseid: {
            type: Types.ObjectId,
        },
        status: {
            type: String,
            default: 'new',
        },
        updatedBy: {
            type: String,
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        number : {
            type : String
        }
    },
    {
        timestamps: true,
    }
)

module.exports = new model('CourseDetails', courseDetails)
