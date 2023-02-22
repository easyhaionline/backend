const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose')
const CourseMaterial = require("../models/CourseMaterial");
const Topics = require("../models/topic");

// to create a new CourseMaterial ********************************************************
const courseMaterialCreate = asyncHandler(async (req, res) => {
  const { name, subtopic, content } = req.body;

  const newCourseMaterial = await CourseMaterial.create({
    name,
    subtopic,

    content,
  });

  if (newCourseMaterial) {
    res.status(200).json({
      message: "Course Material created successfully!",
      data: newCourseMaterial,
    });
  } else {
    res.status(500);
    throw new Error(
      "New Course Material can't be created at the moment! Try again later."
    );
  }
});

const courseMaterialUpdate = asyncHandler(async (req, res) => {
  const { name, subtopic, content } = req.body;
  const _id = req.params.id;
  
  const foundCourseMaterials = await CourseMaterial.findOne({ _id });
  if (!foundCourseMaterials) {
    res.status(404);
    throw new Error("No such CourseMaterial exists!");
  }
  console.log(content,content[0].type)

  if (name) foundCourseMaterials.name = name;
  if (subtopic) foundCourseMaterials.subtopic = subtopic;
  if (content[0].type!='') foundCourseMaterials.content = content;

  foundCourseMaterials.save();

  res.status(200).json({
    message: "CourseMaterial  updated successfully!",
    data: foundCourseMaterials,
  });
 
});

// to fetch all CourseMaterial available *******************************************************
const courseMaterialGetAll = asyncHandler(async (req, res) => {
  // const foundCourseMaterials = await CourseMaterial.find()
  const {skip,limit} = req.body
  const data = await CourseMaterial.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "standard",
      select: "title",
    })
    .populate("subtopic","_id name topic")
    .exec((error, data) => { 
      if (data) {
        return res.status(200).json({ data: data });
      } else {
        return console.log("I am error: ", error);
      }
    });
});

const courseMaterialGetById = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  await CourseMaterial.findById(_id)  .populate({
    path: "standard",
    select: "title",
  }).exec((err,data)=>{
    if (err) {
      return res.json({
        error: err,
      });
    }
    res.status(200).json(data)
   })

});

// to fetch all active CourseMaterial on the site *******************************************************
const courseMaterialGetActive = asyncHandler(async (_, res) => {
  const foundCourseMaterials = await Subtopic.find({ isActive: true })
    .sort({ createdAt: -1 })
    .populate({
      path: "standard",
      select: "title",
    });

  res.status(200).json(foundCourseMaterials);
});

// to toggle the state of Course Material **************************************************************
const courseMaterialToggle = asyncHandler(async (req, res) => {
  const { courseMaterialID } = req.params;

  const { status } = req.body;

  try {
    const response = await CourseMaterial.findByIdAndUpdate(
      courseMaterialID,
      { isActive: status },
      { new: true }
    );
    if (response) res.send(response);
  } catch (error) {
    res.status(422).send(error);
  }
});

// to update the CourseMaterial **************************************************************

const addingCourseContent = async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  await CourseMaterial.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        content: content,
      },
    }
  ).then((data, err) => {
    if (err) {
      res.json(err);
    }
    res.json(data);
  });
};

const removingCourseContent = async (req, res) => {
  const id = req.params.id;
  const { contentid } = req.body;
  await CourseMaterial.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        content: { _id: contentid }
      },
    }
  ).then((data, err) => {
    if (err) {
      res.json(err);
    }
    res.json(data);
  });
};

// to remove CourseMaterial ************************************************************
const courseMaterialRemove = async (req, res) => {
  const _id = req.params.id;
  await CourseMaterial.findByIdAndDelete(_id).exec((err, data) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    res.json({
      message: "Course Material  Deleted Successfully",
      data: { _id },
    });
  });
};

const searchCourseMaterial = async (req,res)=>{
  // console.log(req.params.key)
  const coursematerial= await CourseMaterial.find({
    $or:[
      {
        name: { $regex: req.params.key, $options: 'i' }
      }
    ]
  })
  try{
    if(coursematerial){
      return res.status(201).json({coursematerial});
    }
  }
  catch(error){
    return res.json({error})
  }
}


module.exports = {
  courseMaterialCreate,
  courseMaterialGetAll,
  courseMaterialGetActive,
  courseMaterialToggle,
  removingCourseContent,
  courseMaterialGetById,
  courseMaterialUpdate,
  addingCourseContent,
  courseMaterialRemove,
  searchCourseMaterial,
};
