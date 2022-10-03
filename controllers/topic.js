const asyncHandler = require("express-async-handler");

const Topic = require("../models/topic");

// to create a new Subject ********************************************************
const topicCreate = asyncHandler(async (req, res) => {
  const { name, chapter,subtopics } = req.body;

  const newTopic = await Topic.create({
    name,
    chapter,
    subtopics
  });

  if (newTopic) {
    res.status(200).json({
      message: "Topic created successfully!",
      data: newTopic,
    });
  } else {
    res.status(500);
    throw new Error(
      "New Topic can't be created at the moment! Try again later."
    );
  }
});

// to fetch all Topics available *******************************************************
const topicGetAll = asyncHandler(async (_, res) => {
  const foundTopics = await Topic.find().sort({ createdAt: -1 }).populate("subtopics", "_id name").populate("chapter","_id name")
  res.status(200).json(foundTopics);
});

const topicGetById = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  await Topic.findById(_id).populate({
    path: "standard",
    select: "title",
  }) .populate("subtopics", "_id name").exec((err,data)=>{
    if (err) {
      return res.json({
        error: err,
      });
    }
     console.log(data)
    res.status(200).json(data)
   })


});

// to fetch all active topics on the site *******************************************************
const topicGetActive = asyncHandler(async (_, res) => {
  const foundTopics = await Topic.find({ isActive: true })
    .sort({ createdAt: -1 })
    .populate("subtopics", "_id name");

  res.status(200).json(foundTopics);
});

// to toggle the state of Topic **************************************************************
const topicToggle = asyncHandler(async (req, res) => {
  const { topicID } = req.params;

  const { status } = req.body;

  try {
    const response = await Topic.findByIdAndUpdate(
      topicID,
      { isActive: status },
      { new: true }
    );
    if (response) res.send(response);
  } catch (error) {
    res.status(422).send(error);
  }
});

// to update the Topic **************************************************************
const topicUpdate = asyncHandler(async (req, res) => {
  const { name, chapter,subtopics } = req.body;
  const _id = req.params.id;

  const foundTopic = await Topic.findOne({ _id });
  if (!foundTopic) {
    res.status(404);
    throw new Error("No such Topic exists!");
  }

  if (name) foundTopic.name = name;
  if (chapter) foundTopic.chapter = chapter;
  if (subtopics) foundTopic.subtopics = subtopics;

  foundTopic.save();

  res.status(200).json({
    message: "Topic updated successfully!",
    data: foundTopic,
  });
});
const topicRemove = async (req, res) => {
  const _id = req.params.id;
  await Topic.findByIdAndDelete(_id).exec((err, data) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    res.json({ message: "Topic  Deleted Successfully", data: { _id } });
  });
};

// to update the subtopics **************************************************************

const addingsubtopics = async (req, res) => {
  const id = req.params.id;
  const { subtopic } = req.body;
  await Topic.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        subtopics: subtopic,
      },
    }
  ).then((data, err) => {
    if (err) {
      res.json(err);
    }
    res.json(data);
  });
};

const removingsubtopics = async (req, res) => {
  const id = req.params.id;
  const { subtopicid } = req.body;
  await Topic.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        subtopics: { _id: subtopicid }
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
  topicCreate,
  topicGetAll,
  topicGetActive,
  topicToggle,
  topicUpdate,
  topicRemove,
  addingsubtopics,
  removingsubtopics,
  topicGetById
};
