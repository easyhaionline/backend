// const { Schema, model, Types } = require('mongoose')

// const chapterSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     subject: {
//         type: Types.ObjectId,
//         ref: 'Subject',
//     },
// })

// module.exports = new model('Chapter', chapterSchema)

// const { Schema, model, Types,  } = require("mongoose");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;



const chapterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: ObjectId,
      ref: "Subject",
    },
    topics: [
      {
        type: ObjectId,
        ref: "topic",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    chapterNumber: {
      type: Number,
      // unique: true,
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

module.exports = mongoose.model("chapters", chapterSchema);
