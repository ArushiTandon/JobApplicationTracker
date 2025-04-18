const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3 = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.IAM_USER_KEY,
    secretAccessKey: process.env.IAM_USER_SECRET,
  },
});

const uploadFileToS3 = async (file) => {
  const fileName = `${Date.now()}-${file.originalname}`;
  const uploadParams = {
    Bucket: 'jobtrackerapplication',
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(uploadParams);
  await s3.send(command);

  const fileUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${fileName}`;
  return fileUrl;
};

const multer = require('multer');
const storage = multer.memoryStorage();
const uploadSingle = multer({ storage }).single('resume'); // Name must match HTML form field

module.exports = {
  uploadSingle,
  uploadFileToS3,
};
