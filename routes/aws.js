const route = require('express').Router();
const fileUpload = require('express-fileupload')
const uploadCtrl = require('../controllers/uploader.controller')

route.use(fileUpload({
    limits:{fileSize:9*1024*1024*1024},
    uploadTimeout:99000000
    
}))
route.post("/aws",uploadCtrl.uploadFileToAws)

module.exports = route