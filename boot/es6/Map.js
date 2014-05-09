void (function(){var _ion_es6_Map_ = function(module,exports,require){'use strict';
function MapShim(pairs) {
    var lookup = {};
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
            Object.defineProperty(key, idName, { value: id });
        }
        return id;
    };
    var methods = {
            get: function get(key) {
                return lookup[getId(key)];
            },
            set: function set(key, value) {
                return lookup[getId(key)] = value;
            },
            has: function has(key) {
                return lookup.hasOwnProperty(getId(key));
            },
            delete: function del(key) {
                return delete lookup[getId(key)];
            },
            clear: function clear() {
                lookup = {};
            }
        };
    for (var key in methods) {
        var value = methods[key];
        Object.defineProperty(this, key, { value: value });
    }
    if (pairs != null) {
        for (var _i = 0; _i < pairs.length; _i++) {
            var _ref = pairs[_i];
            var key = _ref[0];
            var value = _ref[1];
            this.set(key, value);
        }
    }
}
if (!(global.Map != null)) {
    global.Map = MapShim;
}
var test = exports.test = function () {
        var Map = MapShim;
        var map = new Map([
                [
                    'a',
                    1
                ],
                [
                    'b',
                    2
                ]
            ]);
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