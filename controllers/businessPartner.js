const asyncHandler = require('express-async-handler')
const BusinessPartner = require('../models/BusinessPartner');
const subBusinessPartner = require('../models/SubBusinessPartner');

const generateToken = require('../utils/generateToken')
const BusinessPartnerLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // finding the parnter
    const foundPartner = await BusinessPartner.findOne({email})

    if (foundPartner && (await foundPartner.matchPassword(password))) {
        res.send({
            email: foundPartner.email,
            id: foundPartner._id,
            phone: foundPartner.phone,
            token: generateToken(foundPartner._id),
        })
    } else {
        res.status(401)
        throw new Error(
            'Either your credentials are wrong or your account is deactivated! Try again.'
        )
    }
})

module.exports={
    BusinessPartnerLogin
}