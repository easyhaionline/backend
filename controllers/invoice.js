const asyncHandler = require('express-async-handler')
const Invoice = require("../models/invoice");
// const orderDetails = require('../models/OrderDetails')

const createInvoice = asyncHandler(async (req, res) => {

    const invoice = await Invoice.create(req.body)
    res.json({ invoice })
})

const getInvoice = asyncHandler(async (req, res) => {

    const invoice = await Invoice.findOne({ _id: req.params.id })
    if (!invoice) {
        res.status(404);
        throw new Error("Invoice not found");
    }

    res.status(200)
    res.json({invoice})
})

module.exports = { createInvoice, getInvoice }