void (function(){var _ion_builder_Directory_ = function(module,exports,require){'use strict';
if (global.Window) {
    return;
}
var ion = require('../'), fs = require('fs'), np = require('path'), utility = require('./utility'), watcher = require('./watcher'), File = require('./File');
var Directory = ion.defineClass({
        name: 'Directory',
        constructor: function Directory(path) {
            if (path != null) {
                this.path = String(path);
            }
        },
        properties: {
            create: function () {
                utility.makeDirectories(this.path);
            },
            exists: {
                get: function () {
                    return fs.existsSync(this.path);
                }
            },
            path: '.',
            toString: function () {
                return this.path;
            },
            get: function (path) {
                if (this.hasOwnProperty(path) || this[path] != null) {
                    return this[path];
                }
                path = this.getAbsoluteName(path);
                if (fs.existsSync(path)) {
                    return utility.read(path);
                } else {
                    return void 0;
                }
            },
            set: function (path, content) {
                if (this.hasOwnProperty(path) || this[path] != null) {
                    return this[path] = content;
                }
                path = this.getAbsoluteName(path);
                if (content != null) {
                    console.log('Writing: ' + path);
                } else {
                    console.log('Deleting: ' + path);
                }
                utility.write(path, content);
                return content;
            },
            read: function (path) {
                if (this.hasOwnProperty(path) || this[path] != null) {
                    return this[path];
                }
                path = this.getAbsoluteName(path);
                if (fs.existsSync(path)) {
                    return utility.read(path);
                } else {
                    return void 0;
                }
            },
            write: function (path, content, encoding) {
                if (!(content != null)) {
                    return;
                }
                if (this.hasOwnProperty(path) || this[path] != null) {
                    return this[path] = content;
                }
                path = this.getAbsoluteName(path);
                if (utility.read(path, encoding) !== content) {
                    console.log('Writing: ' + path);
                    utility.write(path, content, encoding);
                }
            },
            delete: function (path) {
                console.log('Deleting: ' + path);
                path = this.getAbsoluteName(path);
                utility.write(path, null);
            },
            getFile: function (path) {
                return new File(this.getAbsoluteName(path));
            },
            getDirectory: function (path) {
                return new Directory(this.getAbsoluteName(path));
            },
            getRelativeName: function (path) {
                return np.relative(this.path, String(path));
            },
            getAbsoluteName: function (path) {
                return np.join(this.path, String(path));
            },
            search: function (include, exclude, options) {
                options = options != null ? options : { initial: false };
                if (include != null) {
                    options.include = include;
                }
                if (exclude != null) {
                    options.exclude = exclude;
                }
                var results = {};
                ion.makeReactive(results, ion.bind(function () {
                    var unwatch = watcher.watchDirectory(this.path, options, ion.bind(function (filename) {
                            var path = this.getRelativeName(filename);
                            if (fs.existsSync(filename)) {
                                if (!(results[path] != null)) {
                                    results[path] = new File(filename);
                                } else {
                                    var file = results[path];
                                    var modified = utility.getModified(filename);
                                    if (modified !== file.modified) {
                                        file.modified = modified;
                                    } else {
                                        return;
                                    }
                                }
                            } else {
                                delete results[path];
                            }
                            ion.checkForChanges();
                        }, this));
                    return unwatch;
                }, this));
                var files = utility.list(this.path, options);
                for (var _i = 0; _i < files.length; _i++) {
                    var path = files[_i];
                    results[this.getRelativeName(path)] = new File(path);
                }
                return results;
            }
        }
    });
module.exports = exports = Directory;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/builder/Directory',_ion_builder_Directory_);
    else
      _ion_builder_Directory_.call(this, module, exports, require);
  }
  else {
    _ion_builder_Directory_.call(this);
  }
}).call(this)
//# sourceMappingURL=./Directory.map