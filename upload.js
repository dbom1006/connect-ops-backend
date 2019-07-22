const aws = require('aws-sdk');
const config = require('./config');

aws.config.update({
	accessKeyId: config.AWS_ACCESS_KEY,
	secretAccessKey: config.AWS_SECRET_KEY,
	region: "us-east-1"
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
	},
	put: async function (file, filetype) {
		var s3 = new aws.S3();
		var params = {
			Bucket: config.AWS_BUCKET_NAME,
			Key: "create-workspaces.csv",
			ContentType: filetype,
			Body: Buffer.from(file.data.buffer)
		};
		return new Promise((res,rej)=>{
			s3.putObject(params,(err,data)=>{
				if(err) res(err);
				else res(data);
			});
		})
	}
};

