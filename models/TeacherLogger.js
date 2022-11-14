const mongoose = require('mongoose');

const TeacherLogSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Types.ObjectId,
        ref: 'Teacher',
         required: true
    },
    log: [{
        _id:false,
        route: {
            type: String,
            // required: true
        },
        startTime: {
            type: String,
            // required: true
        },
        endTime: {
            type: String,
            // required: true
        }
    }]
},{timestamps:true})

module.exports = mongoose.model("Teacherlog",TeacherLogSchema)