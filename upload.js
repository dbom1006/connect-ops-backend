const aws = require('aws-sdk');
const config = require('./config');
const crypto = require('crypto');
const fetch = require('node-fetch');

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
	upload: async (file) => {
		aws.config.update({
			accessKeyId: config.AWS_ACCESS_KEY,
			secretAccessKey: config.AWS_SECRET_KEY,
			region: "us-east-1"
		});
		var s3 = new aws.S3({
			apiVersion: '2006-03-01',
			params: {
				Bucket: config.AWS_BUCKET_NAME,
			}
		});
		var params = {
			Key: "create-workspaces.csv",
			ContentType: file.mimetype,
			Body: file.data,
		};

		return new Promise((res, rej) => {
			s3.putObject(params, (err, data) => {
				if (err) res(err);
				else res(data);
			})
		});
	}
};

