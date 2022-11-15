const asyncHandler = require('express-async-handler')
const Order = require('../models/Order')
const OrderDetails = require('../models/OrderDetails')
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

    const orders = await OrderDetails.find({studentid:studentId}).populate("courseid")
    res.status(200).json(orders)
})

const getOrderDetailById = asyncHandler(async (req, res) => {
    
    const orderId = req.params.id
    const order = await OrderDetails.findById({_id:orderId}).populate("courseid")
    res.status(200).json(order)
})

module.exports = {
    placeOrder,
    getOrders,
    getOrderDetails,
    getOrderDetailById
}
