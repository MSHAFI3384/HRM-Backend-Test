const aws = require('aws-sdk')


exports.uploadToS3 = (data) => {
    console.log('UploadToS3 ===',data)
    return new Promise((resolve, reject) => {
        aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        });
        const s3 = new aws.S3();
        const { buffer, originalname } = data
        // console.log(buffer,originalname)
        // const ext = avatar.originalname.split('.').pop();
        var params = {
            ACL: 'public-read',
            Bucket: process.env.S3_BUCKET,
            Body: buffer,
            Key: `test/${originalname}`
            // Key: `userAvatar/${fileName}_${new Date().valueOf()}.${ext}`
        };
        s3.upload(params, (err, success) => {
            if (err) {
                console.log('AWS Error===',err)
                return reject(err)
            }
            console.log('AWS Success===',success)
            return resolve(success)
        })
    })


}