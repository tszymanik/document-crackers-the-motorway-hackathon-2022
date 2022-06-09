const express = require('express')
const {uploadDocument} = require("./src/use-cases/uploadDocument");
const app = express();
const body = require('body-parser');
const port = 3001;
app.use(body.json());

app.post('/v5c', async (req, res) => {
    console.log('file uploaded', req.body);
    await uploadDocument(req.body);
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
