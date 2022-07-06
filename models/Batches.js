const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const batchesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    duration: {
      type: String,
    },
    timing: {
      type: String,
    },

    subjects: [
      {
        type: String,
      
      }
    ],

    selling_price: {
      type: Number,
    },
    listed_price: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Batches", batchesSchema);
