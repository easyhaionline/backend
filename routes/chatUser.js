const {getTeachers, getSubjects, getCourses, getStudents} = require('../controllers/chatUser')
const router = require('express').Router()

router.route('/:id').get(getTeachers)
router.route('/get-subjects/:id').get(getSubjects)
router.route('/get-courses').post(getCourses)
router.route('/get-students').post(getStudents)

module.exports = router