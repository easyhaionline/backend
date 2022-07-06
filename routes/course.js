const express = require('express')
const multer = require("multer");
const storage = multer.diskStorage({});
const { protectAdmin } = require('../middleware/protect')
const {
    courseCreate,
    courseToggle,
    courseGetAll,
    courseGetActive,
    courseUpdate,
    readCourseByid
} = require('../controllers/course')
const upload = multer({ storage })
const {displaycoursecreate} = require('../controllers/coursespart2')
const router = express.Router()

// @route: POST /api/course
// @desc: To create a new course
// @access: Private
router.post('/', upload.single('myFile'), protectAdmin, displaycoursecreate)

// @route: DELETE /api/course
// @desc: To toggle an existing course
// @access: Private
router.delete('/:courseCode', protectAdmin, courseToggle)

// @route: GET /api/course
// @desc: To get all the courses
// @access: Private
router.get('/', protectAdmin, courseGetAll)
// router.get('/',  courseGetAll)
// @route: GET /api/course
// @desc: To get  courses by id
// @access: Private
router.get('/readcourse/:id',  readCourseByid)
// router.get('/readcourse/:id', readCourseByid)

// @route: GET /api/course/active
// @desc: To get the ACTIVE courses
// @access: Public
router.get('/active', courseGetActive)

// @route: PUT /api/course
// @desc: To update a course
// @access: Private
router.put('/', protectAdmin, courseUpdate)
// router.put('/',courseUpdate)

module.exports = router
 