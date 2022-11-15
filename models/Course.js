const { Schema, model, Types } = require("mongoose");

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    desktopImage: {
      type: String,
      required: true,
    },
    standard:
      [{
        type: Types.ObjectId,
        ref: "Standard"
      }],
    examtype: {
        type: Types.ObjectId,
        ref: "ExamType",
      },
    stream: {
      type: String,
    },
    program: {
      type: String,
    },
    mobileImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    mindescription: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    subject: 
      [{
          type: Types.ObjectId,
          ref: "Subject",
      }]
    ,
    classes: {
      type: String,
      // required: true,
    },
    courses: {
      type: String,
      // required: true,
    },
    time: {
      type: String,
      // required: true,
    },
    actualPrice: {
      type: String,
      // required: true,
    },
    discountPrice: {
      type: String,
      // required: true,
    },
    location: {
      type: String,
      // required: true,
    },
    priority: {
      type: Number,
      // required: true,
    },
    createdBy: {
      type: String,
      // required: true,
    },
    updatedBy: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = new model("Course", courseSchema);
