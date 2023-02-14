const { Schema, model, Types } = require('mongoose')

const lectureSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            // required: true,
        },
        image:{
            type:String
        },
        standard: {
            type: Types.ObjectId,
            ref: 'Standard',
        },
        subject: {
            type: Types.ObjectId,
            ref: 'Subject',
        },
        filter:{
            type:String
        },
        chapter: {
            type: Types.ObjectId,
            ref: 'chapters',
        },
        course:{
            type: Types.ObjectId,
            ref: "Course", 
            default:[]
        },
        examtype: {
            type: Types.ObjectId,
            ref: 'ExamType',
        },
        topic: {
            type: String,
        },
        description:{
            type:String
        },
        practiceTests: [
            {
                type: Types.ObjectId,
                ref: 'Test',
            },
        ],
        type: {
            type: String,
            enum: ['LIVE', 'RECORDED', 'ZOOM', "TEAMS"],
            required: true,
        },
        startingdate:{
            type:String
        },
        endingdate:{
            type:String
        },
        duration:{
            type: String
        },
        startingtime:{
            type:String
        },
        endingtime:{
            type:String
        },
        zoomid : {
            type: String
        }, 
        zoomPass : {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

module.exports = new model('Lecture', lectureSchema)
