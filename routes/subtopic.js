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
  removingcoursematerial,
  subTopicById

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
router.post("/get-all", subtopicGetAll);

// @route: GET /api/subtopic
// @desc: To get all the subtopic
// @access: Private
router.get("/get-by-id/:id", subtopicGetById);

router.get("/get/:id", subTopicById);

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
