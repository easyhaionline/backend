const express = require("express");

const { protectAdmin } = require("../middleware/protect");
const {
  chapterCreate,
  chapterGetActive,
  chapterGetAll,
  chapterToggle,
  chapterUpdate,
  chapterRemove,
  addingtopic,
  removingtopic,
  chapterGetById
} = require("../controllers/chapter");

const router = express.Router();

// @route: POST /api/subject
// @desc: To create a new subject
// @access: Private
router.post("/", chapterCreate);

// @route: DELETE /api/subject/:subjectID
// @desc: To toggle an existing subject
// @access: Private
router.put("/updateStatus/:chapterID", chapterToggle);

// @route: PUT /api/chapter
// @desc: To adding a new topic
// @access: Private
router.put("/adding-new-topic/:id", addingtopic);

// @route: DELETE /api/chapter
// @desc: To remove a  topic
// @access: Private
router.delete("/removed-topic/:id", removingtopic);

router.delete("/:id", chapterRemove);

// @route: GET /api/chapter
// @desc: To get all the subjects
// @access: Private
router.get("/", chapterGetAll);
router.get("/by-id/:id", chapterGetById);

// @route: GET /api/subject/active
// @desc: To get the ACTIVE subjects
// @access: Public
router.get("/active", chapterGetActive);

// @route: PUT /api/subject
// @desc: To update a subject
// @access: Private
router.put("/:id", chapterUpdate);


module.exports = router;
