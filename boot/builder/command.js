#!/usr/bin/env node
'use strict';
if (require.main !== module) {
    return;
}
var args = process.argv.slice(2);
if (args.length === 0 || args[0] === '--help') {
    console.log('Usage: ion -c | -w | file-to-run\n  -c   compiles the local module defined in package.json\r\n  -w   compiles the local module defined in package.json and watch');
    return;
}
var ModuleBuilder = require('../builder/ModuleBuilder');
if (args[0] === '-c') {
    ModuleBuilder().watch();
    process.exit();
} else if (args[0] === '-w') {
    ModuleBuilder().watch();
} else {
    global.ion = require('../');
    var File = require('./File');
    var compiler = require('../compiler');
    for (var _i = 0; _i < args.length; _i++) {
        var arg = args[_i];
        var file = new File(arg);
        if (!file.exists) {
            throw new Error('File not found: ' + arg);
        }
        var code = file.read();
        var js = compiler.compile(code);
        eval(js);
    }
}
//@ sourceMappingURL=./command.map