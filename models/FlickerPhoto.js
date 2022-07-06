const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const flickerPhotoSchema = new mongoose.Schema(
    {
        photos_url: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('FlickerPhoto', flickerPhotoSchema);