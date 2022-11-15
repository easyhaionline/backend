const InvoiceNumber = require('../models/InvoiceNumber')
const asyncHandler = require('express-async-handler')

const createInvoiceNumber = asyncHandler(async(req, res) => {
    const invoiceNum = await InvoiceNumber.create(req.body)
    res.json(invoiceNum)
})

const updateInvoiceNumber = asyncHandler(async(req, res) => {
    const {invoiceNumber} = req.body
    const invoiceNum = await InvoiceNumber.findOneAndUpdate({_id:req.params.id}, {invoiceNumber:invoiceNumber}, {new:true, runValidators:true})
    res.json(invoiceNum)
})

const getInvoiceNumber = asyncHandler(async(req, res) => {
    const invoiceNum = await InvoiceNumber.find()
    res.json(invoiceNum)
})


module.exports = {updateInvoiceNumber, getInvoiceNumber, createInvoiceNumber}