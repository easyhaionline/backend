// const express = require('express')

// const { protectAdmin } = require('../middleware/protect')
// const {
//     chapterCreate,
//     chapterGetActive,
//     chapterGetAll,
//     chapterToggle,
//     chapterUpdate,
//     chapterRemove,
// } = require('../controllers/chapter')

// const router = express.Router()

// // @route: POST /api/subject
// // @desc: To create a new subject
// // @access: Private
// router.post('/', protectAdmin, chapterCreate)

// // @route: DELETE /api/subject/:subjectID
// // @desc: To toggle an existing subject
// // @access: Private
// router.delete('/:subjectID', protectAdmin, chapterToggle)

// // @route: GET /api/subject
// // @desc: To get all the subjects
// // @access: Private
// router.get('/', protectAdmin, chapterGetAll)

// // @route: GET /api/subject/active
// // @desc: To get the ACTIVE subjects
// // @access: Public
// router.get('/active', chapterGetActive)

// // @route: PUT /api/subject
// // @desc: To update a subject
// // @access: Private
// router.put('/', protectAdmin, chapterUpdate)

// // router.delete('/remove/:subjectID', chapterRemove)

// module.exports = router

const express = require("express");

const { protectAdmin } = require("../middleware/protect");
const {
  topicCreate,
  topicGetActive,
  topicGetAll,
  topicToggle,
  topicUpdate,
  topicRemove,
  topicGetById,
  addingsubtopics,
  removingsubtopics
} = require("../controllers/topic");

const router = express.Router();

// @route: POST /api/subject
// @desc: To create a new subject
// @access: Private
router.post("/", topicCreate);

// @route: DELETE /api/subject/:subjectID
// @desc: To toggle an existing subject
// @access: Private
router.put("/updateStatus/:topicID", topicToggle);
router.delete("/:id", topicRemove);

// @route: GET /api/subject
// @desc: To get all the subjects
// @access: Private
router.get("/", topicGetAll);

// @route: GET /api/subject
// @desc: To get all the subjects
// @access: Private
router.get("/get-by-id/:id", topicGetById);

// @route: GET /api/subject/active
// @desc: To get the ACTIVE subjects
// @access: Public
router.get("/active", topicGetActive);


// @route: PUT /api/topic
// @desc: To adding a new subtopics
// @access: Private
router.put("/adding-new-subtopics/:id", addingsubtopics);

// @route: DELETE /api/topic
// @desc: To remove a  subtopics
// @access: Private
router.delete("/removed-subtopics/:id", removingsubtopics);




// @route: PUT /api/subject
// @desc: To update a subject
// @access: Private
router.put("/:id", topicUpdate);

// router.delete('/remove/:subjectID', chapterRemove)

module.exports = router;
