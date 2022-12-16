const express = require('express')
const router = express.Router()
const {
    studentRegister,
    studentLogin
}  = require('../controllers/studentApp');


router.post('/student/register' , studentRegister);
router.post('/student/login' , studentLogin);


module.exports = router
