const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    chapter: {
      type: ObjectId,
      ref: "Subject",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    subtopics: [
      {
        type: ObjectId,
        ref: "Subtopic",
      },
    ],
    createdAt: {
      type: Date,

      default: Date.Now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("topic", topicSchema);
