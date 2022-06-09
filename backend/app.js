require('dotenv-defaults/config');
const express = require('express')
const {uploadDocument} = require("./src/use-cases/uploadDocument");
const app = express();
const body = require('body-parser');
const {listProcessedDocuments, getProcessedDocument} = require("./src/use-cases/getProcessedDocuments");
const port = 3001;
app.use(body.json());

app.post('/v5c', async (req, res) => {
    console.log('file uploaded', req.body);
    await uploadDocument(req.body);
    res.sendStatus(200);
})

// Input only the filename, without prefix path
app.get('/v5c/:id', async (req, res) => {
    res.send(await getProcessedDocument(req.params.id));
});

// Lists processed documents
app.get('/v5c', async (req, res) => {
    res.send(await listProcessedDocuments());
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
