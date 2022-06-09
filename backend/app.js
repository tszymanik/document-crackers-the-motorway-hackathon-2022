require('dotenv-defaults/config');
const express = require('express')
const {uploadDocument} = require("./src/use-cases/uploadDocument");
const app = express();
const body = require('body-parser');
const {listProcessedDocuments, getProcessedDocument} = require("./src/use-cases/getProcessedDocuments");
const {returnPostV5c} = require("./src/fakes/post_v5c");
const {returnGetV5c, returnGetV5cId} = require("./src/fakes/get_v5c");
const {getImage} = require("./src/services/imageService");
const port = 3001;
app.use(body.json({ limit: '50mb' }));

app.post('/v5c', async (req, res) => {
    if (req.headers['x-get-fake']) {
        return res.json(returnPostV5c());
    }
    try {
        const processedImages = await uploadDocument(req.body);
        res.send(processedImages);
    } catch (e) {
        console.log('There was an error uploading file!', e);
        res.status(500).send(e);
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
        res.status(404).send(e);
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
        res.status(500).send(e);
    }
})

app.get('/images/:id', async (req, res) => {
    try {
        res.json(await getImage(req.params.id));
    } catch (e) {
        console.log('There was a problem listing files', e);
        res.status(500).send(e);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
