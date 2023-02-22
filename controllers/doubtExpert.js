const asyncHandler = require('express-async-handler');
const Doubt = require('../models/DoubtExpert');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

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
        const studentModel = await Student.findByIdAndUpdate(student);
        studentModel.doubtCredits = studentModel.doubtCredits-1;
        await studentModel.save();
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
    
    Doubt.findById({_id})
    .populate({
      path: 'student',
      select: '_id username image email',
    })
    .populate({
        path: 'teacher',
        select: '_id username image email',
      })
    .populate({
        path: 'doubtReply.teacher',
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
        doubtId,
        teacher,
        reply,
        link,
    } = req.body;

    const data = {
        teacher, reply, link
    }

    try{
        const doubt = await Doubt.findByIdAndUpdate(doubtId);
        doubt.doubtReply.push(data);
        doubt.attempt = doubt.attempt+1;
        await doubt.save();
        if(doubt.attempt>2){
            doubt.teacher = null;
            await doubt.save();
            console.log("I am updated doubt", doubt);
        }
    } catch (err){
    console.error(err);
}})

const satisfied = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    try{
        const doubt = await Doubt.findByIdAndUpdate({_id})     
        doubt.isStudentSatisfied = true;
        doubt.isResolved = true;
        console.log("I am doubt", doubt);
            const teacherCreditsUpdate = await Teacher.findByIdAndUpdate(doubt.teacher);
            teacherCreditsUpdate.doubtCredits = teacherCreditsUpdate.doubtCredits + 1;
            await teacherCreditsUpdate.save();
            console.log("I am teacher", teacherCreditsUpdate);
        await doubt.save();
        res.status(200);
    } catch (err){
    console.error(err);
}
})

const dissatisfied = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    try{
        const doubt = await Doubt.findByIdAndUpdate({_id})     
        doubt.isStudentSatisfied = false;
        doubt.isResolved = false;
        doubt.teacher = null;
        await doubt.save();
        res.status(200);
    } catch (err){
    console.error(err);
} 
})

const doubtCredits = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    var credits;

    const studentCredits = Student.findById({_id}).select('doubtCredits').exec((error, data)=>{
        if(data){
            credits = data.doubtCredits;
            res.status(200).json({data: credits})
        } else{
            return console.log("I am error in Student Credits: ",error);
        } 
    })
    const teacherCredits = Teacher.findById({_id}).select('doubtCredits').exec((error, data)=>{
        if(data){
            credits = data.doubtCredits;
            console.log("I am credits in teacher", credits);
            res.status(200).json({data: credits})
        } else{
            return console.log("I am error in Teacher Credits: ",error);
        } 
    })
});

const getTeacherList = asyncHandler(async (req, res) => {
    Teacher.find()
        .sort({
          createdAt: -1,
        })
        .select('username email image phone doubtCredits')
        .exec((error, data)=>{
            if(data){
                return res.status(200).json({data})
            } else{
                return console.log("I am error: ",error);
            } 
        }) 
});

const clearBalance = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    try{
        const teacher = await Teacher.findByIdAndUpdate({_id})      
        teacher.doubtCredits = 0;
        await teacher.save();
    } catch (err){
    console.error(err);
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
  doubtReply,
  satisfied,
  dissatisfied,
  doubtCredits,
  getTeacherList,
  clearBalance
};
