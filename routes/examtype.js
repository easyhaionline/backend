const express = require('express')

const { protectAdmin } = require('../middleware/protect')
const {
    ExamTypeCreate,
    ExamTypeGetActive,
    ExamTypeGetAll,
    ExamToggle,
    ExamUpdate,
    ExamTypeById,
    Examremove
} = require('../controllers/exam-type')

const router = express.Router()

// @route: POST /api/ExamType
// @desc: To create a new ExamType
// @access: Private
router.post('/', protectAdmin, ExamTypeCreate)
// router.post('/',  ExamTypeCreate)

// @route: DELETE /api/ExamType/:ExamTypeID
// @desc: To toggle an existing ExamType
// @access: Private
router.delete('/:examID', protectAdmin, ExamToggle)
// router.delete('/:examID', ExamToggle)
// @route: DELETE /api/ExamType/:ExamTypeID
// @desc: To delete ExamType
// @access: Private
router.delete('/delete/:id', protectAdmin, Examremove)
// router.delete('/delete/:id', Examremove)

// @route: GET /api/ExamType
// @desc: To get all the ExamTypes
// @access: Private
router.get('/', protectAdmin, ExamTypeGetAll)
// router.get('/', ExamTypeGetAll)


// @route: GET /api/ExamType
// @desc: To get the ExamTypes by id
// @access: Private
router.get('/by-id/:id', ExamTypeById)

// @route: GET /api/ExamType/active
// @desc: To get the ACTIVE ExamTypes
// @access: Public
router.get('/active', ExamTypeGetActive)

// @route: PUT /api/ExamType
// @desc: To update a ExamType
// @access: Private
router.put('/', protectAdmin, ExamUpdate)
// router.put('/', ExamUpdate)

module.exports = router
