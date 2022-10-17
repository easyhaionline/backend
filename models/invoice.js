const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    invoice: {
        type:mongoose.Types.ObjectId,
        ref:'OrderDetails'
    }
})

module.exports = mongoose.model('Invoice', invoiceSchema)
