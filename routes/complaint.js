const express = require('express')
const { protectAdmin } = require('../middleware/protect')

const {
  complaintCreate,
  complaintGetAll,
  deleteComplaint,
  updateStatus,
  idGet,
  complaintByStudent,
  feedbacksByStudent,
  complaintByAllTeachers,
  complaintByAllStudents
} = require("../controllers/complaint");
const { ResponseCreate } = require('../controllers/response');

const router = express.Router()

// @route: POST /api/complaint
// @desc: To create a new complaint
// @access: Private
router.post('/', complaintCreate)
router.post('/response',ResponseCreate)

// @route: DELETE /api/complaint/:complaintID
// @desc: To delete an existing complaint
// @access: Private
router.delete('/:complaintID', deleteComplaint)

// @route: GET /api/complaints/:type
// @desc: To get all the complaints
// @access: Private
router.get('/:type', complaintGetAll)
router.get('/get/:id', idGet)

router.put('/:complaintID', updateStatus)

router.get("/getById/:id", complaintByStudent);
router.get("/teacher/:id", complaintByAllTeachers
);
router.get("/student/:id", complaintByAllStudents
);
router.get("/feedbacks/getById/:id", feedbacksByStudent);


module.exports = router