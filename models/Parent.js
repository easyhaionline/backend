const { Schema, model,Types } = require('mongoose')
const bcrypt = require('bcryptjs')

const parentSchema = new Schema(
    {
        username: {
            type: String,
            // required: true,
            unique: true,
        },
        email: {
            type: String,
            // required: true,
            // unique: true,
        },
        image: {
            type: String,
        },
        student:{
            type: Types.ObjectId,
            ref: "Student", 

        },
        role:{
            type:Number,
            default:3
        },
        number:{
            type:Number,
            default:""
            // unique:true
        },
        password: {
            type: String,
            // required: true,
        },
        resetPasswordLink: {
            data: String,
            default: ''
        },
        encryption:{
           type: String,
            default: ''
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
parentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
// to hash the password before saving to the database
parentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(13)
    this.password = await bcrypt.hash(this.password, salt)
})
module.exports = new model('Parent', parentSchema)
