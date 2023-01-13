const mongoose = require('mongoose');

const RetailerLogSchema = new mongoose.Schema({
    retailerId: {
        type: mongoose.Types.ObjectId,
        ref: 'Retailer',
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

module.exports = mongoose.model("Retailerlog",RetailerLogSchema)