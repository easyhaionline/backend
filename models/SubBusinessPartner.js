const {Schema, model, Types} = require("mongoose")
const bcrypt = require("bcryptjs")
const SubBusinessPartnerSchema = new Schema({
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
    retailer:[{
        type: Types.ObjectId,
        ref: "Retailer"
    }],
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
    },
    businessPartner:{
        type: Types.ObjectId,
        ref: "BusinessPartner",
        required: true,
    },
    referralCode:{
        type: String,
        required: true
    },
    accountname:{
        type: String,
        required: true,
    },
    accountnumber:{
        type: Number,
        required: true,
    },
    typeofaccount:{
        type: String,
        required: true,
    },
    ifsccode:{
        type: String,
        required: true,
    },
})
SubBusinessPartnerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
// to hash the password before saving to the database
SubBusinessPartnerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(13)
    this.password = await bcrypt.hash(this.password, salt)
})
module.exports = new model("SubBusinessPartner" , SubBusinessPartnerSchema);