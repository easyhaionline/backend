const mongoose = require('mongoose');

const StudentAttendanceLogSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    ispresent:[{
        _id:false,
        lectureId: {
            type: mongoose.Types.ObjectId,
            ref: 'Lecture',
            required: true
        },
        date: {
            type: String,
        },
        attendance: {
            type: Boolean,
            default: false,
        }
    }]
},{timestamps:true})

module.exports = mongoose.model("StudentAttendancelog",StudentAttendanceLogSchema)