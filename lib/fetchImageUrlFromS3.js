require('dotenv').config();
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY
});

const fetchImageUrl = (image) => {
    // Setting up S3 upload parameters
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: image
    };

    // Uploading files to the bucket
    s3.getObject(params, function(err, data) {
        if (err) {
            // throw err;
            console.log(err);
        }
        console.log(`File downloaded successfully.`);
    });

    // S3の画像URLを返す
    return image;
};

module.exports = {
    fetchImageUrl: fetchImageUrl
};