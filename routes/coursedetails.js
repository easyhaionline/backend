const express = require('express')

const { protectAdmin } = require('../middleware/protect')
const {
    courseDetailsAdd,
    getCouseDetailsByEmail,
    courseDetailUpdate,
    getCouseDetailsBymobile
} = require('../controllers/courseDetails')

const router = express.Router()

// @route: POST /api/coursedetails
// @desc: To create a new coursedetails
// @access: Private
router.post('/',  courseDetailsAdd);
router.get('/:email',  getCouseDetailsByEmail);
router.get('/mobile/:mobile',  getCouseDetailsBymobile);
router.put('/:email',  courseDetailUpdate);


module.exports = router