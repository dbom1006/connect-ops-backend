const cors = require("cors")
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const express = require("express");
const fetch = require('node-fetch');
const upload = require('./upload');
const workspace = require('./workspace');
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({
	limits: { fileSize: 100 * 1024 * 1024 },
}));

app.post('/upload', async (req, res) => {
	const { file } = req.files;
	const { fileType } = req.body;
	if (!fileType) return res.sendStatus(400);
	const data = await upload.upload(file);
	return res.send(data);
});

app.get('/workspace/description', async (req, res) => {
	// const {  } = req.query;
	const data = await workspace.getDescription();
	return res.send(data);
});

app.post('/workspace/lauch',async (req,res)=>{
	const url = 'http://3.212.192.22/api/v2/job_templates/10/launch/';
	const data = await fetch.default(url,{
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer 020gdJswzwyJgNGfyGal2AlbNtCHOJ"
		}
	}).then(x=>x.json());
	res.send(data);
})

app.listen(process.env.PORT || 8000, (error) => {
	if (!error) console.log('Server start on port');
})