const fileUploadService =  require('../service/upload.complaint')

async function uploadFileAws(req,res,next){
    try {
        if(req.files&&req.files.media){
        const file = req.files.media;
        const uploadRes = await fileUploadService.uploadFileAws(file);
        return res.send(uploadRes);
        }
        const errMsg={
            message:'FILES_NOT_FOUND',
            messageCode:'FILES_NOT_FOUND',
            statusCode:404
        }
        return res.status(404).send(errMsg)
    } catch (error) {
        return next(error);
    }
}

module.exports={
    uploadFileAws 
}