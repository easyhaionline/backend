const asyncHandler = require("express-async-handler");
const { name } = require("msal/lib-commonjs/packageMetadata");
const Subtopic = require("../models/subtopic");
const CourseMatrial = require("../models/CourseMaterial");

const Topic = require("../models/topic");

// to create a new Subject ********************************************************
const topicCreate = asyncHandler(async (req, res) => {
  const { name, chapter, subtopics } = req.body;

  const newTopic = await Topic.create({
    name,
    chapter,
    subtopics,
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
const topicGetAll = asyncHandler(async (req, res) => {
  const { skip, limit } = req.body;
  const foundTopics = await Topic.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("subtopics", "_id name")
    .populate("chapter", "_id name")
    .exec((error, data) => {
      if (data) {
        return res.status(200).json({ data: data });
      } else {
        return console.log("I am error: ", error);
      }
    });
});

const topicGetById = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  await Topic.findById(_id)
    .populate({
      path: "standard",
      select: "title",
    })
    .populate("subtopics", "_id name")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      console.log(data);
      res.status(200).json(data);
    });
});

const topicById = asyncHandler(async (req, res) => {
  const _id = req.params.id;
  await Topic.findById(_id)
    .select("name")
    .select("subtopics")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      console.log(data);
      res.status(200).json(data);
    });
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
  const { name, chapter, subtopics } = req.body;
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
        subtopics: { _id: subtopicid },
      },
    }
  ).then((data, err) => {
    if (err) {
      res.json(err);
    }
    res.json(data);
  });
};

const searchTopic = async (req, res) => {
  console.log(req.params.key);
  const topic = await Topic.find({
    $or: [
      {
        name: { $regex: req.params.key, $options: "i" },
      },
    ],
  })
    .populate("chapter", "name")
    .populate("subtopics", "name");
  console.log(topic);
  try {
    if (topic) {
      return res.status(201).json(topic);
    }
  } catch (error) {
    return res.json({ error });
  }
  console.log(topic);
};

const showAllpdfvideoani = asyncHandler(async (req, res) => {
  const foundTopics = await Topic.find()
    .sort({ createdAt: -1 })
    .populate("chapter", "_id name")
    .exec(async(error, data) => {
      if (data) {
        let materialType = [];
        const typeArray = await Promise.all(data.map(async (item) => {
          if (item.subtopics != null) {
            const subtopics =  await Subtopic.findOne({_id: item.subtopics[0]});
            // console.log(subtopics.courseMaterials != null ? "OKK" : "NULL" )
            if ( subtopics && subtopics.courseMaterials && subtopics.courseMaterials != null) {
              const courseMatId = subtopics.courseMaterials[0]; 
              if(courseMatId){
                const coursematerial = await CourseMatrial.findOne({_id: courseMatId  });
                // console.log("coursematerial",coursematerial);
                materialType.push(coursematerial.content[0].type)
              } else{
                materialType.push("")
              }

            } else {
              materialType.push("")
            }
           
            console.log(materialType)
          } else {
            materialType.push("")
          }

          return materialType
        }));

        return res.status(200).json({data: data, type: materialType });
      } else {
        return console.log("I am error: ", error);
      }
    });
});

module.exports = {
  topicCreate,
  topicGetAll,
  topicGetActive,
  topicToggle,
  topicUpdate,
  topicRemove,
  addingsubtopics,
  removingsubtopics,
  topicGetById,
  topicById,
  searchTopic,
  showAllpdfvideoani,
};
