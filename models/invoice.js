const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Types.ObjectId,
        ref: "Student"
    },
    invoice: [
        {
            date: Date,
            link: String 
        }
    ]
})







module.exports = mongoose.model('invoice', invoiceSchema)
