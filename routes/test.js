const express = require('express')

const { protectAdmin } = require('../middleware/protect')
const {
    testCreate,
    testGetActive,
    testReview,
    testGetAll,
    testToggle,
    testUpdate,
    getEvaluatedTests,
} = require('../controllers/test')
const {
    testSubmission,
    testStart
} = require('../controllers/scoreCard')
const router = express.Router()

// @route: POST /api/test
// @desc: To create a new test
// @access: Private
router.post('/', protectAdmin, testCreate)

// @route: DELETE /api/test/:testID
// @desc: To toggle an existing test
// @access: Private
router.delete('/:testID', protectAdmin, testToggle)

// @route: GET /api/test/:type
// @desc: To get all the tests
// @access: Private
router.get('/:type', protectAdmin, testGetAll)

// @route: GET /api/test/active/:type
// @desc: To get the ACTIVE tests
// @access: Public
router.get('/active/:type', testGetActive)

// @route: PATCH /api/test/:testID
// @desc: To review a test
// @access: Private
router.patch('/:testID', protectAdmin, testReview)

// @route: PUT /api/test
// @desc: To update a test
// @access: Private
router.put('/', protectAdmin, testUpdate)
router.post('/begin-test', testStart)
router.post('/submit-test', testSubmission)

router.post('/get-evauluated-test', getEvaluatedTests)
module.exports = router
