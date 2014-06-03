void (function(){var _ion_es6_Object_observe_ = function(module,exports,require){'use strict';
var clone = function (object, properties) {
    if (properties != null) {
        var _ref3 = {};
        for (var key in properties) {
            _ref3[key] = object[key];
        }
        return _ref3;
    } else {
        var _ref4 = {};
        for (var key in object) {
            var value = object[key];
            _ref4[key] = value;
        }
        return _ref4;
    }
};
var createShim = exports.createShim = function () {
        var map = new Map();
        var observers = [];
        var observe = function (object, callback, property) {
            if (object.nodeType === 1 || object === global.document) {
                if (!(property != null)) {
                    return;
                }
            }
            var meta = map.get(object);
            if (!(meta != null)) {
                var _ref5 = {};
                _ref5[property] = 0;
                meta = {
                    object: object,
                    properties: {},
                    all: 0,
                    clone: clone(object, property ? _ref5 : null),
                    callbacks: []
                };
                map.set(object, meta);
                observers.push(meta);
            }
            if (property != null) {
                meta.properties[property] = meta.properties[property] != null ? meta.properties[property] : 0;
                meta.properties[property]++;
            } else {
                meta.all++;
            }
            meta.callbacks.push(callback);
        };
        var unobserve = function (object, callback, property) {
            var meta = map.get(object);
            if (meta != null) {
                var index = meta.callbacks.lastIndexOf(callback);
                if (index >= 0) {
                    meta.callbacks.splice(index, 1);
                    if (meta.callbacks.length === 0) {
                        map.delete(object);
                        observers.splice(observers.lastIndexOf(meta), 1);
                    }
                }
                if (property != null) {
                    meta.properties[property]--;
                    if (meta.properties[property] === 0) {
                        delete meta.properties[property];
                    }
                } else {
                    meta.all--;
                }
            }
        };
        var getChanges = function (oldValue, newValue, properties) {
            var changes = null;
            var change = function (type, name, oldValue) {
                changes = changes != null ? changes : [];
                changes.push({
                    type: type,
                    name: name,
                    oldValue: oldValue
                });
            };
            var checkForChange = function (property) {
                if (oldValue.hasOwnProperty(name)) {
                    var oldPropertyValue = oldValue[name];
                    if (!newValue.hasOwnProperty(name)) {
                        change('delete', name, oldPropertyValue);
                    } else {
                        var newPropertyValue = newValue[name];
                        if (newPropertyValue !== oldPropertyValue) {
                            change('update', name, oldPropertyValue);
                        }
                    }
                } else if (newValue.hasOwnProperty(name)) {
                    change('add', name);
                }
            };
            if (properties != null) {
                for (var name in properties) {
                    checkForChange(name);
                }
            } else {
                for (var name in oldValue) {
                    checkForChange(name);
                }
                for (var name in newValue) {
                    if (!oldValue.hasOwnProperty(name)) {
                        checkForChange(name);
                    }
                }
            }
            return changes;
        };
        observe.checkForChanges = function () {
            var maxCycles = 10;
            for (var i = 0; i < maxCycles; i++) {
                var totalChanges = 0;
                var pendingChanges = [];
                for (var _i = 0; _i < observers.length; _i++) {
                    var meta = observers[_i];
                    var properties = meta.all > 0 ? null : meta.properties;
                    var changes = getChanges(meta.clone, meta.object, properties);
                    if (changes != null) {
                        totalChanges++;
                        meta.clone = clone(meta.object, properties);
                        pendingChanges.push([
                            changes,
                            meta.callbacks.slice(0)
                        ]);
                    }
                }
                if (totalChanges === 0) {
                    return;
                }
                for (var _i2 = 0; _i2 < pendingChanges.length; _i2++) {
                    var _ref6 = pendingChanges[_i2];
                    var changes = _ref6[0];
                    var callbacks = _ref6[1];
                    for (var _i3 = 0; _i3 < callbacks.length; _i3++) {
                        var callback = callbacks[_i3];
                        callback(changes);
                    }
                }
            }
            throw new Error('Circular Object.observe dependency');
        };
        observe.observers = observers;
        return {
            observe: observe,
            unobserve: unobserve
        };
    };
var test = exports.test = function () {
        var _ref = createShim();
        var observe = _ref.observe;
        var unobserve = _ref.unobserve;
        var object = {
                a: 1,
                b: {
                    c: 2,
                    d: 3
                }
            };
        var changes;
        var handler = function (c) {
            changes = c;
        };
        observe(object, handler);
        object.a = 2;
        delete object.b;
        object.c = 5;
        observe.checkForChanges();
        if (!(JSON.stringify(changes) === JSON.stringify([
                {
                    'type': 'update',
                    'name': 'a',
                    'oldValue': 1
                },
                {
                    'type': 'delete',
                    'name': 'b',
                    'oldValue': {
                        'c': 2,
                        'd': 3
                    }
                },
                {
                    'type': 'add',
                    'name': 'c'
                }
            ])))
            throw new Error('Assertion Failed: (JSON.stringify(changes) is JSON.stringify([{"type":"update","name":"a","oldValue":1},{"type":"delete","name":"b","oldValue":{"c":2,"d":3}},{"type":"add","name":"c"}]))');
        unobserve(object, handler);
    };
if (!(Object.observe != null) && global.Map != null) {
    {
        var _ref2 = createShim();
        for (var key in _ref2) {
            var value = _ref2[key];
            Object[key] = value;
        }
    }
}
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/Object.observe',_ion_es6_Object_observe_);
    else
      _ion_es6_Object_observe_.call(this, module, exports, require);
  }
  else {
    _ion_es6_Object_observe_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./Object.observe.map