const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const { check } = require('express-validator');

const Admin = require('../models/Admin')

const protectAdmin = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            req.authAdmin = await Admin.findById(decodedToken._id).select('-password')

            if (!req.authAdmin) {
                res.status(400)
                throw new Error('Admin not found!')
            }

            next()
        } catch (err) {
            console.error(err.message)
            res.status(401)
            throw new Error('Not Authorized, Expired Session! Login Again.')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized!')
    }
})

const forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid email address')
];

const resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
];


module.exports = {
    protectAdmin,
    resetPasswordValidator,
    forgotPasswordValidator
}
