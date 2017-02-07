void (function(){var _ion_es6_Object_observe_ = function(module,exports,require){'use strict';
var observerMap = new Map(), nextCheckMap = new Map(), changedObjects = new Map();
global.observerMap = observerMap;
var clone = function (object, properties) {
        if (properties != null) {
            var _ref2 = {};
            for (var key in properties) {
                _ref2[key] = object[key];
            }
            return _ref2;
        } else {
            var _ref3 = {};
            for (var key in object) {
                var value = object[key];
                _ref3[key] = value;
            }
            return _ref3;
        }
    }, getChanges = function (oldValue, newValue, properties) {
        var changes = null;
        var change = function (type, name, oldValue, object) {
            changes = changes != null ? changes : [];
            changes.push({
                type: type,
                name: name,
                oldValue: oldValue,
                object: object
            });
        };
        var checkForChange = function (property) {
            if (newValue.constructor === Object) {
                if (oldValue.hasOwnProperty(name)) {
                    var oldPropertyValue = oldValue[name];
                    if (!newValue.hasOwnProperty(name)) {
                        if (oldPropertyValue !== void 0) {
                            change('delete', name, oldPropertyValue, newValue);
                        }
                    } else {
                        var newPropertyValue = newValue[name];
                        if (!Object.is(newPropertyValue, oldPropertyValue)) {
                            change('update', name, oldPropertyValue, newValue);
                        }
                    }
                } else if (newValue.hasOwnProperty(name)) {
                    change('add', name, void 0, newValue);
                }
            } else {
                var oldPropertyValue = oldValue[name];
                var newPropertyValue = newValue[name];
                if (!Object.is(newPropertyValue, oldPropertyValue)) {
                    change('update', name, oldPropertyValue, newValue);
                }
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
var observe = exports.observe = function (object, callback, property, priority) {
        if (priority == null)
            priority = -1;
        callback.priority = callback.priority != null ? callback.priority : priority;
        var meta = observerMap.get(object);
        if (!(meta != null)) {
            var _ref4 = {};
            _ref4[property] = 0;
            meta = {
                object: object,
                properties: {},
                all: 0,
                clone: clone(object, property ? _ref4 : null),
                callbacks: []
            };
            observerMap.set(object, meta);
        }
        if (property != null) {
            meta.properties[property] = meta.properties[property] != null ? meta.properties[property] : 0;
            meta.properties[property]++;
        } else {
            meta.all++;
        }
        meta.callbacks.push(callback);
    }, unobserve = exports.unobserve = function (object, callback, property) {
        var meta = observerMap.get(object);
        if (meta != null) {
            meta.callbacks.remove(callback);
            if (meta.callbacks.length === 0) {
                observerMap.delete(object);
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
    }, nextCheck = exports.nextCheck = function (fn) {
        nextCheckMap.set(fn, fn);
    }, changed = exports.changed = function (obj) {
        for (var _i = 0; _i < arguments.length; _i++) {
            var object = arguments[_i];
            changedObjects.set(object, object);
        }
    }, checkForChanges = exports.checkForChanges = function () {
        var changes;
        var maxCycles = 100;
        for (var i = 0; i < maxCycles; i++) {
            var changeCount = 0;
            var check = function (meta) {
                var properties = meta.all > 0 ? null : meta.properties;
                changes = getChanges(meta.clone, meta.object, properties);
                if (changes != null) {
                    changeCount++;
                    meta.clone = clone(meta.object, properties);
                    {
                        var _ref = meta.callbacks;
                        for (var _i2 = 0; _i2 < _ref.length; _i2++) {
                            var callback = _ref[_i2];
                            callback(changes);
                        }
                    }
                }
            };
            observerMap.forEach(check);
            var currentCheckMap = nextCheckMap;
            nextCheckMap = new Map();
            currentCheckMap.forEach(function (callback) {
                callback();
            });
            currentCheckMap.clear();
            if (changeCount === 0 && nextCheckMap.size === 0) {
                return;
            }
        }
        throw new Error('Circular Object.observe dependency');
    }, test = exports.test = function () {
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
        changed(object);
        checkForChanges();
        if (!(JSON.stringify(changes) === JSON.stringify([
                {
                    'type': 'update',
                    'name': 'a',
                    'oldValue': 1,
                    'object': {
                        'a': 2,
                        'c': 5
                    }
                },
                {
                    'type': 'delete',
                    'name': 'b',
                    'oldValue': {
                        'c': 2,
                        'd': 3
                    },
                    'object': {
                        'a': 2,
                        'c': 5
                    }
                },
                {
                    'type': 'add',
                    'name': 'c',
                    'object': {
                        'a': 2,
                        'c': 5
                    }
                }
            ])))
            throw new Error('Assertion Failed: (JSON.stringify(changes) is JSON.stringify([{"type":"update","name":"a","oldValue":1,"object":{"a":2,"c":5}},{"type":"delete","name":"b","oldValue":{"c":2,"d":3},"object":{"a":2,"c":5}},{"type":"add","name":"c","object":{"a":2,"c":5}}]))');
        unobserve(object, handler);
    };
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