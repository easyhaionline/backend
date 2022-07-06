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
  subtopicCreate,
  subtopicGetActive,
  subtopicGetAll,
  subtopicToggle,
  subtopicUpdate,
  subtopicRemove,
  subtopicGetById,
  addingcoursematerial,
  removingcoursematerial

} = require("../controllers/subtopic");

const router = express.Router();

// @route: POST /api/subtopic
// @desc: To create a new subtopic
// @access: Private
router.post("/", subtopicCreate);

// @route: DELETE /api/subtopic/:subjectID
// @desc: To toggle an existing subtopic
// @access: Private
router.put("/updateStatus/:subtopicID", subtopicToggle);
router.delete("/:id", subtopicRemove);

// @route: GET /api/subtopic
// @desc: To get all the subtopic
// @access: Private
router.get("/", subtopicGetAll);

// @route: GET /api/subtopic
// @desc: To get all the subtopic
// @access: Private
router.get("/get-by-id/:id", subtopicGetById);

// @route: GET /api/subject/active
// @desc: To get the ACTIVE subtopic
// @access: Public
router.get("/active", subtopicGetActive);

// @route: PUT /api/subtopic
// @desc: To update a subtopic
// @access: Private
router.put("/:id", subtopicUpdate);

// router.delete('/remove/:subjectID', chapterRemove)


// @route: PUT /api/subtopic
// @desc: To adding a new courseMaterial
// @access: Private
router.put("/adding-new-courseMaterial/:id", addingcoursematerial);

// @route: DELETE /api/subtopic
// @desc: To remove a  courseMaterial
// @access: Private
router.delete("/removed-courseMaterial/:id", removingcoursematerial);







module.exports = router;
