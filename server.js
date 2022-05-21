const express = require('express');

require('dotenv').config();
let app = express();

app.use('/test', (req, resp, done)=> {
    return resp.json('Todo genial, ¿cierto?').status(200);
})

// For not hanlded paths
app.use((req, res, done)=> {
    let err = new Error('Invalid requested path :(');
    err.status = 404;
    done(err);
});

let server = app.listen((process.env.PORT || 5000), () => {
    console.log(`Listening dogs server on port ${(process.env.PORT || 5000)}`);
});
