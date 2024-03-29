const asyncHandler = require('express-async-handler')
const Lecture = require('../models/Lecture')
const Course = require('../models/Course')
const Student = require('../models/Student')
const validateMongoID = require('../validators/id')
const validateLectureInputs = require('../validators/lecture')
const axios = require('axios')


// to create a new lecture ********************************************************
const lectureCreate = asyncHandler(async (req, res) => {
    const { title,createdBy ,link, image, filter, standard, subject,examtype,startingdate, endingdate,startingtime,endingtime,duration, topic, practiceTests, type , zoomDetials,description,chapter,course } =req.body;
    let data = {};
    if(filter === "ZOOM"){
        let zoomid = zoomDetials.id;
        let zoomPass = zoomDetials.password;
        data = { title,createdBy, link, image, filter, standard,examtype, subject,startingdate, endingdate,startingtime,endingtime,duration, topic, practiceTests, type , zoomid, zoomPass,description,chapter,course };
    } 
    else if(filter === "TEAMS") {
        data = { title, link, filter, image,  standard,examtype, subject,startingdate, endingdate,startingtime,endingtime,duration, topic, practiceTests, type ,description,chapter,course };
    }
    else {
        data = { title,createdBy, link, image, filter, standard,examtype, subject,startingdate, endingdate,startingtime,endingtime,duration, topic, practiceTests, type ,description,chapter,course }
    }
    const newLecture = await Lecture.create(data)
    if (newLecture) {
        res.status(200).json({
            message: 'Lecture created successfully!',
            data: newLecture,
        })
    } 
    else {
        res.status(500)
        throw new Error("New Lecture can't be created at the moment! Try again later.")
    }
})


// to fetch all lectures available *******************************************************
const lectureGetAll = asyncHandler(async (req, res) => {
    console.log("We are here");

    const foundLectures = await Lecture.find().populate("standard","_id name").populate("subject").populate("chapter","_id name").populate("examtype","_id name").sort({ createdAt: -1 })
    res.status(200).json(foundLectures)
})


const lectureSearch =asyncHandler(async (req, res) => {
 

        const { search } = req.params;
        console.log("scacas",req.query);    
        await Lecture.find(
            {
            $or: [
                { title: { $regex: search, $options: "i" } },
                
            ],type:"RECORDED"
            }).populate("standard","_id name").populate("subject").populate("chapter","_id name").populate("examtype","_id name").sort({
                createdAt: -1,
            }).then(( blogs) => {
                console.log(blogs);
                res.json(blogs);
            }
        )

    })
  

    const LivelectureSearch =asyncHandler(async (req, res) => {
        const { search } = req.params;
        await  Lecture.find({$or: [{ title: { $regex: search, $options: "i" } },],type:"LIVE"})
                    .populate("standard","_id name")
                    .populate("subject")
                    .populate("chapter","_id name")
                    .populate("examtype","_id name")
                    .sort({createdAt: -1,})
                    .then(( blogs) => {
                        res.json(blogs);
                    });
    
    })  


const listRelated = (req, res) => {
    console.log("We are here2");

    let limit = req.body.limit ? parseInt(req.body.limit) : 3;
    const { _id, categories } = req.body.blog; 
    Course.find({ _id: { $ne: _id }, categories: { $in: categories } })
          .limit(limit)
          .populate("postedBy", "_id name username profile photo")
          .select("title slug excerpt createdAt updatedAt")
          .exec((err, blogs) => {
                if (err) {
                    return res.status(400).json({
                        error: "Blogs not found",
                    });
                }
                res.json(blogs);
            });
};
  

const lectureLecturesByType = asyncHandler(async (req, res) => {
    console.log("We are here3");

    const type = req.params.type.toUpperCase()
    const foundLectures = await Lecture.find({ type }).populate("standard","_id name").populate("subject").populate("chapter","_id name").populate("examtype","_id name").sort({ createdAt: -1 })
    res.status(200).json(foundLectures)
})


const LiveLecturesFilter = asyncHandler(async (req, res) => {
    console.log("We are here4");

    const {examtype}  = req.params;
    const type ="LIVE"
    console.log(req.params.examtype);
    let foundComplaints;
    if(req.params.type == 'All'){
        foundComplaints = await Lecture.find().sort({
            createdAt: -1,
        }).populate("subject");                
    }
    else{
        foundComplaints = await Lecture.find().where({examtype:examtype, type:type}).sort({ createdAt: -1 }).populate("subject", "_id name");
    }
    res.status(200).json(foundComplaints)
})


const LiveLecturesSubjectFilter = asyncHandler(async (req, res) => {
    console.log("We are here5");

    const {subject, course}  = req.params;
    console.log(req.params.type); 

    let foundComplaints;
    // if(req.params.type == 'All'){
    //     foundComplaints = await Lecture.find().sort({createdAt: -1}).populate("subject", "_id name")              
    // }
    // else {
        foundComplaints = await Lecture.find({type:"LIVE"}).where({course:course, subject:subject}).sort({ createdAt: -1 }).populate("subject", "_id name");
    // }
    res.status(200).json(foundComplaints)
})


const RecordedLecturesSubjectFilter = asyncHandler(async (req, res) => {
    console.log("We are here5");

    const {subject}  = req.params;
    const {course}  = req.params;
    const type ="RECORDED";
    console.log(req.params.subject);
    let foundComplaints;
    if(req.params.type == 'All'){
        foundComplaints = await Lecture.find().sort({createdAt: -1}).populate("subject", "_id name");             
    }
    else {
        foundComplaints = await Lecture.find().where({subject:subject, type:type,course:course}).sort({ createdAt: -1 }).populate("subject", "_id name");
    }
    res.status(200).json(foundComplaints)
});


const RecordedLecturesFilter = asyncHandler(async (req, res) => {
    console.log("We are here6");

    const {examtype}  = req.params;
    const type ="RECORDED"
    console.log(req.params.examtype);
    let foundComplaints;
    if(req.params.type == 'All'){
        foundComplaints = await Lecture.find().sort({createdAt: -1});               
    }
    else {
        foundComplaints = await Lecture.find().where({examtype:examtype, type:type}).sort({ createdAt: -1 }).populate("subject", "_id name");
    }
    res.status(200).json(foundComplaints)
})


const lectureLecturesById = asyncHandler(async (req, res) => {
    console.log("We are here7");

    const id = req.params.id.toUpperCase()
    const foundLectures = await Lecture.findById(id).populate("standard","_id name").populate("subject", "_id name").populate("chapter","_id name").populate("examtype","_id name").sort({ createdAt: -1 })
    res.status(200).json(foundLectures)
})


// to fetch all active lectures available *******************************************************
const lectureGetActive = asyncHandler(async (req, res) => {
    const foundLectures = await Lecture.find({ isActive: true }).populate("standard","_id name").populate("subject", "_id name").populate("chapter","_id name").populate("examtype","_id name").sort({createdAt: -1})
    res.status(200).json(foundLectures)
})


const test =asyncHandler(async(req,res)=>{
    var mammoth = require("mammoth");
    mammoth.convertToHtml({path: "/home/dj/Downloads/vedic mathematics.docx"})
    .then(function(result){
        var html = result.value; // The generated HTML
        var messages = result.messages; // Any messages, such as warnings during conversion
        console.log(html)
        return html;
    })
    .done(function( result ){
        console.log('please',result);
        res.json(result)
    }); 
})


// to toggle the state of lecture **************************************************************
const lectureToggle = asyncHandler(async (req, res) => {
    const { lectureID } = req.params
    const { isValid, message } = validateMongoID(lectureID)
    if (!isValid) {
        res.status(400);
        throw new Error(message);
    }
    const foundLectureToToggle = await Lecture.findOne({ _id: lectureID })
    if (foundLectureToToggle) {
        foundLectureToToggle.isActive = foundLectureToToggle.isActive ? false : true
        foundLectureToToggle.save()
        res.status(200).json({
            message: foundLectureToToggle.isActive
                ? 'Lecture Activated!'
                : 'Lecture Deactivated!',
        })
    } 
    else {
        res.status(404)
        throw new Error('Lecture not found!')
    }
})


// to toggle the state of lecture **************************************************************
const lectureDelete = asyncHandler(async (req, res) => {
    const { lectureID } = req.params
    const { isValid, message } = validateMongoID(lectureID)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }
    const foundLectureToToggle = await Lecture.findByIdAndDelete({ _id: lectureID })
    if (foundLectureToToggle) {
        res.status(200).json(
        'deleted successfully'
        )
    } else {
        res.status(404)
        throw new Error('Lecture not found!')
    }
})


// to update the lecture **************************************************************
const lectureUpdate = asyncHandler(async (req, res) => {
    const { _id, name, link, standard, subject, chapter, topic, practiceTests, type ,course} =req.body;
    const { isValid: isValidID, message: messageID } = validateMongoID(_id)
    if (!isValidID) {
        res.status(400)
        throw new Error(messageID)
    }
    const { isValid, message } = validateLectureInputs(req.body)
    if (!isValid) {
        res.status(401)
        throw new Error(message)
    }
    const foundLecture = await Lecture.findOne({ _id })
    if (!foundLecture) {
        res.status(404)
        throw new Error('No such Lecture exists!')
    }
    if (name) foundLecture.name = name
    if (link) foundLecture.link = link
    if (standard) foundQuestion.standard = standard
    if (subject) foundQuestion.subject = subject
    if (chapter) foundQuestion.chapter = chapter
    if (topic) foundQuestion.topic = topic
    if (practiceTests) foundQuestion.practiceTests = practiceTests
    if (type) foundQuestion.type = type
    foundLecture.save()
    res.status(200).json({
        message: 'Lecture updated successfully!',
        data: foundLecture,
    })
})

const getbyZoomid = asyncHandler(async(req, res) => {
    const lecture = await Lecture.findOne({zoomid:req.params.id})
    res.json(lecture);
})


module.exports = {
    lectureCreate,
    lectureGetAll,
    lectureGetActive,
    lectureToggle,
    LiveLecturesFilter,
    RecordedLecturesFilter,
    lectureUpdate,
    lectureLecturesById,
    lectureDelete,
    lectureLecturesByType,
    RecordedLecturesSubjectFilter,
    LiveLecturesSubjectFilter,
    test,
    lectureSearch,
    LivelectureSearch,
    listRelated,
    getbyZoomid
}