const { Schema, model, Types } = require("mongoose");

const subtopicSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    topic: {
      type: Types.ObjectId,
      ref: "Subject",
    },
    courseMaterials: [
      {
       
          type: Types.ObjectId,
          ref: "CourseMaterial",
       
      }
    ],
    
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,

      default: Date.Now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new model("Subtopic", subtopicSchema);
