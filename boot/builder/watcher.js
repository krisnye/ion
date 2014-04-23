void (function(){var _ion_builder_watcher_ = function(module,exports,require){var allWatchers, fs, np, util;

if (global.window) {
  return;
}

fs = require('fs');

np = require('path');

util = require('./utility');

exports.watchDirectory = function(dirname, options, listener) {
  var filter, fsListener, initial, notifyListener, unwatchFile, watchFile, watchedFiles;
  if (listener == null) {
    listener = options;
    options = {};
  }
  if (options.persistent == null) {
    options.persistent = true;
  }
  if (options.interval == null) {
    options.interval = 100;
  }
  if (options.recursive == null) {
    options.recursive = true;
  }
  if (options.initial == null) {
    options.initial = 'initial';
  }
  if (options.exclude == null) {
    options.exclude = util.defaultFileExclude;
  }
  filter = function(name) {
    if (util.isMatch(name, options.exclude, false)) {
      return false;
    } else {
      return util.isMatch(name, options.include, true);
    }
  };
  watchedFiles = {};
  notifyListener = function(filename, curr, prev, change, async) {
    if (async == null) {
      async = false;
    }
    if (filter(filename)) {
      if (async) {
        return process.nextTick(function() {
          return listener(filename, curr, prev, change);
        });
      } else {
        return listener(filename, curr, prev, change);
      }
    }
  };
  fsListener = function(filename, depth, curr, prev) {
    var change;
    change = curr.nlink === 0 ? 'deleted' : prev.nlink === 0 ? 'created' : 'modified';
    notifyListener(filename, curr, prev, change);
    if (change !== 'deleted') {
      return watchFile(filename, depth, curr);
    } else {
      return unwatchFile(filename);
    }
  };
  unwatchFile = function(filename) {
    fs.unwatchFile(filename, watchedFiles[filename]);
    delete watchedFiles[filename];
    return allWatchers[filename]--;
  };
  watchFile = function(filename, depth, stats) {
    var boundListener, child, _i, _len, _ref;
    if (depth == null) {
      depth = 0;
    }
    if (fs.existsSync(filename)) {
      if (stats == null) {
        stats = fs.statSync(filename);
      }
      if (stats.nlink > 0) {
        if (stats.isDirectory()) {
          if (!util.isMatch(filename, options.exclude, false)) {
            if (depth === 0 || options.recursive) {
              _ref = fs.readdirSync(filename);
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                child = _ref[_i];
                child = np.join(filename, child);
                watchFile(child, depth + 1);
              }
            }
          }
        }
        if (watchedFiles[filename] == null) {
          if (allWatchers[filename] == null) {
            allWatchers[filename] = 0;
          }
          allWatchers[filename]++;
          boundListener = fsListener.bind(this, filename, depth);
          watchedFiles[filename] = boundListener;
          fs.watchFile(filename, options, boundListener);
          if (initial) {
            notifyListener(filename, stats, stats, initial, true);
          }
        }
      }
    }
  };
  initial = options.initial;
  watchFile(dirname);
  initial = 'created';
  return function() {
    var key, _results;
    _results = [];
    for (key in watchedFiles) {
      _results.push(unwatchFile(key));
    }
    return _results;
  };
};

allWatchers = {};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/builder/watcher',_ion_builder_watcher_);
    else
      _ion_builder_watcher_.call(this, module, exports, require);
  }
  else {
    _ion_builder_watcher_.call(this);
  }
}).call(this)