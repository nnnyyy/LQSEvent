/**
 * Created by nnnyyy on 2018-11-23.
 */
'use strict';

import express from 'express';
const Router = express.Router();

Router.get('/', function(req, res, next) {
    res.render('index');
});

export default Router;