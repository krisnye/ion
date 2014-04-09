void (function(){var _builder_File_ = function(module,exports,require){'use strict';
const fs = require('fs'), np = require('path'), utility = require('./utility'), ion = require('../');
const File = ion.defineClass({
        id: 'File',
        constructor: function File(path) {
            if ((path != null ? path.constructor : void 0) === File) {
                return path;
            }
            if (this.constructor !== File) {
                return new File(path);
            }
            if (typeof path !== 'string') {
                throw new Error('path string is required');
            }
            Object.defineProperties(this, {
                path: {
                    value: path,
                    enumerable: true,
                    writable: false
                }
            });
            this.modified = utility.getModified(path);
            ion.makeReactive(this, function () {
                let watcher;
                if (fs.existsSync(this.path)) {
                    watcher = fs.watch(this.path, function () {
                        this.modified = utility.getModified(this.path);
                    }.bind(this));
                }
                return function () {
                    return watcher != null ? watcher.close() : void 0;
                };
            }.bind(this));
        },
        properties: {
            directoryName: {
                get: function () {
                    return np.dirname(this.path);
                }
            },
            copyFrom: function (file) {
                file = File(file);
                this.write(file.read(null), null);
                console.log('Copied: ' + np.normalize(this.path));
            },
            read: function (encoding) {
                if (fs.existsSync(this.path)) {
                    return utility.read(this.path, encoding);
                } else {
                    return null;
                }
            },
            write: function (content, encoding) {
                return utility.write(this.path, content, encoding);
            },
            toString: function () {
                return this.path;
            },
            valueOf: function () {
                return this.path;
            }
        }
    });
module.exports = exports = File;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('builder/File',_builder_File_);
    else
      _builder_File_.call(this, module, exports, require);
  }
  else {
    _builder_File_.call(this);
  }
}).call(this)