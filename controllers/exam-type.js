const asyncHandler = require('express-async-handler')
const ExamType = require('../models/Exam-Type')



const validateExamInputs = require('../validators/exam-type')

const validateMongoID = require('../validators/subject')


// to create a new Exams ********************************************************
const ExamTypeCreate = asyncHandler(async (req, res) => {
    const { name ,standard} = req.body

    const { isValid, message } = validateExamInputs(req.body)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }

    const newExam = await ExamType.create({
        name ,
        standard
       
    })

    if (newExam) {
        res.status(200).json({
            message: 'ExamType created successfully!',
            data: newExam,
        })
    } else {
        res.status(500)
        throw new Error("New ExamType can't be created at the moment! Try again later.")
    }
})

// to fetch all exams available *******************************************************
const ExamTypeGetAll = asyncHandler(async (_, res) => {
    const foundExam = await ExamType.find().sort({ createdAt: -1 }).populate({
        path: 'standard',
        select: 'name',
    })

    res.status(200).json(foundExam)
})

// to fetch all active exams on the site *******************************************************
const ExamTypeGetActive = asyncHandler(async (_, res) => {
    const foundExam = await ExamType.find({ isActive: true })
        .sort({ createdAt: -1 })
        .populate({
            path: 'standard',
            select: 'name',
        })

    res.status(200).json(foundExam)
})

const ExamTypeById= asyncHandler(async (req, res) => {
    const {id } =req.params;
    const foundExam = await ExamType.findById( id)
        .sort({ createdAt: -1 })
        .populate({
            path: 'standard',
            select: 'name',
        })

    res.status(200).json(foundExam)
})

// to toggle the state of exam **************************************************************
const ExamToggle = asyncHandler(async (req, res) => {
    const { examID } = req.params

    // const { isValid, message } = validateMongoID(examID)
    // if (!isValid) {
    //     res.status(400)
    //     throw new Error(message)
    // }

    const foundExamToToggle = await ExamType.findOne({ _id: examID })

    if (foundExamToToggle) {
        foundExamToToggle.isActive = foundExamToToggle.isActive ? false : true
        foundExamToToggle.save()

        res.status(200).json({
            message: foundExamToToggle.isActive
                ? 'Exam Activated!'
                : 'Exam Deactivated!', data:{foundExamToToggle}
        })
    } else {
        res.status(404)
        throw new Error('Exam not found!')
    }
})

const Examremove =asyncHandler(async  (req, res) => {
    const id = req.params.id;
    console.log(id);
   await ExamType.findByIdAndDelete(id).exec((err, data) => {
      if (err) {
        return res.json({
          err,
        });
      }
      res.json({ message: "Exam  Deleted Successfully",data:{id} });
    });
  })
  


// to update the Exam **************************************************************
const ExamUpdate = asyncHandler(async (req, res) => {
    const { _id, name ,standard} = req.body

    // const { isValid: isValidID, message: messageID } = validateMongoID(_id)
    // if (!isValidID) {
    //     res.status(404)
    //     throw new Error(messageID)
    // }
    const { isValid, message } = validateExamInputs(req.body)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }

    const foundExam = await ExamType.findOne({ _id })
    if (!foundExam) {
        res.status(404)
        throw new Error('No such Exam exists!')
    }

    if (name) foundExam.name = name
   if(standard) foundExam.standard = standard

    foundExam.save()

    res.status(200).json({
        message: 'Exam updated successfully!',
        data: foundExam,
    })
})

module.exports = {
    ExamTypeCreate,
    ExamTypeGetAll,
    ExamTypeGetActive,
    ExamToggle,
    ExamUpdate,
    ExamTypeById,
    Examremove
}
