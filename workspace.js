const aws = require('aws-sdk');
const config = require('./config');

aws.config.update({
	accessKeyId: config.AWS_ACCESS_KEY,
	secretAccessKey: config.AWS_SECRET_KEY,
	region: "us-east-1",
});

exports = module.exports = {
	getDescription: async function (filters = []) {
		var workspace = new aws.WorkSpaces();
		return Promise.all(filters.filter(x => x.DirectoryId && x.UserName).map(filter => {
			return new Promise((res, rej) => {
				workspace.describeWorkspaces({
					UserName: filter.UserName,
					DirectoryId: filter.DirectoryId,
				}, (err, data) => {
					if (err) rej(err);
					else res(data.Workspaces[0]);
				});
			});
		}));
	}
};