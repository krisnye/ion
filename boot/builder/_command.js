#!/usr/bin/env node
'use strict';
var main = function () {
    var args = process.argv.slice(2);
    if (args.length === 0 || args[0] === '--help') {
        console.log('Usage: ion -c | -w | file-to-run\n  -c   compiles the local module defined in package.json\n  -w   compiles the local module defined in package.json and watch');
        return;
    }
    var ModuleBuilder = require('../builder/ModuleBuilder');
    if (args[0] === '-c' || args[0] === '-w') {
        if (args[1] != null) {
            process.chdir(args[1]);
        }
        try {
            ModuleBuilder().observe();
            if (args[0] === '-c') {
                process.exit();
            }
        } catch (e) {
            console.error(e.stack);
            process.exit(1);
        }
    } else {
        var ion = require('../');
        for (var _i = 0; _i < args.length; _i++) {
            var arg = args[_i];
            ion.runFile(arg);
        }
    }
};
module.exports = main;
if (require.main === module) {
    main();
}