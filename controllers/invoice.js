const asyncHandler = require('express-async-handler')
const Invoice = require("../models/invoice");
const easyinvoice = require('easyinvoice');
const fs = require('fs');
// const axios = require('axios')
const fetch = require('isomorphic-fetch')
const FormData = require('form-data')

const uploadMedia = async (data) => {
    let link = await fetch(`https://api.easyhaionline.com/api/awsroute/aws`, {
        method: "POST",
        headers: { 
            "Accept":"file/pdf", 
            "Content-Type":"application/pdf" 
        },
        body: (data),
    })

    console.log("Hello:")
    
    return link
}


const createInvoice = asyncHandler(async(req, res) => {
    
    const data = req.body
    let link = ''
    await easyinvoice.createInvoice(data, function (result) {
        // fs.writeFileSync("invoice.pdf", result.pdf, 'base64');
        const formData = new FormData();
        formData.append("media", fs.createReadStream(result.pdf));
        link += uploadMedia(formData)
    })
    
    
    // const handleFileLink = (event) => {
        //     .then((data, error) => {
            //         if (error) {
    //             console.log(error);
    //             return;
    //         }
    //         return data;
    //     })
    //     .then((data) => {
    //     })
    // }

    
    req.body.invoice.link = link
    console.log(link)

    // req.body.student = req.params.id
    const invoice = await Invoice.create()

    res.json({invoice})
})

module.exports = {createInvoice}