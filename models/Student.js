const { Schema, model, Types } = require('mongoose')
const ChatUser = require('./chatUser')
const bcrypt = require('bcryptjs')
const studentSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        number:{
            type:Number
        },
        image: {
            type: String 
        },
        encryption:{
            type: String,
             default: ''
         },
        email: {
            type: String
        },
        isPhoneVerified: {
            type: Boolean,
            default: false,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String
        },
        resetPasswordLink: {
            data: String,
            default: ''
        },
        standard: {
            type: Types.ObjectId,
            ref: 'Standard',
        },
        courses:[{
            type: Types.ObjectId,
            ref: "Course", 
            default:[]
        }],
        freeTrial: {
            type: Boolean,
            default: false,
        },
        role:{
            type:Number,
            default:0
                    },
        isActive: {
            type: Boolean,
            default: true,
        },
        doubtCredits: {
            type:Number,
            default:0
        }
    },
    {
        timestamps: true,
    }
)


// to match the provided password with the password saved in the database
studentSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// to hash the password before saving to the database
studentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(13)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = new model('Student', studentSchema)
