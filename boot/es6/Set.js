void (function(){var _ion_es6_Set_ = function(module,exports,require){'use strict';
var ion = require('ion');
require('./Map');
function SetShim(items) {
    if (items != null) {
        throw new Error('Don\'t add items in the constructor, IE implementation of Set breaks this');
    }
    var map = new Map();
    var methods = {
            has: function (key) {
                return map.has(key);
            },
            delete: function (key) {
                return map.delete(key);
            },
            add: function (key) {
                return map.set(key, true);
            },
            values: function () {
                return map.keys();
            },
            forEach: function (callback, thisArg) {
                map.forEach(ion.bind(function (value, key) {
                    callback.call(thisArg, key, this);
                }, this));
            }
        };
    for (var key in methods) {
        var value = methods[key];
        Object.defineProperty(this, key, { value: value });
    }
}
if (!(global.Set != null) || !(Set.prototype.forEach != null)) {
    console.warn('Shimming Set');
    global.Set = SetShim;
}
var test = exports.test = function () {
        var Set = global.Set;
        var a = {};
        var b = function () {
        };
        var set = new Set();
        set.add(a);
        set.add(b);
        if (!set.has(a))
            throw new Error('Assertion Failed: (set.has(a))');
        if (!set.has(b))
            throw new Error('Assertion Failed: (set.has(b))');
        set.delete(b);
        if (!!set.has(b))
            throw new Error('Assertion Failed: (not set.has(b))');
        set.add(b);
        if (!set.has(b))
            throw new Error('Assertion Failed: (set.has(b))');
    };
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/Set',_ion_es6_Set_);
    else
      _ion_es6_Set_.call(this, module, exports, require);
  }
  else {
    _ion_es6_Set_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./Set.map