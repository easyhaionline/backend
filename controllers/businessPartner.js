const asyncHandler = require('express-async-handler')
const BusinessPartner = require('../models/BusinessPartner');
const SubBusinessPartner = require('../models/SubBusinessPartner');
const subBusinessPartner = require('../models/SubBusinessPartner');

const generateToken = require('../utils/generateToken')
const BusinessPartnerLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // finding the parnter
    let foundPartner = await BusinessPartner.findOne({email})

    if(foundPartner){
        if(await foundPartner.matchPassword(password)){
            return res.send({
                email: foundPartner.email,
                id: foundPartner._id,
                phone: foundPartner.phone,
                token: generateToken(foundPartner._id),
                userType: "BusinessPartner"
            }); 
        }
    } else{
        foundPartner = await SubBusinessPartner.findOne({email})
        if(foundPartner && (await foundPartner.matchPassword(password))){
            return res.send({
                email: foundPartner.email,
                id: foundPartner._id,
                phone: foundPartner.phone,
                token: generateToken(foundPartner._id),
                userType: "SubBusinessPartner"
            });
        }
    }
    
    res.status(401)
    throw new Error('Either your credentials are wrong or your account is deactivated! Try again.')
})



module.exports={
    BusinessPartnerLogin
}