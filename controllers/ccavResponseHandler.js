var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    crypto = require('crypto'),
    qs = require('querystring');

const OrderDetails = require('../models/OrderDetails');
const CourseDetails = require('../models/courseDetails');
const {Updatingcourse} = require('./admin');
const Student = require("../models/Student");


exports.postRes = function(request,response){
    var ccavEncResponse='',
	ccavResponse='',	
	workingKey = '12AECEADC255E5A2EB26E9E631714903',	//Put in the 32-Bit key shared by CCAvenues.
	ccavPOST = '';
	
    //Generate Md5 hash for the key and then convert in base64 string
    var md5 = crypto.createHash('md5').update(workingKey).digest();
    var keyBase64 = Buffer.from(md5).toString('base64');

    //Initializing Vector and then convert in base64 string
    var ivBase64 = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d,0x0e, 0x0f]).toString('base64');

	request.on('data', function (data) {
		ccavEncResponse += data;
		ccavPOST =  qs.parse(ccavEncResponse);
		var encryption = ccavPOST.encResp;
		ccavResponse = ccav.decrypt(encryption, keyBase64, ivBase64);
	});


	request.on('end', async function () {
	    var pData = '';
	    pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>'	
	    pData = pData + ccavResponse.replace(/=/gi,'</td><td>')
	    pData = pData.replace(/&/gi,'</td></tr><tr><td>')
	    pData = pData + '</td></tr></table>'
		htmlcode = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>'+ pData +'</center><br></body></html>';

		const ccavenuedata = JSON.parse('{"' + decodeURI(ccavResponse).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
		

		console.log(ccavenuedata);

		let orderData = {
			order_id : ccavenuedata.order_id,
			tracking_id : ccavenuedata.tracking_id,
			bank_ref_no : ccavenuedata.bank_ref_no,
			order_status : ccavenuedata.order_status,
			payment_mode : ccavenuedata.payment_mode,
			amount : ccavenuedata.amount,
			billing_name : ccavenuedata.billing_name,
			courseid :	ccavenuedata.merchant_param1,
			studentid : ccavenuedata.merchant_param2
		}

		const orderDetails = await OrderDetails.create(orderData);
	
		if (orderDetails) {
			const email = ccavenuedata.billing_email;
			const mobile = ccavenuedata.billing_tel;
			
			
			// finding the admin whose details are need to be updated
			const foundAdmin = await Student.findById(
				ccavenuedata.merchant_param2
			)

			if (foundAdmin) {

				foundAdmin.courses.push(ccavenuedata.merchant_param1);
				foundAdmin.save()

			}

			await CourseDetails.updateMany({ email : foundAdmin.email, status : "new"}, {status: 'old'});
			await CourseDetails.updateMany({ mobile: foundAdmin.number, status : "new"}, {status: 'old'});

			res.status(200).json(orderDetails._id)
			response.redirect("https://student.easyhaionline.com/myorder");
			
		} else {
			response.status(500)
			throw new Error("Order Details can't be created at the moment! Try again later.")
		}
	}); 	
};
