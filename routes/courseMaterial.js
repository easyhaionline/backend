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
  courseMaterialCreate,
  courseMaterialGetActive,
  courseMaterialGetAll,
  courseMaterialToggle,
  courseMaterialUpdate,
  addingCourseContent,
  removingCourseContent,
  courseMaterialGetById,
  courseMaterialRemove,
} = require("../controllers/courseMaterial");

const router = express.Router();

// @route: POST /api/subject
// @desc: To create a new subject
// @access: Private
router.post("/", courseMaterialCreate);

// @route: DELETE /api/subject/:subjectID
// @desc: To toggle an existing subject
// @access: Private
router.put("/updateStatus/:courseMaterialID", courseMaterialToggle);


router.delete("/:id", courseMaterialRemove);

// @route: GET /api/subject
// @desc: To get all the subjects
// @access: Private
router.get("/", courseMaterialGetAll);

// @route: GET /api/subject
// @desc: To get all the subjects
// @access: Private
router.get("/get-by-id/:id", courseMaterialGetById);

// @route: PUT /api/courseMaterial
// @desc: To adding a new content
// @access: Private
router.put("/adding-new-content/:id", addingCourseContent);

// @route: DELETE /api/courseMaterial
// @desc: To remove a  content
// @access: Private
router.delete("/removed-content/:id", removingCourseContent);


// @route: GET /api/subject/active
// @desc: To get the ACTIVE subjects
// @access: Public
router.get("/active", courseMaterialGetActive);

// @route: PUT /api/subject
// @desc: To update a subject
// @access: Private
router.put("/:id", courseMaterialUpdate);

// router.delete('/remove/:subjectID', chapterRemove)

module.exports = router;
