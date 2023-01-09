const AWS = require('aws-sdk')

const s3= new AWS.S3({
    accessKeyId:process.env.AWS_BUCKET_ACCESS_KEY_EASYHAI_COMPLAINTS,
    secretAccessKey:process.env.AWS_BUCKET_SECRET_ACCESS_KEY_EASYHAI_COMPLAINTS
})

async function uploadFileAws(file){
    const fileName = `${new Date().getTime()}_${file.name}`;
    const mimetype= file.mimetype;
    const params = {
        Bucket:process.env.AWS_BUCKET_NAME_EASYHAI_COMPLAINTS,
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
    uploadFileAws
}