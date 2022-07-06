const express = require('express')

const { protectAdmin } = require('../middleware/protect')
const {
    questionCreate,
    questionGetAll,
    questionReview,
    questionToggle,
    questionUpdate,
    sortingGetAll,
    deleteQuestion,
    questionGetAllByType,
    getQuestionByTestId
} = require('../controllers/question')
const { route } = require('./test')

const router = express.Router()

// @route: POST /api/question
// @desc: To create a new question
// @access: Private
router.post('/', protectAdmin, questionCreate)


//development routes

router.delete('/:questionID', questionToggle)

router.delete('/delete/:questionID', deleteQuestion)

router.get('/:type', questionGetAllByType)
router.get('/', questionGetAll)
router.get('/sort/:type', sortingGetAll)
router.patch('/:questionID', questionReview)
router.put('/', questionUpdate)
router.post('/get-next-question', getQuestionByTestId)
// @route: DELETE /api/question/:questionID
// @desc: To toggle an existing question
// @access: Private
// router.delete('/:questionID', protectAdmin, questionToggle)

// @route: GET /api/question/:type
// @desc: To get all the questions
// @access: Private
// router.get('/:type', protectAdmin, questionGetAll)

// @route: GET /api/question/sort/:type
// @desc: To get all the sorted questions
// @access: Private

// router.get('/sort/:type', protectAdmin,sortingGetAll )

// @route: GET /api/question/
// @desc: To get all the  questions
// @access: Private

// router.get('/', protectAdmin,sortingGetAll )

// @route: PATCH /api/question/:questionID
// @desc: To update a question
// @access: Private
// router.patch('/:questionID', protectAdmin, questionReview)

// @route: PUT /api/question
// @desc: To update a question
// @access: Private
// router.put('/', protectAdmin, questionUpdate)

module.exports = router
