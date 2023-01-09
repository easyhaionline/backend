const mongoose = require('mongoose');

const SubBusinessPartnerLogSchema = new mongoose.Schema({
    subbusinesspartnerId: {
        type: mongoose.Types.ObjectId,
        ref: 'SubBusinessPartner',
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

module.exports = mongoose.model("SubBusinessPartnerlog",SubBusinessPartnerLogSchema)