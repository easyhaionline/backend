const express = require('express')

// var easyinvoice = require('easyinvoice');

const { protectAdmin } = require('../middleware/protect')
const {
    courseDetailsAdd,
    getCouseDetailsByEmail,
    courseDetailUpdate,
    getCouseDetailsBymobile,
    // deleteCourseDetails
} = require('../controllers/courseDetails')

const router = express.Router()

// @route: POST /api/coursedetails
// @desc: To create a new coursedetails
// @access: Private
router.post('/',  courseDetailsAdd);
router.get('/:email',  getCouseDetailsByEmail);
router.get('/mobile/:mobile',  getCouseDetailsBymobile);
router.put('/:email',  courseDetailUpdate);
// router.route('/:id').delete(deleteCourseDetails)


module.exports = router