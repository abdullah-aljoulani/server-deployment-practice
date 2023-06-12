'use strict';

const express = require('express');
const  app = express();

const cors = require('cors');
app.use(cors());


const stamper = require('./middleware/stamper');
const pageNotFound = require('./middleware/404');
const serverError = require('./middleware/500')

app.get('/', stamper, handleHome);
app.get('/bad', badRequest);

app.use('*', pageNotFound);
app.use(serverError);

function handleHome(req, res) {
    res.status(200).json({
    code: 200,
    message: 'Welcome to Home page',
    time: req.stamper
    })
}

function badRequest(req, res, next) {
    req.body = {
    test: 'test'
    }
    next({message: 'Not a Number'})
}


function start(port) {
    app.listen(port, () => console.log('Up and running on port: ', port))
}

module.exports = {
    app,
    start
}