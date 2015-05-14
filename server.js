#!/usr/bin/env node

var express = require('express');
var server = express();
var port = 9090;

server.use(express.static(__dirname + '/docs'));
server.use("/bower_components/ion/lib", express.static(__dirname + '/lib'));

server.listen(port, function() {
    console.log('Listening on port ' + port)
});

