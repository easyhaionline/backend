require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.AWS_BUCKET_NAME_COURSE_MATERIAL;
const region = process.env.AWS_BUCKET_REGION_COURSE_MATERIAL;
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY_COURSE_MATERIAL;
const secretAccessKey = process.env.AWS_BUCKET_SECRET_ACCESS_KEY_COURSE_MATERIAL;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    ContentType:'application/pdf',
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

// downloads a file from s3
function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;
