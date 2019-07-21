const aws = require('aws-sdk');
const config = require('./config');

aws.config.update({
	accessKeyId: config.AWS_ACCESS_KEY,
	secretAccessKey: config.AWS_SECRET_KEY
});

exports = module.exports = {
	sign: function (filename, filetype) {
		var s3 = new aws.S3();
		var params = {
			Bucket: config.AWS_BUCKET_NAME,
			Key: filename,
			Expires: 60,
			ContentType: filetype
		};
		return s3.getSignedUrl("putObject", params);
	}
};