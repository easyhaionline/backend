const route = require('express').Router();
const fileUpload = require('express-fileupload')
const uploadCtrl = require('../controllers/upload.controller');

route.use(fileUpload({
    limits:{fileSize:6*1024*1024*1024}
    
}))
route.post('/complaints',uploadCtrl.uploadFileAws)

module.exports = route