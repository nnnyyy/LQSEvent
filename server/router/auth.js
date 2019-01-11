/**
 * Created by nnnyyy on 2018-11-23.
 */
'use strict';

const express = require('express');
const Router = express.Router();

Router.get('/checklogin', function(req, res, next) {    
    res.send({ret: req.session.user ? 0 : -1 });
});

module.exports = Router;