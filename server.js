#!/usr/bin/env node

var fs = require('fs');
var express = require('express');
var server = express();
var port = 9090;

server.use("/js/ion", express.static("lib"));
var manifest = JSON.parse(fs.readFileSync("lib/manifest.json"))
var scripts = manifest.files.map(function(x){return "ion/" + x;});
server.use("/scripts.js", function(req, res){
    res.send("(" + JSON.stringify(scripts) + ".forEach(function(a) { document.writeln(\"<script src='/js/\" + a + \"'></script>\") }));");
});

server.use(express.static(__dirname + '/docs/www'));

server.listen(port, function() {
    console.log('Listening on port ' + port)
});

