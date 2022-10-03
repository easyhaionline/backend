const asyncHandler = require("express-async-handler");

const Subtopic = require("../models/subtopic");

// to create a new Subject ********************************************************
const subtopicCreate = asyncHandler(async (req, res) => {
  const { name, topic,courseMaterials } = req.body;

  const newSubtopic = await Subtopic.create({
    name,
    topic,
    courseMaterials
  });

  if (newSubtopic) {
    res.status(200).json({
      message: "Subtopic created successfully!",
      data: newSubtopic,
    });
  } else {
    res.status(500);
    throw new Error(
      "New Subtopic can't be created at the moment! Try again later."
    );
  }
});

// to fetch all Subtopics available *******************************************************
const subtopicGetAll = asyncHandler(async (_, res) => {
  const foundSubtopics = await Subtopic.find()
    .sort({ createdAt: -1 })
    .populate("courseMaterials", "_id name")
    .populate("topic","_id name");
    

  res.status(200).json(foundSubtopics);
});

const subtopicGetById = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  await Subtopic.findById(_id)  .populate({
    path: "standard",
    select: "title",
  })  .populate("courseMaterials", "_id name")
  .exec((err,data)=>{
    if (err) {
      return res.json({
        error: err,
      });
    }
    res.status(200).json(data)
   })

});

// to fetch all active topics on the site *******************************************************
const subtopicGetActive = asyncHandler(async (_, res) => {
  const foundSubtopics = await Subtopic.find({ isActive: true })
    .sort({ createdAt: -1 })
    .populate("courseMaterials", "_id name")
    

  res.status(200).json(foundSubtopics);
});

// to toggle the state of Subtopic **************************************************************
const subtopicToggle = asyncHandler(async (req, res) => {
  const { subtopicID } = req.params;

  const { status } = req.body;

  try {
    const response = await Subtopic.findByIdAndUpdate(
      subtopicID,
      { isActive: status },
      { new: true }
    );
    if (response) res.send(response);
  } catch (error) {
    res.status(422).send(error);
  }
});

// to update the Subtopic **************************************************************
const subtopicUpdate = asyncHandler(async (req, res) => {
  const { name, topic,courseMaterials } = req.body;
  const _id = req.params.id;

  const foundSubtopic = await Subtopic.findOne({ _id });
  if (!foundSubtopic) {
    res.status(404);
    throw new Error("No such Subtopic exists!");
  }

  if (name) foundSubtopic.name = name;
  if (topic) foundSubtopic.topic = topic;
  if (courseMaterials) foundSubtopic.courseMaterials = courseMaterials;

  foundSubtopic.save();

  res.status(200).json({
    message: "Subtopic updated successfully!",
    data: foundSubtopic,
  });
});
const subtopicRemove = async (req, res) => {
  const _id = req.params.id;
  await Subtopic.findByIdAndDelete(_id).exec((err, data) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    res.json({ message: "Subtopic  Deleted Successfully", data: { _id } });
  });
};

// to update the coursematerial **************************************************************

const addingcoursematerial = async (req, res) => {
  const id = req.params.id;
  const { courseMaterial } = req.body;
  await Subtopic.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        courseMaterials: courseMaterial,
      },
    }
  ).then((data, err) => {
    if (err) {
      res.json(err);
    }
    res.json(data);
  });
};

const removingcoursematerial = async (req, res) => {
  const id = req.params.id;
  const { courseMaterialId } = req.body;
  await Subtopic.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        courseMaterials: { _id: courseMaterialId }
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
  subtopicCreate,
  subtopicGetAll,
  subtopicGetActive,
  subtopicToggle,
  subtopicUpdate,
  subtopicRemove,
  addingcoursematerial,
  removingcoursematerial,
  subtopicGetById
};
