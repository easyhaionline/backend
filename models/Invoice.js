const mongoose = require('mongoose')

const InvoiceSchema = new mongoose.Schema({
    invoice: {
        type:mongoose.Types.ObjectId,
        ref:'OrderDetails'
    },
    invoiceNo: {
        type: String,
        required:true
    },
    // item:{
    //     type:String
    // }
}, {timestamps:true})

module.exports = mongoose.model('Invoice', InvoiceSchema)
