const { Schema, model } = require('mongoose')

const noticeSchema= new Schema(
    {
    title : {
        type: String,
        required: true,
    },
    link : {
        type: String,
        required: true,
    },
},{ timestamps: true }) 

module.exports = new model('Notice', noticeSchema)