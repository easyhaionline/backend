const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema(
    {
        pricingurl: {
            type: String
        },
        title: {
            type: String
        },
        description: {
            type: String
        },
        point_one: {
            type: String
        },
        point_two: {
            type: String
        },
        point_three: {
            type: String
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model('Pricing', pricingSchema);