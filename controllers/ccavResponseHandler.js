var http = require('http'),
	fs = require('fs'),
	ccav = require('./ccavutil.js'),
	crypto = require('crypto'),
	qs = require('querystring');

const OrderDetails = require('../models/OrderDetails');
const CourseDetails = require('../models/courseDetails');
const { Updatingcourse } = require('./admin');
const Student = require("../models/Student");
const Course = require("../models/Course");
const Invoice = require("../models/Invoice");
const InvoiceNumber = require('../models/InvoiceNumber');

// const getEndDate = (startDate, duration) => {

// 	const sDate = startDate.toISOString().slice(0, 10).split('-')
// 	const sTime = startDate.toISOString().slice(10, 24)

// 	let year = parseInt(sDate[0])
// 	let month = parseInt(sDate[1])
// 	let date = parseInt(sDate[2])


// 	if ((month + duration) % 12 != 0) {
// 		year += parseInt((month + duration) / 12)
// 		month = (month + duration) % 12
// 	} else {
// 		year += parseInt((month + duration) / 12)
// 		month = 1
// 	}

// 	return (date + "-" + month + "-" + year + sTime)
// }

exports.postRes = function (request, response) {
	var ccavEncResponse = '',
		ccavResponse = '',
		workingKey = '12AECEADC255E5A2EB26E9E631714903',	//Put in the 32-Bit key shared by CCAvenues.
		ccavPOST = '';

	//Generate Md5 hash for the key and then convert in base64 string
	var md5 = crypto.createHash('md5').update(workingKey).digest();
	var keyBase64 = Buffer.from(md5).toString('base64');

	//Initializing Vector and then convert in base64 string
	var ivBase64 = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f]).toString('base64');

	request.on('data', function (data) {
		ccavEncResponse += data;
		ccavPOST = qs.parse(ccavEncResponse);
		var encryption = ccavPOST.encResp;
		ccavResponse = ccav.decrypt(encryption, keyBase64, ivBase64);
	});


	request.on('end', async function () {
		var pData = '';
		pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>'
		pData = pData + ccavResponse.replace(/=/gi, '</td><td>')
		pData = pData.replace(/&/gi, '</td></tr><tr><td>')
		pData = pData + '</td></tr></table>'
		htmlcode = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>' + pData + '</center><br></body></html>';

		const ccavenuedata = JSON.parse('{"' + decodeURI(ccavResponse).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');


		console.log(ccavenuedata);

		let orderData = {
			order_id: ccavenuedata.order_id,
			tracking_id: ccavenuedata.tracking_id,
			bank_ref_no: ccavenuedata.bank_ref_no,
			order_status: ccavenuedata.order_status,
			payment_mode: ccavenuedata.payment_mode,
			amount: ccavenuedata.amount,
			billing_name: ccavenuedata.billing_name,
			billing_address: ccavenuedata.billing_address,
			billing_city: ccavenuedata.billing_city,
			billing_state: ccavenuedata.billing_state,
			billing_zip: ccavenuedata.billing_zip,
			billing_country: ccavenuedata.billing_country,
			billing_tel: ccavenuedata.billing_tel,
			courseid: ccavenuedata.merchant_param1,
			studentid: ccavenuedata.merchant_param2
		}

		const orderDetails = await OrderDetails.create(orderData);

		if (orderDetails) {
			const email = ccavenuedata.billing_email;
			const mobile = ccavenuedata.billing_tel;

			const invNum = await InvoiceNumber.find()

			var invoiceNum = "EHO/"
			const date = new Date()
			const finYear = ((date.toLocaleString().slice(8, 10)) + "-" + (parseInt(date.toLocaleString().slice(8, 10)) + 1))
			invoiceNum = invoiceNum + finYear + "/"
			invoiceNum = invoiceNum + "0".repeat(5 - invNum[0].invoiceNumber.toString().length) + invNum[0].invoiceNumber.toString()

			const invoice = await Invoice.create({ invoice: orderDetails._id, invoiceNo: invoiceNum })

			invNum[0].invoiceNumber = invNum[0].invoiceNumber + 1
			await InvoiceNumber.findOneAndUpdate({ _id: invNum[0]._id }, { invoiceNumber: invNum[0].invoiceNumber })

			// finding the admin whose details are need to be updated
			const foundAdmin = await Student.findById(
				ccavenuedata.merchant_param2
			)

			const course = await Course.findOne({ _id: orderData.courseid })

			if (course.startDate != null && course.endDate != null) {
				foundAdmin.startDate.push(course.startDate)
				foundAdmin.endDate.push(course.endDate)
			} else {
				let startDate
				let endDate
				startDate = new Date().toISOString().slice(0, 10).split('-')
				const sTime = startDate.toISOString().slice(10, 24)

				let year = parseInt(startDate[0])
				let month = parseInt(startDate[1])
				let date = parseInt(startDate[2])


				if ((month + course.time) % 12 != 0) {
					year += parseInt((month + course.time) / 12)
					month = (month + course.time) % 12
				} else {
					year += parseInt((month + course.time) / 12)
					month = 1
				}

				endDate = date + "-" + month + "-" + year + sTime
				
				foundAdmin.startDate.push(startDate)
				foundAdmin.endDate.push(endDate)
			}


			if (foundAdmin) {

				foundAdmin.courses.push(ccavenuedata.merchant_param1);


				foundAdmin.doubtCredits = foundAdmin.doubtCredits + 100
				foundAdmin.save()
			}

			await CourseDetails.updateMany({ email: foundAdmin.email, status: "new" }, { status: 'old' });
			await CourseDetails.updateMany({ mobile: foundAdmin.number, status: "new" }, { status: 'old' });

			// res.status(200).json(orderDetails._id)
			response.redirect(`https://www.student.easyhaionline.com/myorders/${orderDetails._id}`);

		} else {
			response.status(500)
			throw new Error("Order Details can't be created at the moment! Try again later.")
		}
	});
};
