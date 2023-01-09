const express = require('express')
const {createStudentlog, getStudentlog, updateStudentlog, createTeacherlog, getTeacherlog, updateTeacherlog, createBusinessPartnerlog, getBusinessPartnerlog, updateBusinessPartnerlog, createSubBusinessPartnerlog, getSubBusinessPartnerlog, updateSubBusinessPartnerlog, createRetailerlog, getRetailerlog, updateRetailerlog} = require('../controllers/Logger');


const router = express.Router();

// student log route
router.post('/student/:id', createStudentlog)
router.get('/student/getlog/:id', getStudentlog)
router.put('/student/updatelog/:id', updateStudentlog);

// teacher log route
router.post('/teacher/:id', createTeacherlog)
router.get('/teacher/getlog/:id', getTeacherlog)
router.put('/teacher/updatelog/:id', updateTeacherlog);

//business partner route
router.post('/businesspartner/:id', createBusinessPartnerlog)
router.get('/businesspartner/getlog/:id', getBusinessPartnerlog)
router.put('/businesspartner/updatelog/:id', updateBusinessPartnerlog);

//sub businesspartner route
router.post('/subbusinesspartner/:id', createSubBusinessPartnerlog)
router.get('/subbusinesspartner/getlog/:id', getSubBusinessPartnerlog)
router.put('/subbusinesspartner/updatelog/:id', updateSubBusinessPartnerlog)

//retailer route
router.post('/retailer/:id', createRetailerlog)
router.get('/retailer/getlog/:id', getRetailerlog)
router.put('/retailer/updatelog/:id', updateRetailerlog);

module.exports = router