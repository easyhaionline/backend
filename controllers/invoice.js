const asyncHandler = require('express-async-handler')

const OrderDetails = require('../models/OrderDetails')
const Invoice = require('../models/invoice')

// const createInvoice = 

const createInvoice = asyncHandler(async (req, res) => {
    req.body.invoice = req.params.id
    const invoice = await Invoice.create(req.body)
    res.status(200).json(invoice)
})

const getInvoice = asyncHandler(async (req, res) => {
    const invoice = await Invoice.findOne({_id:req.params.id}).populate({path:"invoice", select: "order_id tracking_id bank_ref_no order_status payment_mode amount billing_name studentid courseid status isActive"}).populate({path:"studentid", select:"_id"}).populate({path:"courseid", select:"_id name"})
    // const invoice = await Invoice.findOne({ _id: req.params.id }).populate("invoice", "_id")
    res.status(200).json(invoice)
})

const getOrderDetails = asyncHandler(async(req, res)=> {
    const orderDetails = await OrderDetails.findOne({ studentid: req.params.id }).populate("Course", "name actualPrice discountPrice").populate("Student", "username number email")
    res.status(200).json(orderDetails)
})

module.exports = { createInvoice, getInvoice, getOrderDetails }