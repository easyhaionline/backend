const AWS = require('aws-sdk')
const {Storage} = require('@google-cloud/storage');

const s3= new AWS.S3({
    accessKeyId:process.env.AWS_BUCKET_ACCESS_KEY_COURSE_MATERIAL,
secretAccessKey:process.env.AWS_BUCKET_SECRET_ACCESS_KEY_COURSE_MATERIAL
})

 
async function uploadFileToAws(file){
    const fileName = `${new Date().getTime()}_${file.name}`;
    const mimetype= file.mimetype;
    const params = {
        Bucket:process.env.AWS_BUCKET_NAME_COURSE_MATERIAL,
        Key:fileName,
        Body:file.data,
        ContentType:mimetype,
 
    
    };
    console.log(params,s3)
    const res = await new Promise((resolve,reject)=>{
        s3.upload(params,(err,data)=>err==null?resolve(data):reject(err));
    })
    return {fileUrl:res.Location};

}


module.exports={
    uploadFileToAws
}