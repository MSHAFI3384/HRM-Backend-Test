const aws = require('aws-sdk')


exports.uploadToS3 = (data) => {
    return new Promise((resolve, reject) => {
        aws.config.setPromisesDependency();
        aws.config.update({
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        });
        const s3 = new aws.S3();
        const { avatar, fileName } = data
        const ext = avatar.originalname.split('.').pop();
        var params = {
            ACL: 'public-read',
            Bucket: process.env.bucket,
            Body: avatar.buffer,
            Key: `userAvatar/${fileName}_${new Date().valueOf()}.${ext}`
        };
        s3.upload(params, (err, success) => {
            if (err) {
                return reject(err)
            }
            return resolve(success)
        })
    })


}