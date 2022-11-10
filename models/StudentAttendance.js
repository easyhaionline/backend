const mongoose = require('mongoose');

const StudentAttendanceLogSchema = new mongoose.Schema({
    StudentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    ispresent:[{
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
})

module.exports = mongoose.model("StudentAttendancelog",StudentAttendanceLogSchema)