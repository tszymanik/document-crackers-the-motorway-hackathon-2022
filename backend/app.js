require('dotenv-defaults/config');
const express = require('express')
const {uploadDocument} = require("./src/use-cases/uploadDocument");
const app = express();
const body = require('body-parser');
const {listProcessedDocuments, getProcessedDocument} = require("./src/use-cases/getProcessedDocuments");
const {returnPostV5c} = require("./src/fakes/post_v5c");
const {returnGetV5c, returnGetV5cId} = require("./src/fakes/get_v5c");
const port = 3001;
app.use(body.json());

app.post('/v5c', async (req, res) => {
    if (req.headers['x-get-fake']) {
        return res.json(returnPostV5c());
    }
    try {
        await uploadDocument(req.body);
        res.sendStatus(200);
    } catch (e) {
        console.log('There was an error uploading file!', e);
        res.sendStatus(500);
    }
})

// Input only the filename, without prefix path
app.get('/v5c/:id', async (req, res) => {
    if (req.headers['x-get-fake']) {
        return res.json(returnGetV5cId());
    }
    try {
        res.send(await getProcessedDocument(req.params.id));
    } catch (e) {
        console.log('There was a problem fetching filename', e);
        res.sendStatus(404);
    }
});

// Lists processed documents
app.get('/v5c', async (req, res) => {
    if (req.headers['x-get-fake']) {
        return res.json(returnGetV5c());
    }
    try {
        res.send(await listProcessedDocuments());
    } catch (e) {
        console.log('There was a problem listing files', e);
        res.sendStatus(500);
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
