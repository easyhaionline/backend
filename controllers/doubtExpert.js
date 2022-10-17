const asyncHandler = require('express-async-handler');
const Doubt = require('../models/DoubtExpert');
const Reply = require('../models/DoubtReply');

const doubtCreate = asyncHandler(async (req, res) => {
    const {
        student,
        question,
        examType,
        link
    } = req.body;

    const teacher = null;
    const isResolved = false;

    const newDoubt = await Doubt.create({
        student,
        question,
        examType,
        link,
        teacher,
        isResolved
    });

    if (newDoubt) {
        res.status(200).json({
            message: 'Your Doubt has been created!',
            data: newDoubt,
        })
    } else {
        res.status(500)
        throw new Error("New Doubt can't be created at the moment! Try again later.")
    }
})

const getNewDoubt = asyncHandler(async (req, res) => {
    const {
        skip,
        limit
    } = req.body

    Doubt.find()
        .where({teacher: null})
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'student',
          select: '_id username image',
        })
        .exec((error, data)=>{
            if(data){
                return res.status(200).json({data: data})
            } else return res.status(400).json({error: error})
        })
});

const takeThisDoubt = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    try{
        const doubt = await Doubt.findByIdAndUpdate({_id})
        const { teacher } = req.body;       
        doubt.teacher = teacher;
        await doubt.save();
    } catch (err){
    console.error(err);
}
})

const getStudentDoubt = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    const {
        skip,
        limit
    } = req.body

    console.log("I am id", _id);
    console.log("I am body", skip, limit);

    Doubt.find()
        .where({student: _id})
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'student',
          select: '_id username image',
        })
        .populate({
            path: 'teacher',
            select: '_id username image',
          })
        .exec((error, data)=>{
            if(data){
                return res.status(200).json({data: data})
            } else{
                return console.log("I am error: ",error);
            } 
        })
});

const getTeacherDoubt = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    const {
        skip,
        limit
    } = req.body

    console.log("I am id", _id);
    console.log("I am body", skip, limit);

    Doubt.find()
        .where({teacher: _id})
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'student',
          select: '_id username image',
        })
        .populate({
            path: 'teacher',
            select: '_id username image',
          })
        .exec((error, data)=>{
            if(data){
                return res.status(200).json({data: data})
            } else{
                return console.log("I am error: ",error);
            } 
        })
});

const getAllDoubts = asyncHandler(async (req, res) => {
    const {
        skip,
        limit
    } = req.body

    console.log("I am body", skip, limit);

    Doubt.find()
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'student',
          select: '_id username image',
        })
        .populate({
            path: 'teacher',
            select: '_id username image',
          })
        .exec((error, data)=>{
            if(data){
                return res.status(200).json({data: data})
            } else{
                return console.log("I am error: ",error);
            } 
        }) 
});

const getSingleDoubt = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    console.log("I am id", _id);
    
    Doubt.findById({_id})
    .populate({
      path: 'student',
      select: '_id username image',
    })
    .populate({
        path: 'teacher',
        select: '_id username image',
      })
    .exec((error, data)=>{
        if(data){
            return res.status(200).json({data: data})
        } else{
            return console.log("I am error: ",error);
        } 
    })
});

const doubtReply = asyncHandler(async (req, res) => {
    const {
        teacher,
        reply,
        link,
        doubtReply
    } = req.body;

    console.log(`I am teacher: ${teacher}, reply: ${reply}, link: ${link}, doubtReply: ${doubtReply}`);

    try{
        const doubt = await Doubt.find().where({doubtReply: doubtReply});
        if(doubt){
            const doubtReply = Reply.findByIdAndUpdate({doubtReply});
            doubtReply.reply.push({answer: reply, link: link});
            await doubtReply.save();
            // res.status(200).json({
            //     message: 'Your Reply has been updated!',
            //     data: newReply,
            // })
        }
    } catch (err){
        // res.status(400).json({
        //     message: "New Reply can't be created at the moment! Try again later.",
        //     error: err
        // })
        console.log("I am error", err);
    }

    const newReply = await Reply.create({
        teacher,
        "reply.answer" : reply,
        "reply.link" : link,
    });

    if (newReply) {
        res.status(200).json({
            message: 'Your Reply has been created!',
            data: newReply,
        })
    } else {
        res.status(400)
        throw new Error("New Reply can't be created at the moment! Try again later.")
    }
})

module.exports = {
  doubtCreate,
  getNewDoubt,
  takeThisDoubt,
  getStudentDoubt,
  getTeacherDoubt,
  getAllDoubts,
  getSingleDoubt,
  doubtReply
};
