const { Schema, model,Types } = require('mongoose')
const bcrypt = require('bcryptjs')

const adminSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
        },
        image: {
            type: String,   
        },
        role:{
            type:Number,
            default:0
        },
        number:{
            type:Number,
            unique:true
        },
        password: {
            type: String,
        },
        resetPasswordLink: {
            data: String,
            default: ''
        },
        encryption:{
           type: String,
            default: ''
        },
        student:{
            type: Types.ObjectId,
            ref: "Admin", 
          
        },

        courses:[{
            type: Types.ObjectId,
            ref: "Course", 
            default:[]
        }],
        isSuper: {
            type: Boolean,
            required: true,
            default: false,
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    { timestamps: true }
)

// to match the provided password with the password saved in the database
adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// to hash the password before saving to the database
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(13)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = new model('Admin', adminSchema);
