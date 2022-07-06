const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
    {
        card_icon_url: {
            type: String
        },

        title: {
            type: String
        },
        description: {
            type: String
        }
      
    },
    { timestamps: true }
);

module.exports = mongoose.model('Card', cardSchema);