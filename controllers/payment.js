const asyncHandler = require('express-async-handler')
var http = require('http'),
    fs = require('fs'),
    ccav = require('../utils/ccavutil'),
    qs = require('querystring');

// const RazorPay = require('razorpay')
// const Payment = require('../models/Payment')
// const validateMongoID = require('../validators/id')
// const { validateLeadInputs } = require('../validators/lead')
// const validateTypeRequire = require('../validators/type-require')
const nodeCCAvenue = require('node-ccavenue');

// to create a new Order ********************************************************

const orderCreate = asyncHandler(async (req, res) => {
    const {
      
    } = req.body

//     const ccav = new nodeCCAvenue.Configure({
//         merchant_id: 758163,
//         working_key: "5B3310F3E9B93B48728CBC801C437CED",
//       });
// // console.log(prod_working_key)
//       const orderParams = {
//         order_id: 8765432,
//         currency: 'INR',
//         amount: '100',
//         redirect_url: encodeURIComponent(`https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction  `),
//         billing_name: 'Dj',
//         // etc etc
//       };
//       const encryptedOrderData = ccav.getEncryptedOrder(orderParams);
//       console.log(encryptedOrderData); 
//       const decryptedJsonResponse = ccav.redirectResponseToJson(encryptedOrderData);
// res.json(decryptedJsonResponse.order_status)

})

// // to get all payments ***********************************************************
// const paymentGetAll = asyncHandler(async (_, res) => {
//     const foundPayments = await Payment.find().sort({ createdAt: -1 }).populate({
//         path: 'tagID',
//         select: 'name code',
//     })

//     if (foundPayments) {
//         res.status(200).json(foundPayments)
//     } else {
//         throw new Error('Some Error Occurred!')
//     }
// })

// const orderStatusUpdate = asyncHandler(async (req, res) => {
//     const { paymentID, status } = req.body

//     const { isValid, message } = validateMongoID(paymentID)
//     if (!isValid) {
//         res.status(400)
//         throw new Error(message)
//     }

//     const foundPayment = await Payment.findById(paymentID)

//     if (foundPayment) {
//         foundPayment.status = status
//         foundPayment.save()
//         res.status(200).json({ message: `Payment Status Updated to ${status}!` })
//     } else {
//         res.status(404)
//         throw new Error('Payment not found!')
//     }
// })

// const orderComplete = (_, res) => {
//     res.status(200)
//         .json({ message: 'Order Complete' })
//         .send({ message: 'Order Complete' })
// }

module.exports = {
    orderCreate,
    // orderComplete,
    // paymentGetAll,
    // orderStatusUpdate,
}

// const asyncHandler = require('express-async-handler')

// const RazorPay = require('razorpay')
// const Payment = require('../models/Payment')
// const validateMongoID = require('../validators/id')
// const { validateLeadInputs } = require('../validators/lead')
// const validateTypeRequire = require('../validators/type-require')

// const razorPayInstance = new RazorPay({
//     key_id: process.env.KEY_ID,
//     key_secret: process.env.KEY_SECRET,
// })
// // to create a new Order ********************************************************

// const orderCreate = asyncHandler(async (req, res) => {
//     const {
//         tag,
//         tagID,
//         tagName,
//         name,
//         email,
//         phone,
//         date,
//         testDate,
//         amount,
//         currency,
//         receipt,
//     } = req.body

//     // validating inputs
//     const { isValid, message } = validateLeadInputs(req.body, true)
//     if (!isValid) {
//         res.status(401)
//         throw new Error(message)
//     }

//     if (tag !== 'Fee') {
//         const { isValid: isValidTagID, message: messageTagID } = validateMongoID(tagID)
//         if (!isValidTagID) {
//             res.status(402)
//             throw new Error(messageTagID)
//         }
//     } else {
//         const { isValid: isValidTagID, message: messageTagID } = validateTypeRequire(
//             'string',
//             'Tag Name',
//             tagName
//         )
//         if (!isValidTagID) {
//             res.status(402)
//             throw new Error(messageTagID)
//         }
//     }

//     const { isValid: isValidTestDate, message: messageTestDate } = validateTypeRequire(
//         'string',
//         'Test Date',
//         testDate
//     )
//     if (!isValidTestDate) {
//         res.status(403)
//         throw new Error(messageTestDate)
//     }

//     // validate amount currency and receipt

//     const options = {
//         amount,
//         currency,
//         receipt,
//     }

//     razorPayInstance.orders.create(options, async (_, order) => {
//         if (order) {
//             const paymentObject = tagID
//                 ? {
//                       tag,
//                       tagID,
//                       name,
//                       email,
//                       phone,
//                       date,
//                       testDate,
//                       amount: amount / 100,
//                       orderID: order.id,
//                   }
//                 : {
//                       tag,
//                       tagName,
//                       name,
//                       email,
//                       phone,
//                       date,
//                       testDate,
//                       amount: amount / 100,
//                       orderID: order.id,
//                   }
//             const newPayment = await Payment.create(paymentObject)
//             if (newPayment) {
//                 res.status(201).json({
//                     message: 'Payment created successfully!',
//                     data: newPayment,
//                     orderId: order.id,
//                 })
//             } else {
//                 res.status(500)
//                 throw new Error('Error Occurred while placing the order!')
//             }
//         } else {
//             res.status(404)
//             throw new Error('Error Occurred while placing the order!')
//         }
//     })
// })

// // to get all payments ***********************************************************
// const paymentGetAll = asyncHandler(async (_, res) => {
//     const foundPayments = await Payment.find().sort({ createdAt: -1 }).populate({
//         path: 'tagID',
//         select: 'name code',
//     })

//     if (foundPayments) {
//         res.status(200).json(foundPayments)
//     } else {
//         throw new Error('Some Error Occurred!')
//     }
// })

// const orderStatusUpdate = asyncHandler(async (req, res) => {
//     const { paymentID, status } = req.body

//     const { isValid, message } = validateMongoID(paymentID)
//     if (!isValid) {
//         res.status(400)
//         throw new Error(message)
//     }

//     const foundPayment = await Payment.findById(paymentID)

//     if (foundPayment) {
//         foundPayment.status = status
//         foundPayment.save()
//         res.status(200).json({ message: `Payment Status Updated to ${status}!` })
//     } else {
//         res.status(404)
//         throw new Error('Payment not found!')
//     }
// })

// const orderComplete = (_, res) => {
//     res.status(200)
//         .json({ message: 'Order Complete' })
//         .send({ message: 'Order Complete' })
// }

// module.exports = {
//     orderCreate,
//     orderComplete,
//     paymentGetAll,
//     orderStatusUpdate,
// }
