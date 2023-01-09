const mongoose = require('mongoose');

const BusinessPartnerLogSchema = new mongoose.Schema({
    businesspartnerId: {
        type: mongoose.Types.ObjectId,
        ref: 'BusinessPartner',
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

module.exports = mongoose.model("BusinessPartnerlog",BusinessPartnerLogSchema)