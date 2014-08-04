void (function(){var _ion_es6_Map_ = function(module,exports,require){'use strict';
var ion = null;
var uniqueCounter = 0;
var idName = '__Map_id';
var getId = function (key) {
    if (!(key != null)) {
        return String(key);
    }
    if (typeof key === 'string' || typeof key === 'number' || typeof key === 'boolean') {
        return '_' + key;
    }
    var id = key[idName];
    if (!(id != null)) {
        id = ++uniqueCounter;
        Object.defineProperty(key, idName, {
            value: id,
            enumerable: false
        });
    }
    return id;
};
function MapShim(pairs) {
    if (pairs != null) {
        throw new Error('Don\'t add items in the constructor, IE implementation of Set breaks this');
    }
    var lookup = {};
    var keys = [];
    var methods = {
            get: function (key) {
                return lookup[getId(key)];
            },
            set: function (key, value) {
                var id = getId(key);
                if (!lookup.hasOwnProperty(id)) {
                    keys.push(key);
                }
                lookup[id] = value;
                return value;
            },
            has: function (key) {
                var id = getId(key);
                return lookup.hasOwnProperty(id);
            },
            delete: function (key) {
                var id = getId(key);
                keys.remove(key);
                delete lookup[id];
            },
            clear: function () {
                lookup = {};
                keys = [];
            },
            forEach: function (callback, thisArg) {
                for (var _i = 0; _i < keys.length; _i++) {
                    var key = keys[_i];
                    var value = this.get(key);
                    callback.call(thisArg, value, key, this);
                }
            }
        };
    for (var key in methods) {
        var value = methods[key];
        Object.defineProperty(this, key, { value: value });
    }
}
if (!((global.Map != null ? global.Map.prototype.forEach : void 0) != null)) {
    console.warn('Shimming Map');
    global.Map = MapShim;
}
var test = exports.test = function () {
        var Map = global.Map;
        var map = new Map();
        map.set('a', 1);
        map.set('b', 2);
        if (!(Object.keys(map).length === 0))
            throw new Error('Assertion Failed: (Object.keys(map).length is 0)');
        if (!map.has('a'))
            throw new Error('Assertion Failed: (map.has(\'a\'))');
        if (!!map.has('c'))
            throw new Error('Assertion Failed: (not map.has(\'c\'))');
        if (!(map.get('a') === 1))
            throw new Error('Assertion Failed: (map.get(\'a\') is 1)');
        if (!(map.get('b') === 2))
            throw new Error('Assertion Failed: (map.get(\'b\') is 2)');
        if (!(map.get('c') === void 0))
            throw new Error('Assertion Failed: (map.get(\'c\') is undefined)');
        var mykey1 = {};
        map.set(mykey1, 'one');
        if (!(Object.keys(mykey1).length === 0))
            throw new Error('Assertion Failed: (Object.keys(mykey1).length is 0)');
        if (!(map.get(mykey1) === 'one'))
            throw new Error('Assertion Failed: (map.get(mykey1) is "one")');
    };
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/Map',_ion_es6_Map_);
    else
      _ion_es6_Map_.call(this, module, exports, require);
  }
  else {
    _ion_es6_Map_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./Map.map