var cp = require("child_process");
var np = require("path");
var args = process.argv.slice(2);
var glassTestModuleId;
try {
    // normal case
    glassTestModuleId = require.resolve('glass-test');
}
catch (e){
    //  testing ourself
    glassTestModuleId = 'lib/index.js';
}

var isWindows = process.platform == 'win32'
var ext = isWindows ? ".cmd" : "";
args = args.map(function(x){return np.normalize('./') + np.relative(np.dirname(glassTestModuleId), x);});
child = cp.spawn("node" + ext, [glassTestModuleId].concat(args), {stdio:'inherit'});
child.on('error', function(error) { console.log("Error running test: " + "node" + ext + ' ' + [glassTestModuleId].concat(args).join(' ') ); });


