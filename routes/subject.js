const express = require('express')

const { protectAdmin } = require('../middleware/protect')
const {
  subjectCreate,
  subjectGetActive,
  subjectGetAll,
  subjectToggle,
  subjectUpdate,
  Subjectremove,
  statusUpdate,
  addingChapter,
  removingChapter,
  subjectGetById
} = require("../controllers/subject");

const router = express.Router()

// @route: POST /api/subject
// @desc: To create a new subject
// @access: Private
// router.post('/', protectAdmin, subjectCreate)
router.post('/',  subjectCreate)

// @route: DELETE /api/subject/:subjectID
// @desc: To toggle an existing subject
// @access: Private
// router.delete('/:subjectID', protectAdmin, subjectToggle)
router.delete('/:subjectID', subjectToggle)

// @route: DELETE /api/subject/:subjectID
// @desc: To toggle an existing subject
// @access: Private
// router.delete('/delete/:id', protectAdmin, Subjectremove)
router.delete('/delete/:id', Subjectremove)

// @route: PUT /api/subject
// @desc: To adding a new chapter
// @access: Private
router.put("/adding-new-chapter/:id", addingChapter);

// @route: DELETE /api/subject
// @desc: To remove a  chapter
// @access: Private
router.delete("/removed-chapter/:id", removingChapter);


// @route: GET /api/subject
// @desc: To get all the subjects
// @access: Private
// router.get('/', protectAdmin, subjectGetAll)
router.get('/',  subjectGetAll)

// @route: GET /api/subject
// @desc: To get all the subjects
// @access: Private
// router.get('/', protectAdmin, subjectGetAll)
router.get('/get-by-id/:id',  subjectGetById)


// @route: GET /api/subject/active
// @desc: To get the ACTIVE subjects
// @access: Public
router.get('/active', subjectGetActive)

// @route: PUT /api/subject
// @desc: To update a subject
// @access: Private
// router.put('/', protectAdmin, subjectUpdate)
router.put('/:id', subjectUpdate)


router.put("/updateStatus/:id", statusUpdate);


module.exports = router
