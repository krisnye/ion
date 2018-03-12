void (function(){var _ion_builder_utility_ = function(module,exports,require){var buildCoffee, changeExtension, copy, copyMetadata, cp, exec, exists, exports, fixCommand, fs, getModified, getStats, isDirectory, isFile, isMatch, isWindows, list, makeDirectories, makeParentDirectories, normalizePath, np, read, removeExtension, spawn, touch, watchCoffee, write;

if (global.window) {
  return;
}

// require '../runtime/sugar'
fs = require('fs');

np = require('path');

cp = require('child_process');

isWindows = process.platform === 'win32';

fixCommand = function(command) {
  if (!isWindows) {
    command = command.replace(/\.cmd\b/, "");
  }
  return command;
};

module.exports = exports = {
  spawn: spawn = function(command, options, callback) {
    var args, child, e, originalCommand;
    originalCommand = command;
    if (command == null) {
      return typeof callback === "function" ? callback() : void 0;
    }
    command = fixCommand(command);
    if (typeof options === 'function') {
      callback = options;
      options = null;
    }
    if (options == null) {
      options = {};
    }
    if (options.stdio == null) {
      options.stdio = 'inherit';
    }
    args = command.split(/\s+/);
    command = args.shift();
    try {
      child = cp.spawn(command, args, options);
      if (callback != null) {
        child.on('exit', callback);
      }
      child.on('error', function(error) {
        console.log(`Error running ${originalCommand}\n${error}`);
        return typeof callback === "function" ? callback() : void 0;
      });
    } catch (error1) {
      e = error1;
      console.log(originalCommand);
      throw e;
    }
    return child;
  },
  exec: exec = function(command, options, callback) {
    var e, originalCommand;
    originalCommand = command;
    if (command == null) {
      return typeof callback === "function" ? callback() : void 0;
    }
    command = fixCommand(command);
    if (typeof options === 'function') {
      callback = options;
      options = null;
    }
    if (options == null) {
      options = {};
    }
    try {
      return cp.exec(command, options, function(err, stdout, stderr) {
        if (err != null) {
          console.log(err);
        }
        if (stdout != null) {
          console.log(stdout.toString());
        }
        if (stderr != null) {
          console.log(stderr.toString());
        }
        return typeof callback === "function" ? callback() : void 0;
      });
    } catch (error1) {
      e = error1;
      console.log(originalCommand);
      throw e;
    }
  },
  copyMetadata: copyMetadata = function(source, target) {
    var file, from, i, len, ref, results1, to;
    ref = ["package.json", "README.md"];
    results1 = [];
    for (i = 0, len = ref.length; i < len; i++) {
      file = ref[i];
      from = np.join(source, file);
      to = np.join(target, file);
      if (exists(from)) {
        results1.push(copy(from, to));
      } else {
        results1.push(void 0);
      }
    }
    return results1;
  },
  buildCoffee: buildCoffee = function(input, output, callback) {
    return spawn(`coffee.cmd -c -o ${output} ${input}`, callback);
  },
  watchCoffee: watchCoffee = function(input, output) {
    return spawn(`coffee.cmd -w -c -o ${output} ${input}`);
  },
  isMatch: isMatch = function(value, match, defaultValue = false) {
    var i, item, len;
    if (match == null) {
      return defaultValue;
    }
    if ('function' === typeof match) {
      return match(value);
    }
    if (Array.isArray(match)) {
// see if it matches any subitem in the array
      for (i = 0, len = match.length; i < len; i++) {
        item = match[i];
        if (isMatch(value, item)) {
          return true;
        }
      }
      return false;
    }
    value = normalizePath(value);
    if (typeof match === 'string') {
      return value.startsWith(match) || value.endsWith(match);
    }
    // return value.substring(value.length-match.length) is match
    value = value.split(/[\/\\]/g).pop();
    return typeof match.test === "function" ? match.test(value) : void 0;
  },
  defaultFileExclude: ["node_modules", "www"],
  removeExtension: removeExtension = function(file) {
    var dot;
    dot = file.lastIndexOf('.');
    if (dot > 0) {
      return file.substring(0, dot);
    } else {
      return file;
    }
  },
  changeExtension: changeExtension = function(file, ext) {
    return removeExtension(file) + ext;
  },
  touch: touch = function(file) {
    var now;
    now = new Date();
    return fs.utimesSync(file, now, now);
  },
  getModified: getModified = function(path) {
    var date, e, stats, time;
    try {
      stats = getStats(path);
      if ((stats != null ? stats.mtime : void 0) != null) {
        date = new Date(stats.mtime);
        time = date.getTime();
        return time;
      } else {
        return 0;
      }
    } catch (error1) {
      e = error1;
      console.warn(e);
    }
    return 0;
  },
  exists: exists = function(file) {
    return fs.existsSync(file);
  },
  getStats: getStats = function(file) {
    var e;
    try {
      return fs.statSync(file);
    } catch (error1) {
      e = error1;
      return null;
    }
  },
  isFile: isFile = function(file) {
    var ref;
    return ((ref = getStats(file)) != null ? typeof ref.isFile === "function" ? ref.isFile() : void 0 : void 0) === true;
  },
  isDirectory: isDirectory = function(file) {
    var ref;
    return ((ref = getStats(file)) != null ? typeof ref.isDirectory === "function" ? ref.isDirectory() : void 0 : void 0) === true;
  },
  list: list = function(dir, options = {}, files = []) {
    var exclude, file, i, len, recursive, ref, ref1, ref2;
    exclude = (ref = options.exclude) != null ? ref : exports.defaultFileExclude;
    recursive = (ref1 = options.recursive) != null ? ref1 : true;
    if (exists(dir)) {
      ref2 = fs.readdirSync(dir);
      for (i = 0, len = ref2.length; i < len; i++) {
        file = ref2[i];
        file = np.join(dir, file);
        if (!isMatch(file, exclude, false)) {
          if (isMatch(file, options.include, true)) {
            files.push(file);
          }
          if (recursive && isDirectory(file)) {
            list(file, options, files);
          }
        }
      }
    }
    return files;
  },
  makeDirectories: makeDirectories = function(dir) {
    if (typeof dir !== 'string') {
      throw new Error(`dir is not a string: ${JSON.stringify(dir)}`);
    }
    if (!exists(dir)) {
      // make parent first
      makeDirectories(np.dirname(dir));
      // make self
      return fs.mkdirSync(dir);
    }
  },
  makeParentDirectories: makeParentDirectories = function(file) {
    return makeDirectories(np.dirname(file));
  },
  read: read = function(file, encoding) {
    if (encoding === void 0) {
      encoding = 'utf8';
    }
    if (!exists(file)) {
      return null;
    }
    return fs.readFileSync(file, encoding);
  },
  write: write = function(file, content, encoding) {
    makeParentDirectories(file);
    if (content != null) {
      if (encoding === void 0 && typeof content === 'string') {
        encoding = 'utf8';
      }
      return fs.writeFileSync(file, content, encoding);
    } else if (exists(file)) {
      return fs.unlinkSync(file);
    }
  },
  // copies files or folders
  copy: copy = function(source, target, include) {
    var content, file, files, i, len, results1;
    target = np.normalize(target);
    if (isFile(source)) {
      if (isMatch(source, include, true)) {
        content = read(source);
        write(target, content);
        return console.log(`Copied: ${np.normalize(target)}`);
      }
    } else if (isDirectory(source)) {
      files = fs.readdirSync(source);
      results1 = [];
      for (i = 0, len = files.length; i < len; i++) {
        file = files[i];
        results1.push(copy(np.join(source, file), np.join(target, file), include));
      }
      return results1;
    }
  },
  normalizePath: normalizePath = function(path) {
    return path != null ? path.replace(/\\/g, "\/") : void 0;
  },
  watchCopy: function(input, output, include) {
    var watcher;
    watcher = require('./watcher');
    return watcher.watchDirectory(input, {
      include: include
    }, function(inputFile) {
      var outputFile;
      outputFile = np.join(output, np.relative(input, inputFile));
      return copy(inputFile, outputFile);
    });
  },
  getMatches: function(s, regex, group) {
    var match, results;
    if (!regex.global) {
      throw 'regex must be declared with global modifier /trailing/g';
    }
    results = [];
    while (match = regex.exec(s)) {
      results.push(group > 0 ? match[group] : match);
    }
    return results;
  }
};

// if typeof describe is 'function'
//     assert = require 'assert'
//     describe 'glass.build.utility', ->
//         describe 'isMatch', ->
//             it "should work", ->
//                 assert isMatch "foo.js", ".js"
//                 assert isMatch "foo.js", ["foo.bar","foo.js"]
//                 assert isMatch "foo.js", /\.js$/
//                 assert isMatch "foo.js", (x) -> x is "foo.js"
//                 assert not isMatch "foo.jsp", ".js"
//                 assert not isMatch "foo.jsp", ["foo.bar","foo.js"]
//                 assert not isMatch "foo.jsp", /\.js$/
//                 assert not isMatch "foo.jsp", (x) -> x is "foo.js"

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/builder/utility',_ion_builder_utility_);
    else
      _ion_builder_utility_.call(this, module, exports, require);
  }
  else {
    _ion_builder_utility_.call(this);
  }
}).call(this)