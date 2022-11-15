const mongoose = require('mongoose');

const StudentLogSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Student',
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

module.exports = mongoose.model("Studentlog",StudentLogSchema)