const mongoose = require('mongoose');

const TeacherAttendanceLogSchema = new mongoose.Schema({
    TeacherId: {
        type: mongoose.Types.ObjectId,
        ref: 'Teacher',
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

module.exports = mongoose.model("TeacherAttendancelog",TeacherAttendanceLogSchema)