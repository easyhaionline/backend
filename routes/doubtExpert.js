const { Route53RecoveryControlConfig } = require('aws-sdk');
const express = require('express')
const {
  doubtCreate,
  getNewDoubt,
  takeThisDoubt,
  getStudentDoubt,
  getTeacherDoubt
} = require("../controllers/doubtExpert");

const router = express.Router()

router.post('/', doubtCreate);
router.post('/newDoubt', getNewDoubt);
router.put('/takethisdoubt/:id', takeThisDoubt);
router.post('/getdoubtbystudentid/:id', getStudentDoubt)
router.post('/getdoubtbyteacherid/:id', getTeacherDoubt)
// router.delete('/:complaintID', deleteComplaint);
// router.get('/:type', complaintGetAll);
// router.get('/get/:complaintID', idGet);
// router.put('/:complaintID', updateStatus);
// router.get("/getById/:id", complaintByStudent);
// router.get("/teacher/:id", complaintByAllTeachers);
// router.get("/student/:id", complaintByAllStudents);
// router.get("/feedbacks/getById/:id", feedbacksByStudent);

module.exports = router;