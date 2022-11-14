const mongoose = require('mongoose')

const InvoiceNumberSchema = new mongoose.Schema({
    invoiceNumber: {
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("InvoiceNumber", InvoiceNumberSchema)