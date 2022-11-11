const mongoose = require('mongoose')

const InvoiceSchema = new mongoose.Schema({
    invoice: {
        type:mongoose.Types.ObjectId,
        ref:'OrderDetails'
    },
    invoiceNo: {
        type: String,
        required:true
    }
}, {timestamps:true})

module.exports = mongoose.model('Invoice', InvoiceSchema)
