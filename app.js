const cors = require("cors")
const bodyParser = require('body-parser');
const express = require("express");
const upload = require('./upload');
const workspace = require('./workspace');
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/upload/sign', (req, res) => {
	const { fileName, fileType } = req.query;
	if(!fileName || !fileType) return res.sendStatus(400);
	return res.send(upload.sign(fileName, fileType));
});

app.get('/workspace/description', async (req, res) => {
	// const {  } = req.query;
	const data = await workspace.getDescription();
	return res.send(data);
});

app.listen(process.env.PORT || 3000, (error) => {
	if (!error) console.log('Server start on port');
})