const QuickNote = require("../models/Quicknotes");

const createSubjectName = async (req, res) => {
  const { date, subject, pdf, qna } = req.body;
	let newSub

  const notes = await QuickNote.find({ date: date });
  if (notes.length === 0) {
    const notes = {
      subject: subject,
      pdf: pdf,
      qna:qna.qna
    };
    newSub = await QuickNote.create({
      date: date,
      notes: notes,
    });
  } else {
    const note = {
      subject: subject,
      pdf: pdf,
      qna: qna.qna
    };	
		newSub = await QuickNote.findOneAndUpdate({ date: date }, {$push:{notes:note}})
	}
	res.status(200).json(newSub);
};

const getNotes= async(req,res)=>{
  try {
    const notes= await QuickNote.find({date:req.params.date});
    if(notes){
      res.status(200).json(notes)
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = {
  createSubjectName,
  getNotes,
};