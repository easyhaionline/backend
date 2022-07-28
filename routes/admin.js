const express = require('express')

const { protectAdmin,forgotPasswordValidator,resetPasswordValidator  } = require('../middleware/protect')
const {
    adminRegisterSuper,
    adminRegisterTeacher,
    adminRegister,
    adminLogin,
    adminToggle,
    adminGetAll,
    adminUpdate,
    resetPassword,forgotPassword,
    forgotPasswordStudent,resetPasswordStudent,
    encryprttoken,
    studentRegister,
    profileUpdate,
    adminGetAllStudents,
    adminGetAllTeachers,
    parentLogin,
    parentRegister,
    studentsByCourseFilter,
    studentsBySearchFilter,
    adminRegisterbynumber,studentLogin,teacherLogin,
    sendotp,
    Updatingcourse,
    adminGetcourse,
    teacherToggle,
    removeTeacher,
    studentToggle,
removeStudent
 
} = require('../controllers/admin');



const router = express.Router();

// @route: POST /api/admin/super
// @desc: To register a new SUPER admin
// @access: Public
if (process.env.NODE_ENV === 'development') {
    router.post('/super', protectAdmin, adminRegisterSuper); // <--- add this route ONLY in development
}

// @route: POST /api/admin/teacher
// @desc: To register a new SUPER admin
// @access: Private
router.post('/teacher', adminRegisterTeacher);

// @route: POST /api/admin/student
// @desc: To login student
// @access: Private
router.post('/student/login', studentLogin);

// @route: POST /api/admin/parent
// @desc: To login parent
// @access: Private
router.post('/parent/login', parentLogin);


// @route: POST /api/admin/parent
// @desc: To signup parent
// @access: Private
router.post('/parent/signup', parentRegister);





// @route: GET /api/admin/student
// @desc: To Get student
// @access: Private

router.get('/students',protectAdmin, adminGetAllStudents);

// @route: GET /api/admin/teachers
// @desc: To Get teachers
// @access: Private

router.get('/teachers',protectAdmin, adminGetAllTeachers);

// @route: POST /api/admin/teacher
// @desc: To login teacher
// @access: Private
router.post('/teacher/login', teacherLogin);

// @route: POST /api/admin
// @desc: To register a new admin
// @access: Private
// router.post('/', protectAdmin, adminRegister)
router.post('/', adminRegister);


// @route: POST /api/admin
// @desc: To register a new course
// @access: Private
// router.post('/update-course/:id', protectAdmin, Updatingcourse)
router.post('/update-course/:id', Updatingcourse);

router.delete('/toggle-teacher/:id',teacherToggle);

router.delete('/toggle-student/:id',studentToggle);

router.delete('/remove-student/:id',removeStudent);

router.delete('/remove-teacher/:id',removeTeacher);
// @route: POST /api/student
// @desc: To register a new admin
// @access: Private
// router.post('/student/signup', protectAdmin, studentRegister)
router.post('/student/signup', studentRegister);


+
router.post('/withmobile/', adminRegisterbynumber);


router.get('/gettoken/:id',encryprttoken);


router.post('/get-students', studentsBySearchFilter);
router.get('/get-course/:id', adminGetcourse);

router.get('/get-student/:course',studentsByCourseFilter);

router.put('/forgot-password', forgotPasswordValidator, forgotPassword);


router.put('/reset-password', resetPasswordValidator,  resetPassword);


router.put('/student/forgot-password', forgotPasswordValidator, forgotPasswordStudent);


router.put('/student/reset-password', resetPasswordValidator,  resetPasswordStudent);




// @route: POST /api/admin/login
// @desc: To login an existing admin
// @access: Public
router.post('/login', adminLogin);

// @route: POST /api/admin/send-otp
// @desc: To send-otp
// @access: Public
router.post('/send-otp', sendotp);

// @route: DELETE /api/admin/:adminEmail
// @desc: To delete other admin
// @access: Private
router.delete('/:adminEmail', protectAdmin, adminToggle);

// @route: GET /api/admin
// @desc: To get all admins
// @access: Private
router.get('/', protectAdmin, adminGetAll);

// @route: PUT /api/admin
// @desc: To update details of an admin
// @access: Private
router.put('/', protectAdmin, adminUpdate);

// @route: PUT /api/admin
// @desc: To update details of an admin
// @access: Private
router.put('/profile-update',  profileUpdate);

module.exports = router;
