const { Route53RecoveryControlConfig } = require('aws-sdk');
const express = require('express')
const {
  doubtCreate,
  getNewDoubt,
  takeThisDoubt,
  getStudentDoubt,
  getTeacherDoubt,
  getAllDoubts,
  getSingleDoubt,
  doubtReply,
  satisfied,
  dissatisfied,
  doubtCredits,
  getTeacherList,
  clearBalance
} = require("../controllers/doubtExpert");

const router = express.Router()

router.post('/', doubtCreate);
router.post('/newDoubt', getNewDoubt);
router.put('/takethisdoubt/:id', takeThisDoubt);
router.get('/satisfied/:id', satisfied);
router.get('/dissatisfied/:id', dissatisfied);
router.post('/getdoubtbystudentid/:id', getStudentDoubt);
router.post('/getdoubtbyteacherid/:id', getTeacherDoubt);
router.post('/getAllDoubts', getAllDoubts);
router.get('/getSingleDoubt/:id', getSingleDoubt)
router.post('/reply', doubtReply);
router.get('/getCredits/:id', doubtCredits);
router.get('/getTeacherList', getTeacherList);
router.put('/clearBalance/:id', clearBalance);

module.exports = router;