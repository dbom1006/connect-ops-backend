const aws = require('aws-sdk');
const config = require('./config');

aws.config.update({
	accessKeyId: config.AWS_ACCESS_KEY,
	secretAccessKey: config.AWS_SECRET_KEY,
	region: "us-east-1",
});

exports = module.exports = {
	getDescription: async function (filename, filetype) {
		var workspace = new aws.WorkSpaces();
		var params = {
			Bucket: config.AWS_BUCKET_NAME,
			Key: filename,
			Expires: 60,
			ContentType: filetype
		};
		return new Promise((res,rej)=>{
			workspace.describeWorkspaces({},(err,data)=>{
				if(err) rej(err);
				else res(data);
			});
		})
	}
};