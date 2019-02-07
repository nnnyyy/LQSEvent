/**
 * Created by nnnyyy on 2018-11-23.
 */
'use strict';

const express = require('express');
const Router = express.Router();
const DBHelper = require('../modules/DBHelper');

Router.get('/checklogin', function(req, res, next) {    
    res.send({ret: req.session.userdata ? 0 : -1 });
});

Router.post('/login', function(req, res, next) {    
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress.substr(7);
    
    const sm = req.sm;
    sm.login( req.body.id, req.body.pw, ip, result => {

        if( result.ret === 0 ) {
            req.session.userdata = result.userinfo;
            req.session.save();
        }        

        res.send({ret: result.ret});
    });
});

Router.post('/login', (req,res,next)=> {
    const sm = req.sm;

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress.substr(7);
    const id = req.body.id;
    const pw = req.body.pw;    

    let oPacket = { ret: 0 }

    sm.login(id, pw, ip, result=> {
        res.send( oPacket );
    });
});

module.exports = Router;