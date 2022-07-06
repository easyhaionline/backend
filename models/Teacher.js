const { Schema, model, Types } = require('mongoose')
const bcrypt = require('bcryptjs')

const teacherSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            // required: true,
        },
        role:{
            type:Number,
            default:0
                    },
                    isSuper: {
                        type: Boolean,
                        required: true,
                        default: false,
                    },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        subject: {
            type: Types.ObjectId,
            ref: 'Subject',
        },
        password: {
            type: String,
            required: true,
        },
        
        resetPasswordLink: {
            data: String,
            default: ''
        },
        encryption:{
           type: String,
            default: ''
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
teacherSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// to hash the password before saving to the database
teacherSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(13)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = new model('Teacher', teacherSchema)
