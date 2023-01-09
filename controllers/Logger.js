const Studentlog = require('../models/StudentLogger');
const Teacherlog = require('../models/TeacherLogger');
const BusinessPartnerlog = require('../models/BusinessPartnerLogger');
const SubBusinessPartnerlog = require('../models/SubBusinessPartnerLogger');
const Retailerlog = require('../models/RetailerLogger');
const asyncHandler = require('express-async-handler')

// create student log
const createStudentlog = asyncHandler(async (req, res) => {
    req.body.log = req.body
    req.body.studentId = req.params.id
    const StudentLogger = await Studentlog.create(req.body)
    res.status(200).json(StudentLogger)
});

// get student log
const getStudentlog = asyncHandler(async (req, res) => {
    const studentLog = await Studentlog.findOne({ studentId: req.params.id }).populate("studentId", "username email")
    console.log(studentLog)
    console.log("here is log")
    res.json(studentLog)
});

// updating student log
const updateStudentlog = asyncHandler(async (req, res) => {
    const { route, startTime, endTime } = req.body
    console.log(req.body)
    const studentlog = await Studentlog.findOneAndUpdate({ studentId: req.params.id }, { $push: { log: { route, startTime, endTime } } }, { new: true, runValidators: true })

    // console.log(studentlog)
    res.json(studentlog)
});



// create teacher log
const createTeacherlog = asyncHandler(async (req, res) => {
    req.body.log = req.body
    req.body.teacherId = req.params.id
    const TeacherLogger = await Teacherlog.create(req.body)
    res.status(200).json(TeacherLogger)
});

// get teacher log
const getTeacherlog = asyncHandler(async (req, res) => {
    const teacherLog = await Teacherlog.findOne({ teacherId: req.params.id }).populate("teacherId", "username email")
    console.log(teacherLog)
    res.json(teacherLog)
});

// updating teacher log
const updateTeacherlog = asyncHandler(async (req, res) => {
    const { route, startTime, endTime } = req.body
    console.log(req.body)
    const teacherlog = await Teacherlog.findOneAndUpdate({ teacherId: req.params.id }, { $push: { log: { route, startTime, endTime } } }, { new: true, runValidators: true })

    // console.log(studentlog)
    res.json(teacherlog)
});

// create business partner log
const createBusinessPartnerlog = asyncHandler(async (req, res) => {
    req.body.log = req.body
    req.body.studentId = req.params.id
    const BusinessPartnerLogger = await BusinessPartnerlog.create(req.body)
    res.status(200).json(BusinessPartnerLogger)
});

// get business partner log
const getBusinessPartnerlog = asyncHandler(async (req, res) => {
    const businesspartnerLog = await BusinessPartnerlog.findOne({ businesspartnerId: req.params.id }).populate("businesspartnerId", "name email")
    console.log(businesspartnerLog)
    console.log("here is log")
    res.json(businesspartnerLog)
});

// updating business partner log
const updateBusinessPartnerlog = asyncHandler(async (req, res) => {
    const { route, startTime, endTime } = req.body
    console.log(req.body)
    const businesspartnerlog = await BusinessPartnerlog.findOneAndUpdate({ businesspartnerId: req.params.id }, { $push: { log: { route, startTime, endTime } } }, { new: true, runValidators: true })

    // console.log(studentlog)
    res.json(businesspartnerlog)
});

// create subbusiness partner log
const createSubBusinessPartnerlog = asyncHandler(async (req, res) => {
    req.body.log = req.body
    req.body.subbusinesspartnerId = req.params.id
    const SubBusinessPartnerLogger = await SubBusinessPartnerlog.create(req.body)
    res.status(200).json(SubBusinessPartnerLogger)
});

// get subbusiness partner log
const getSubBusinessPartnerlog = asyncHandler(async (req, res) => {
    const subbusinesspartnerLog = await SubBusinessPartnerlog.findOne({ subbusinesspartnerId: req.params.id }).populate("subbusinesspartnerId", "name email")
    console.log(subbusinesspartnerLog)
    console.log("here is log")
    res.json(subbusinesspartnerLog)
});

// updating subbusiness partner log
const updateSubBusinessPartnerlog = asyncHandler(async (req, res) => {
    const { route, startTime, endTime } = req.body
    console.log(req.body)
    const subbusinesspartnerlog = await SubBusinessPartnerlog.findOneAndUpdate({ subbusinesspartnerId: req.params.id }, { $push: { log: { route, startTime, endTime } } }, { new: true, runValidators: true })

    // console.log(studentlog)
    res.json(subbusinesspartnerlog)
});

// create retailer log
const createRetailerlog = asyncHandler(async (req, res) => {
    req.body.log = req.body
    req.body.retailerId = req.params.id
    const RetailerLogger = await Retailerlog.create(req.body)
    res.status(200).json(RetailerLogger)
});

// get retailer log
const getRetailerlog = asyncHandler(async (req, res) => {
    const retailerLog = await Retailerlog.findOne({ retailerId: req.params.id }).populate("retailerId", "name email")
    console.log(retailerLog)
    console.log("here is log")
    res.json(retailerLog)
});

// updating retailer log
const updateRetailerlog = asyncHandler(async (req, res) => {
    const { route, startTime, endTime } = req.body
    console.log(req.body)
    const retailerlog = await Retailerlog.findOneAndUpdate({ retailerId: req.params.id }, { $push: { log: { route, startTime, endTime } } }, { new: true, runValidators: true })

    // console.log(studentlog)
    res.json(retailerlog)
});



module.exports = {
    createStudentlog, updateStudentlog, getStudentlog, createTeacherlog, getTeacherlog, updateTeacherlog,
    createBusinessPartnerlog, updateBusinessPartnerlog, getBusinessPartnerlog, createSubBusinessPartnerlog, updateSubBusinessPartnerlog,
    getSubBusinessPartnerlog, createRetailerlog, updateRetailerlog, getRetailerlog,
}
