const {Schema, model, Types} = require("mongoose")


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
    students:[],
    businessPartner:{
        type: Types.ObjectId,
        ref: "BusinessPartner",
        required: true,
    },
    referralCode:{
        type: String,
        required: true
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