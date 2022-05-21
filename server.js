const express = require('express');

require('dotenv').config();
let app = express();

app.use('/test', (req, resp, done)=> {
    return resp.json('Todo genial, ¿cierto?').status(200);
})

let server = app.listen((process.env.PORT || 5000), () => {
    console.log(`Listening dogs server on port ${(process.env.PORT || 5000)}`);
});
