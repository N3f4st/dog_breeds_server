const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

let app = express();
app.use(bodyParser.json({limit: '1mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));

app.use(require('./routes'));

// For not hanlded paths
app.use((req, res, done)=> {
    let err = new Error('Invalid requested path :(');
    err.status = 404;
    done(err);
});

let server = app.listen((process.env.PORT || 5000), () => {
    console.log(`Listening dogs server on port ${(process.env.PORT || 5000)}`);
});
