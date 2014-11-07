void (function(){var _ion_test_sourceSize_ = function(module,exports,require){'use strict';
if (global.window) {
    return;
}
var fs = require('fs');
var np = require('path');
var total = 0;
var files = 0;
var printSize = function (fileOrDirectory) {
    var stats = fs.statSync(fileOrDirectory);
    if (stats.isDirectory()) {
        {
            var _ref = fs.readdirSync(fileOrDirectory);
            for (var _i = 0; _i < _ref.length; _i++) {
                var file = _ref[_i];
                printSize(np.join(fileOrDirectory, file));
            }
        }
    } else {
        if (fileOrDirectory.match(/\.css$/)) {
            return;
        }
        var content = fs.readFileSync(fileOrDirectory, 'utf8');
        var size = 0;
        {
            var _ref2 = content.split(/[\r\n]+/g);
            for (var _i2 = 0; _i2 < _ref2.length; _i2++) {
                var line = _ref2[_i2];
                var chars = line.trim();
                var comment = chars.match(/^(#|(\/\/))/);
                if (!comment) {
                    size += chars.length;
                }
            }
        }
        total += size;
        files++;
        console.log(fileOrDirectory + ' : ' + size);
    }
};
if (require.main === module) {
    var args = process.argv.slice(2);
    for (var _i3 = 0; _i3 < args.length; _i3++) {
        var arg = args[_i3];
        printSize(arg);
    }
    console.log('---------------------------------------');
    console.log('Total Files : ' + files);
    console.log('Total Bytes : ' + total);
}
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/test/sourceSize',_ion_test_sourceSize_);
    else
      _ion_test_sourceSize_.call(this, module, exports, require);
  }
  else {
    _ion_test_sourceSize_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./sourceSize.map