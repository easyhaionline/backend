const asyncHandler = require('express-async-handler')

const Subject = require('../models/Subject')
const validateMongoID = require('../validators/id')
const validateSubjectInputs = require('../validators/subject')
const validateTypeRequire = require('../validators/type-require.js')

// to create a new Subject ********************************************************
const subjectCreate = asyncHandler(async (req, res) => {
    const { name, teachers, standard,chapters,course } = req.body

    const { isValid, message } = validateSubjectInputs(req.body)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }

    const newSubject = await Subject.create({
        name,
        teachers,
        standard,
        chapters,
        course
    })

    if (newSubject) {
        res.status(200).json({
            message: 'Subject created successfully!',
            data: newSubject,
        })
    } else {
        res.status(500)
        throw new Error("New Subject can't be created at the moment! Try again later.")
    }
})

// to fetch all subjects available *******************************************************
const subjectGetAll = asyncHandler(async (_, res) => {
    const foundSubjects = await Subject.find().populate("standard","_id name").populate("chapters","_id name").populate("teachers","_id username email").sort({ createdAt: -1 }).populate(
        "chapters",
        "_id name"
    )

    res.status(200).json(foundSubjects)
})

const subjectGetById = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  console.log(_id)
   await Subject.findById(_id).populate("chapters","_id name").exec((err,data)=>{
    if (err) {
      return res.json({
        error: err,
      });
    }
    res.status(200).json(data)
   })
})

const subjectGetByStandard = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  console.log(_id)
   await Subject.find({standard : _id}).populate('chapters').exec((err,data)=>{
    if (err) {
      return res.json({
        error: err,
      });
    }
    console.log("I am data", data);
    res.status(200).json(data)
   })
})

const Subjectremove =asyncHandler(async  (req, res) => {
    const _id = req.params.id;
    console.log(_id);
   await Subject.findByIdAndDelete(_id).exec((err, data) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      res.json({ message: "Subject  Deleted Successfully",data:{_id} });
    });
  })


// to fetch all active subjects on the site *******************************************************
const subjectGetActive = asyncHandler(async (_, res) => {
    const foundSubjects = await Subject.find({ isActive: true })
        .sort({ createdAt: -1 }).populate("chapters","_id name").populate("standard","_id name").populate("teachers","_id username email")
        .populate({
            path: 'standard',
            select: 'name',
        })

    res.status(200).json(foundSubjects)
})

// to toggle the state of subject **************************************************************
const subjectToggle = asyncHandler(async (req, res) => {
    const { subjectID } = req.params

    const { isValid, message } = validateMongoID(subjectID)
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }

    const foundSubjectToToggle = await Subject.findOne({ _id: subjectID })

    if (foundSubjectToToggle) {
        foundSubjectToToggle.isActive = foundSubjectToToggle.isActive ? false : true
        foundSubjectToToggle.save()

        res.status(200).json({
            message: foundSubjectToToggle.isActive
                ? 'Subject Activated!'
                : 'Subject Deactivated!',data:foundSubjectToToggle
        })
    } else {
        res.status(404)
        throw new Error('Subject not found!')
    }
})

// to update the subject **************************************************************
const subjectUpdate = asyncHandler(async (req, res) => {
    const { name, standard, teachers,chapters,course } = req.body
    console.log(req.body)
    const demo = { name, standard, teachers,chapters };

    const _id = req.params.id

    const { isValid: isValidID, message: messageID } = validateMongoID(_id)
    if (!isValidID) {
        res.status(400)
        throw new Error(messageID)
    }

    const { isValid, message } = validateSubjectInputs(demo);
    if (!isValid) {
        res.status(400)
        throw new Error(message)
    }

    const foundSubject = await Subject.findOne({ _id })
    if (!foundSubject) {
        res.status(404)
        throw new Error('No such Subject exists!')
    }

    if (name) foundSubject.name = name
    if (standard) foundSubject.standard = standard
    if (teachers) foundSubject.teachers = teachers
    if(chapters) foundSubject.chapters = chapters
    if(course) foundSubject.course = course
    foundSubject.save()
    res.status(200).json({
        message: 'Subject updated successfully!',
        data: foundSubject,
    })
})

const statusUpdate = async(req,res)=>{
    const id = req.params.id;
    const {status} = req.body;
    try {
        const resposne = await Subject.findByIdAndUpdate(id, { isActive :status});
        if (resposne) {
          res.send(resposne);
        }
    } catch (error) {  
    }

}


// to update the chapters **************************************************************
const addingChapter = async (req, res) => {
    const id = req.params.id;
    const { chapters } = req.body;
    await Subject.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $push: {
          chapters: chapters,
        },
      }
    ).then((data, err) => {
      if (err) {
        res.json(err);
      }
      res.json(data);
    });
  };
  
  const removingChapter = async (req, res) => {
    const id = req.params.id;
    const { chapterid } = req.body;
    await Subject.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $pull: {
          chapters: { _id: chapterid }
        },
      }
    ).then((data, err) => {
      if (err) {
        res.json(err);
      }
      res.json(data);
    });
  };
  

module.exports = {
  subjectCreate,
  subjectGetAll,
  subjectGetActive,
  subjectToggle,
  subjectUpdate,
  Subjectremove,
  statusUpdate,
  addingChapter,
  removingChapter,
  subjectGetById,
  subjectGetByStandard
};