const express = require('express')
const multer = require("multer");
const storage = multer.diskStorage({});
const upload = multer({ storage })
const {
  extract,
  updateQues,
  deleteQues,
  deleteAllQues,
  getQues,
  getQuesList,
  getAllQues,
  createQuest
} = require("../controllers/wordParser");

const router = express.Router()

// @route: POST /api/wordParser
// @desc: To parse a new docx
// @access: Private
router.post('/',   upload.single('filePath') , extract)
router.post('/singleQuestion',   createQuest)

// @route: DELETE /api/wordParser/:quesId
// @desc: To delete an existing question
// @access: Private
router.delete('/:quesId', deleteQues)

// @route: DELETE ALL QUESTIONS /api/wordParser/:arrOfQuesId (comma separated ques ids)
// @desc: To delete all existing questions
// @access: Private
router.delete('/deleteAll/:quesId', deleteAllQues)

// @route: PUT /api/wordParser/:quesId
// @desc: To update an existing question
// @access: Private
router.put('/updateQues', updateQues)



// @route: GET /api/wordParser/:quesId
// @desc: To get an existing question
// @access: Private
router.get('/:quesId', getQues)

router.get('/',getAllQues)

// @route: GET /api/wordParser/:standard/:subject/:chapter
// @desc: To get all existing questions
// @access: Private
router.get('/:standard/:subject/:chapter', getQuesList)

module.exports = router