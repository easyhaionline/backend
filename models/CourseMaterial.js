const { Schema, model, Types } = require("mongoose");

const CourseMaterialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subtopic: {
      type: Types.ObjectId,
      ref: "Subject",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    content: [{
        pdf: {
            type: String,
        },
        video: {
            type: String,
        },
        sno: {
            type: Number,
        },
        type: {
            type: String,
        }
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = new model("CourseMaterial", CourseMaterialSchema);
