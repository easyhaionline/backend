const asyncHandler = require('express-async-handler')
const htmlToPdf = require('html-to-pdf');

// to create a new pdf ********************************************************
const pdfMaker = asyncHandler(async (req, res) => {
    var html = '<!DOCTYPE html><html><head><title>Document 1</title></head><h1>This is Heading 1</h1><h2>This is heading 2</h2><p>This is paragraph 1</p><p>This is paragraph 2</p></html>';
    htmlToPdf.setDebug(true);
    htmlToPdf.convertHTMLString(html, '../1.pdf',(err, success) => {
        if (err) {
            console.log('Oh noes! Errorz!');
            console.log(error);
        } else {
            console.log('Woot! Success!');
            console.log(success);
        }
    });
})

// https://api.easyhaionline.com/api/awsroute/aws

module.exports = {
    pdfMaker
}
