const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    invoice: {
        type:mongoose.Types.ObjectId,
        ref:'OrderDetails'
    }
}, {timestamps:true})

module.exports = mongoose.model('Invoice', invoiceSchema)
