const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

let app = express();
app.use(bodyParser.json({limit: '1mb', extended: false}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: false}));

// For testing purposes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


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
