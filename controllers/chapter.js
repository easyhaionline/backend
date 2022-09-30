const asyncHandler = require('express-async-handler')

const Chapter = require('../models/Chapter')
const validateChapterInputs = require('../validators/chapter')
const validateMongoID = require('../validators/subject')
const validateTypeRequire = require('../validators/type-require.js')

// to create a new chapter ********************************************************
const chapterCreate = asyncHandler(async (req, res) => {
    const { name, subject,  chapterNumber ,topics } = req.body;
    
    const newChapter = await Chapter.create({
      name,
      subject,   
      topics
    });

    if (newChapter) {
        res.status(200).json({
            message: 'Chapter created successfully!',
            data: newChapter,
        })
    } else {
        res.status(500)
        throw new Error("New Chapter can't be created at the moment! Try again later.")
    }
})

// to fetch all chapters available *******************************************************
const chapterGetAll = asyncHandler(async (_, res) => {
    const foundChapters = await Chapter.find()
      .sort({ createdAt: -1 })
      .populate("topics", "_id name")
      .populate("subject","_id name")
    

    res.status(200).json(foundChapters)
})

const chapterGetById = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  await Chapter.findById(_id).populate({
    path: 'standard',
    select: 'title',
}) .populate("topics", "_id name").exec((err,data)=>{
    if (err) {
      return res.json({
        error: err,
      });
    }
    res.status(200).json(data)
   })

})

// to fetch all active chapters on the site *******************************************************
const chapterGetActive = asyncHandler(async (_, res) => {
    const foundChapters = await Chapter.find({ isActive: true })
      .sort({ createdAt: -1 })
      .populate("topics", "_id name")
console.log(foundChapters)
    res.status(200).json(foundChapters)
})

// to toggle the state of chapter **************************************************************
const chapterToggle = asyncHandler(async (req, res) => {
    const { chapterID } = req.params

    const {status} =  req.body;


    try {
    const response = await Chapter.findByIdAndUpdate(
      chapterID,
      { isActive:status },
      { new: true }
    );
        if(response)
            res.send(response)
    } catch (error) {
            res.status(422).send(error);
        
    }
})

// to update the chapter **************************************************************
const chapterUpdate = asyncHandler(async (req, res) => {
    const {  name, subject, chapterNumber,topics } = req.body
    const _id = req.params.id;
    const foundChapter = await Chapter.findOne({ _id })
    if (!foundChapter) {
        res.status(404)
        throw new Error('No such Chapter exists!')
    }

    if (name) foundChapter.name = name
    if (subject) foundChapter.subject = subject
    if (chapterNumber) foundChapter.chapterNumber = chapterNumber;
    if (topics) foundChapter.topics = topics;

    foundChapter.save()

    res.status(200).json({
        message: 'Chapter updated successfully!',
        data: foundChapter,
    })
})
const chapterRemove = async (req, res) => {
  const _id = req.params.id;
  await Chapter.findByIdAndDelete(_id).exec((err, data) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    res.json({ message: "Chapter  Deleted Successfully", data: { _id } });
  });
};

// to update the topics **************************************************************

const addingtopic = async (req, res) => {
    const id = req.params.id;
    const { topic } = req.body;
    await Chapter.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $push: {
          topics: topic,
        },
      }
    ).then((data, err) => {
      if (err) {
        res.json(err);
      }
      res.json(data);
    });
  };
  
  const removingtopic = async (req, res) => {
    const id = req.params.id;
    const { topicid } = req.body;
    await Chapter.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $pull: {
          topics: { _id: topicid }
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
    chapterCreate,
    chapterGetAll,
    chapterGetActive,
    chapterToggle,
    chapterUpdate,
    chapterRemove,
    addingtopic,
    removingtopic,
    chapterGetById
}
