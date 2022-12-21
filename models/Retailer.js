const {Schema, model, Types} = require("mongoose")
const bcrypt = require("bcryptjs")
const RetailerSchema = new Schema({
    name:{
        type: String,
        requird: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    student:[{
        type: Types.ObjectId,
        ref: "Student"
    }],
    subBusinessPartner:{
        type: Types.ObjectId,
        ref: "SubBusinessPartner",
        required: true,
    },
    referralCode:{
        type: String,
        required: true
    },
    pan: {
        type: String,
        required: true,
        unique: true
    },
    aadhar: {
        type: String,
        required: true,
        unique: true
    },
    panlink:{
        type: String
    },
    aadharlink: {
        type: String,
    }
})
RetailerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
// to hash the password before saving to the database
RetailerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(13)
    this.password = await bcrypt.hash(this.password, salt)
})
module.exports = new model("Retailer" , RetailerSchema);