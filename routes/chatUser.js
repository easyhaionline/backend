const {getTeachers, getStudents} = require('../controllers/chatUser')
const router = require('express').Router()

router.route('/:id').get(getTeachers)
router.route('/getstudents/:id').get(getStudents)

module.exports = router