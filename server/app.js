/**
 * Created by nnnyyy on 2018-11-21.
 */
const express = require('express');
const path = require('path');
const ServerManager = require('./modules/ServerManager.js');
const routes = require('./router/index.js');

const app = express();

app.set('views', path.join(__dirname, '..','view'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '..','dist')));
app.use(express.static(path.join(__dirname, '..','public')));

app.use('/', routes );

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');

});