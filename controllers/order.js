const asyncHandler = require('express-async-handler')
const Order = require('../models/Order')
const OrderDetails = require('../models/OrderDetails')
const Courses = require('../models/Course')
const InvoiceNumber = require('../models/InvoiceNumber')
const Invoice = require('../models/Invoice')
const { errorHandler } = require("../helpers/errorHandler");
// to create a new order ********************************************************
const placeOrder = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { course, pricing, teacher, student, isPayment } = req.body;
    const newOrder = await Order.create({ course, pricing, teacher, student, isPayment });
    if (newOrder) {
        res.status(200).json({
            message: 'Order placed successfully!',
            data: newOrder,
        })
    } 
    else {
        res.status(500)
        throw new Error("New Order can't be created at the moment! Try again later.")
    }
})

// to fetch all orders for student *******************************************************
const getOrders = asyncHandler(async (req, res) => {    
    const foundOrders = await Order.find({}).populate("course","name code desktopImage stream  program mobileImage actualPrice discountPrice code ").populate("student","name phone  email isPhoneVerified isEmailVerified  freeTrial   courses ")
    res.status(200).json(foundOrders)
})

const getOrderDetails = asyncHandler(async (req, res) => {
    
    const studentId = req.params.id

    const orders = await OrderDetails.find({studentid:studentId}).populate("courseid", "name")
    res.status(200).json(orders)
})

const getOrderDetailById = asyncHandler(async (req, res) => {
    
    const orderId = req.params.id
    const order = await OrderDetails.findOne({_id:orderId}).populate("courseid", "name")
    res.status(200).json(order)
})

const createOrderDetails = async (req, res) => {

    
    const { username, courseId, number, address, city, state, zipCode, country, price } = req.body
    
    const course = await Courses.find({_id:courseId})
    
    if(course) {
        const order = await OrderDetails.create({
            billing_name:username,
            order_id:"NaN",
            tracking_id:"NaN",
            bank_ref_no:"NaN",
            amount:price,
            billing_address:address,
            billing_city:city,
            billing_state:state,
            billing_zip:zipCode,
            billing_country:country,
            billing_tel:number,
            courseid:courseId,
            studentid:req.params.id,
            payment_mode:"Cash"
        })
        
        
        const invNum = await InvoiceNumber.find()
        
		var invoiceNum = "EHO/"
		const date = new Date()
		const finYear = (parseInt(date.toLocaleString().slice(8, 10)) + "-" + (parseInt(date.toLocaleString().slice(8, 10)) + 1))
		invoiceNum = invoiceNum + finYear + "/"
		invoiceNum = invoiceNum + "0".repeat(5 - invNum[0].invoiceNumber.toString().length) + (invNum[0].invoiceNumber + 1).toString()
		const invoice = await Invoice.create({ invoice: order._id, invoiceNo: invoiceNum })
		invNum[0].invoiceNumber = invNum[0].invoiceNumber + 1
		await InvoiceNumber.findOneAndUpdate({ _id: invNum[0]._id }, { invoiceNumber: invNum[0].invoiceNumber })
        console.log("Here we are...")

    }

    res.status(200).json("Sucessfull")
}

module.exports = {
    placeOrder,
    getOrders,
    getOrderDetails,
    getOrderDetailById,
    createOrderDetails
}
