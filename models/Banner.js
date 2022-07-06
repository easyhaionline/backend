const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const bannerSchema = new mongoose.Schema(
    {
        bannerUrl: {
            type: String
        },
     
    },
    { timestamps: true }
);

module.exports = mongoose.model('Banner', bannerSchema);