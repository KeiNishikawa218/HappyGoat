require('dotenv').config();
const fs = require('fs');
const AWS = require('aws-sdk');
var uuid = require('uuid');

const Canvas = require('canvas')
// Setting Image Constructor
global.Image = Canvas.Image;

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY
});

const uploadFile = (image) => {
    return new Promise((resolve, reject) => {
        // Read content from the file
        // const fileContent = fs.readFileSync(fileName);
        let fileName = uuid.v4() + '_letterImage';

        // Setting up S3 upload parameters
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: fileName, // File name you want to save as in S3
            Body: image,
            ContentType: "image/jpeg"
        };

        // Uploading files to the bucket
        s3.upload(params, function(err, data) {
            if (err) {
                // throw err;
                console.log(err);
                reject("非同期関数でエラーがありました");
            }
            console.log(`File uploaded successfully. ${data.Location}`);
            resolve(fileName);
        });
    });
};

module.exports = {
    uploadFile: uploadFile
};