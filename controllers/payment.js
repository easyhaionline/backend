const asyncHandler = require('express-async-handler')
var http = require('http'),
    fs = require('fs'),
    ccav = require('../utils/ccavutil'),
    qs = require('querystring');
const nodeCCAvenue = require('node-ccavenue');

// to create a new Order ********************************************************

const orderCreate = asyncHandler(async (req, res) => {
    const {
      
    } = req.body

})

module.exports = {
    orderCreate,
    
}

