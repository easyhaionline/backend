const asyncHandler = require('express-async-handler')
const BusinessPartner = require('../models/BusinessPartner');
const SubBusinessPartner = require('../models/SubBusinessPartner');
const subBusinessPartner = require('../models/SubBusinessPartner');
const Retailer = require("../models/Retailer")
const generateToken = require('../utils/generateToken')
const BusinessPartnerLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    // finding the parnter
    let foundPartner = await BusinessPartner.findOne({email})
    let subPartner = await subBusinessPartner.findOne({email})
    if(foundPartner){
        if(await foundPartner.matchPassword(password)){
            return res.send({
                email: foundPartner.email,
                name: foundPartner.name,
                referralCode: foundPartner.referralCode,
                id: foundPartner._id,
                phone: foundPartner.phone,
                token: generateToken(foundPartner._id),
                userType: "BusinessPartner"
            });
        }
    } else if(subPartner){
        foundPartner = await SubBusinessPartner.findOne({email})
        if(foundPartner && (await foundPartner.matchPassword(password))){
            return res.send({
                email: foundPartner.email,
                name: foundPartner.name,
                referralCode: foundPartner.referralCode,
                id: foundPartner._id,
                phone: foundPartner.phone,
                token: generateToken(foundPartner._id),
                userType: "SubBusinessPartner"
            });
        }
    }
    else{
        foundPartner = await Retailer.findOne({email})
        if(foundPartner && (await foundPartner.matchPassword(password))){
            return res.send({
                email: foundPartner.email,
                name: foundPartner.name,
                referralCode: foundPartner.referralCode,
                id: foundPartner._id,
                phone: foundPartner.phone,
                token: generateToken(foundPartner._id),
                userType: "Retailer"
            });
        }
    }
    res.status(401)
    throw new Error('Either your credentials are wrong or your account is deactivated! Try again.')
})
module.exports={
    BusinessPartnerLogin
}