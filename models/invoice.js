const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Types.ObjectId,
        ref: "Student"
    },
    courseId:{
        type: mongoose.Types.ObjectId,
        ref: "CourseDetails"
    },
    transactionId:{
        type:String
    },
    date: {
        type:Date
    }
})







module.exports = mongoose.model('invoice', invoiceSchema)
