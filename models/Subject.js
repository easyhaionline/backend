const { Schema, model, Types } = require("mongoose");

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    standard: {
      type: Types.ObjectId,
      ref: "Standard",
    },
    course: {
      type: Types.ObjectId,
      ref: "Course",
    },
    chapters: [
      {
        type: Types.ObjectId,
        ref: "chapters",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    teachers: [{ type: Types.ObjectId, ref: "Teacher" }],
  },
  {
    timestamps: true,
  }
);

module.exports = new model("Subject", subjectSchema);
