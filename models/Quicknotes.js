const mongoose = require("mongoose");

const quickNotesSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    
    notes: [
      {
        subject: {
          type: String,
          required: true,
        },
        pdf: {
          type: String,
          required: true,
        },
        qna:{
          type: String,
          // required: true
        }
      },
    ],
   
  },
  { timestamps: true }
);
module.exports = mongoose.model("QuickNote", quickNotesSchema);