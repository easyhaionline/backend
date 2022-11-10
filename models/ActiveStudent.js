const {Schema, model , Types} = require('mongoose');

const activeStudentSchema = new Schema({
    user_email:{
        type: String,
        required: true,
        unique: true
    },
    isActive:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});


module.exports = new model("ActiveStudent" , activeStudentSchema);