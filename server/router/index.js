/**
 * Created by nnnyyy on 2018-11-23.
 */
'use strict';

const express = require('express');
const Router = express.Router();

Router.get('/', function(req, res, next) {
    res.render('index');
});

Router.get('/login', function(req, res, next) {
    res.render('index');
});

Router.get('/statistics', function(req, res, next) {
    res.render('index');
});

module.exports = Router;