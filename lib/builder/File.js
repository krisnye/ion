void (function(){var _ion_builder_File_ = function(module,exports,require){'use strict';
if (global.Window) {
    return;
}
var ion = require('../'), fs = require('fs'), np = require('path'), utility = require('./utility');
var File = ion.defineClass({
        name: 'File',
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
            ion.makeReactive(this, ion.bind(function () {
                var watcher;
                if (fs.existsSync(this.path)) {
                    watcher = fs.watch(this.path, ion.bind(function () {
                        var modified = utility.getModified(this.path);
                        if (this.modified !== modified) {
                            this.modified = modified;
                            ion.checkForChanges();
                        }
                    }, this));
                }
                return function () {
                    return watcher != null ? watcher.close() : void 0;
                };
            }, this));
        },
        properties: {
            isFile: {
                get: function () {
                    return !this.isDirectory;
                }
            },
            isDirectory: {
                get: function () {
                    return fs.statSync(this.path).isDirectory();
                }
            },
            directoryName: {
                get: function () {
                    return np.dirname(this.path) != null ? np.dirname(this.path) : '';
                }
            },
            exists: {
                get: function () {
                    return fs.existsSync(this.path);
                }
            },
            copyFrom: function (file) {
                file = File(file);
                var content = file.read(null);
                if (content.length === 0) {
                    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n' + file + ' ' + file.modified + '\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\nXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
                } else {
                    this.write(content, null);
                    console.log('Copied: ' + np.normalize(this.path));
                }
            },
            read: function () {
                var _lastModified = {};
                var _content = {};
                return function (encoding) {
                    if (fs.existsSync(this.path)) {
                        var modified = utility.getModified(this.path);
                        var content;
                        if (modified === _lastModified[this.path]) {
                            content = _content[this.path];
                        } else {
                            content = utility.read(this.path, encoding);
                            if (content.length > 0) {
                                _content[this.path] = content;
                                _lastModified[this.path] = modified;
                            } else {
                                delete _content[this.path];
                                delete _lastModified[this.path];
                            }
                        }
                        return content;
                    } else {
                        return null;
                    }
                };
            }(),
            getExtension: function () {
                var index = this.path.lastIndexOf('.');
                return index < 0 ? '' : this.path.substring(index);
            },
            write: function (content, encoding) {
                if (content != null && content !== this.read(encoding)) {
                    utility.write(this.path, content, encoding);
                }
            },
            delete: function () {
                return utility.write(this.path, null);
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
      require.register('ion/builder/File',_ion_builder_File_);
    else
      _ion_builder_File_.call(this, module, exports, require);
  }
  else {
    _ion_builder_File_.call(this);
  }
}).call(this)