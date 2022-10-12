const { Route53RecoveryControlConfig } = require('aws-sdk');
const express = require('express')
const {
  doubtCreate,
  getNewDoubt,
  takeThisDoubt,
  getStudentDoubt,
  getTeacherDoubt,
  getAllDoubts,
  getSingleDoubt
} = require("../controllers/doubtExpert");

const router = express.Router()

router.post('/', doubtCreate);
router.post('/newDoubt', getNewDoubt);
router.put('/takethisdoubt/:id', takeThisDoubt);
router.post('/getdoubtbystudentid/:id', getStudentDoubt);
router.post('/getdoubtbyteacherid/:id', getTeacherDoubt);
router.post('/getAllDoubts', getAllDoubts);
router.get('/getSingleDoubt/:id', getSingleDoubt)

module.exports = router;