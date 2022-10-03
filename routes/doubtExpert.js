const express = require('express')
const {
  doubtCreate,
} = require("../controllers/complaint");

const router = express.Router()

router.post('/', doubtCreate);
// router.delete('/:complaintID', deleteComplaint);
// router.get('/:type', complaintGetAll);
// router.get('/get/:complaintID', idGet);
// router.put('/:complaintID', updateStatus);
// router.get("/getById/:id", complaintByStudent);
// router.get("/teacher/:id", complaintByAllTeachers);
// router.get("/student/:id", complaintByAllStudents);
// router.get("/feedbacks/getById/:id", feedbacksByStudent);

module.exports = router;