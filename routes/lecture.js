
const express = require("express");

const { protectAdmin } = require("../middleware/protect");
const {
  lectureCreate,
  lectureGetActive,
  lectureGetAll,
  lectureToggle,
  lectureUpdate,
  lectureLecturesById,
  lectureDelete,
  lectureLecturesByType,
  LiveLecturesFilter,
  RecordedLecturesFilter,
  test, LivelectureSearch,
  getbyZoomid,
  lectureSearch,
  RecordedLecturesSubjectFilter,
  LiveLecturesSubjectFilter,
} = require("../controllers/lecture");

const router = express.Router();

// @route: POST /api/lecture
// @desc: To create a new lecture
// @access: Private
// router.post('/', protectAdmin, lectureCreate)
router.post("/", lectureCreate);

// @route: DELETE /api/lecture/:lectureID
// @desc: To toggle an existing lecture
// @access: Private
// router.delete('/:lectureID', protectAdmin, lectureToggle)
// @route: DELETE /api/lecture/:lectureID
// @desc: To toggle an existing lecture
// @access: Private
// router.delete('/delete/:lectureID', protectAdmin, lectureDelete)

// @route: GET /api/lecture/:type
// @desc: To get all the lectures
// @access: Private
// router.get('/', protectAdmin, lectureGetAll)

router.delete("/:lectureID", lectureToggle);
router.delete("/delete/:lectureID", lectureDelete);
// router.post("/mamoth",test)


router.get("/", lectureGetAll);
router.get("/by-id/:id", lectureLecturesById);
router.get("/lecture/:search", lectureSearch);
router.get("/livelecture/:search", LivelectureSearch);
router.get("/:type", lectureLecturesByType);
router.get("/live-filter/examtype/:examtype", LiveLecturesFilter);
router.get("/live-filter/subject/:subject/:course", LiveLecturesSubjectFilter);
router.get("/recorded-filter/subject/:subject/:course", RecordedLecturesSubjectFilter);
router.get("/active/:type", lectureGetActive);
router.put("/", lectureUpdate);
router.get("/getbyZoomid/:id",getbyZoomid);

// @route: GET /api/lecture/:type
// @desc: To get all the lectures
// @access: Private
// router.get('/:type', protectAdmin, lectureLecturesById)

// @route: GET /api/lecture/active/:type
// @desc: To get the ACTIVE lectures
// @access: Public
// router.get('/active/:type', lectureGetActive)

// @route: PUT /api/lecture
// @desc: To update a lecture
// @access: Private
// router.put('/', protectAdmin, lectureUpdate)

module.exports = router;
