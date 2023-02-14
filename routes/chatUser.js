const {getTeachers, getSubjects, getCourses, getStudents} = require('../controllers/chatUser')
const router = require('express').Router()

router.route('/:id').get(getTeachers)
router.route('/get-students/:id').get(getStudents)

module.exports = router