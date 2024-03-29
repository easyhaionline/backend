const mongoose = require('mongoose');

const TeacherAttendanceLogSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Types.ObjectId,
        ref: 'Teacher',
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

module.exports = mongoose.model("TeacherAttendance",TeacherAttendanceLogSchema)