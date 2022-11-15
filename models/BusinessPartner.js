const {Schema, model} = require("mongoose")
const bcrypt = require('bcryptjs')

const BusinessPartnerSchema = new Schema({
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
    subBusinessPartner:[],
    referralCode:{
        type: String,
        required: true
    },

})


// to match the provided password with the password saved in the database
BusinessPartnerSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// to hash the password before saving to the database
BusinessPartnerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(13)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = new model("BusinessPartner" , BusinessPartnerSchema);