const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema(
    {
        about: {
            type: String,

        },
       
    
        heading1: {
            type: String,
        },

        headingList: [
            {
                Link: {
                    type: String
                },
                Head: {
                    type: String
                }
            }
        ],

        heading2: {
            type: String,
        },
        heading2_number: {
            type: String
        },
        heading2_email: {
            type: String
        },
        heading3: {
            type: String,
        },
        iconlink1: {
            type: String,
        },
        iconlink2: {
            type: String,
        },
        iconlink3: {
            type: String,
        },
        iconlink4: {
            type: String,
        },
        iconlink5: {
            type: String,
        },
        iconlink6: {
            type: String,
        },
     
    },
    { timestamps: true }
);

module.exports = mongoose.model('Footer', footerSchema);