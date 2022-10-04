const express = require('express')

const { protectAdmin } = require('../middleware/protect')

const ccavReqHandler = require('../controllers/ccavRequestHandler'),
    ccavResHandler = require('../controllers/ccavResponseHandler.js');

const router = express.Router()

router.post('/ccavRequestHandler', function (request, response){
	ccavReqHandler.postReq(request, response);
});

router.post('/ccavResponseHandler', function (request, response){
        ccavResHandler.postRes(request, response);
});

module.exports = router
