const asyncHandler = require('express-async-handler')

const Standard = require('../models/Standard')
const validateMongoID = require('../validators/id')
const validateTypeRequire = require('../validators/type-require.js')

// to create a new Standard ********************************************************
const standardCreate = asyncHandler(async (req, res) => {
    const { name,examtype,course } = req.body

    const { isValid, message } = validateTypeRequire('string', 'Name', name)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }
    else{
        const { isValid, message } = validateMongoID(examtype)
        if (!isValid) {
            res.status(401)
            throw new Error(message)
        }
    
    }

  

   
    const newStandard = await Standard.create({
        name,examtype,course
    })

    if (newStandard) {
        res.status(200).json({
            message: 'Standard created successfully!',
            data: newStandard,
        })
    } else {
        res.status(500)
        throw new Error("New Grade can't be created at the moment! Try again later.")
    }
})

const Standardremove =asyncHandler(async  (req, res) => {
    const _id = req.params.id;
    console.log(_id);
   await Standard.findByIdAndDelete(_id).exec((err, data) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      res.json({ message: "Standard  Deleted Successfully",data:{_id} });
    });
  })
  

// to fetch all standards available *******************************************************
const standardGetAll = asyncHandler(async (_, res) => {
    const foundStandards = await Standard.find().populate("examtype","name _id").populate("course","name _id").sort({ createdAt: -1 })

    res.status(200).json(foundStandards)
})

// to fetch all active standards on the site *******************************************************
const standardGetActive = asyncHandler(async (_, res) => {
    const foundStandards = await Standard.find({ isActive: true }).populate("examtype","name _id").populate("course","name _id").sort({ createdAt: -1 })

    res.status(200).json(foundStandards)
})

// to toggle the state of standard **************************************************************
const standardToggle = asyncHandler(async (req, res) => {
    const { standardID } = req.params

    const { isValid, message } = validateMongoID(standardID)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }

    const foundStandardToToggle = await Standard.findOne({ _id: standardID })

    if (foundStandardToToggle) {
        foundStandardToToggle.isActive = foundStandardToToggle.isActive ? false : true
        foundStandardToToggle.save()

        res.status(200).json({
            message: foundStandardToToggle.isActive
                ? 'Standard Activated!'
                : 'Standard Deactivated!', data:{foundStandardToToggle}
        })
    } else {
        res.status(404)
        throw new Error('Standard not found!')
    }
})



const StandardById= asyncHandler(async (req, res) => {
    const {id } =req.params;
    const foundExam = await Standard.findById( id)
        .sort({ createdAt: -1 })
        .populate("examtype","name _id").populate("course","name _id topicArn")

    res.status(200).json(foundExam)
})


// to update the standard **************************************************************
const standardUpdate = asyncHandler(async (req, res) => {
    const { _id, name ,examtype ,course } = req.body

    const { isValid: isValidID, message: messageID } = validateMongoID(_id)
    if (!isValidID) {
        res.status(400)
        throw new Error(messageID)
    }
    const { isValid, message } = validateTypeRequire('string', 'Name', name)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }

    const foundStandard = await Standard.findOne({ _id })
    if (!foundStandard) {
        res.status(404)
        throw new Error('No such Standard exists!')
    }

    if (name) foundStandard.name = name
    if (examtype) foundStandard.examtype = examtype
 if(course) foundStandard.course=course
    foundStandard.save()

    res.status(200).json({
        message: 'Standard updated successfully!',
        data: foundStandard,
    })
})

const searchStandard = async (req,res)=>{
    console.log(req.params.key)
    const standard= await Standard.find({
      $or:[
        {
          name: { $regex: req.params.key, $options: 'i' }
        }
      ]
    }).populate("examtype","name")
    try{
      if(standard){
        return res.status(201).json({standard});
      }
    }
    catch(error){
      return res.json({error})
    }
  }

module.exports = {
    standardCreate,
    standardGetAll,
    standardGetActive,
    standardToggle,
    standardUpdate,
    Standardremove,
    StandardById,
    searchStandard
}
