const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')

const chatUserSchema = new mongoose.Schema({
    _id: {
        type:mongoose.Types.ObjectId,
        required:true
    },
    username:{
        type:String,
        required:true
    }
}, { timestamps: true })


// // to match the provided password with the password saved in the database
// studentSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password)
// }

// // to hash the password before saving to the database
// studentSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next()
//     }

//     const salt = await bcrypt.genSalt(13)
//     this.password = await bcrypt.hash(this.password, salt)
// })

module.exports = new mongoose.model('chatuser', chatUserSchema)
