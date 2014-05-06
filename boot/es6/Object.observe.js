void (function(){var _ion_es6_Object_observe_ = function(module,exports,require){'use strict';
var clone = function (object) {
    var _ref3 = {};
    {
        for (var key in object) {
            var value = object[key];
            _ref3[key] = value;
        }
    }
    return _ref3;
};
var createObjectObserveAndUnobserve = function () {
    var map = new Map();
    var array = [];
    var observe = function (object, callback) {
        if (object.nodeType === 1 || object === global.document) {
            return;
        }
        var meta = map.get(object);
        if (!(meta != null)) {
            meta = {
                object: object,
                clone: clone(object),
                callbacks: []
            };
            map.set(object, meta);
            array.push(meta);
        }
        meta.callbacks.push(callback);
    };
    var unobserve = function (object, callback) {
        if (object.nodeType === 1 || object === global.document) {
            return;
        }
        var meta = map.get(object);
        if (meta != null) {
            var index = meta.callbacks.lastIndexOf(callback);
            if (index >= 0) {
                meta.callbacks.splice(index, 1);
                if (meta.callbacks.length === 0) {
                    map.delete(object);
                    array.splice(array.lastIndexOf(meta), 1);
                }
            }
        }
    };
    var getChanges = function (oldValue, newValue) {
        var changes = null;
        var change = function (type, name, oldValue) {
            changes = changes != null ? changes : [];
            changes.push({
                type: type,
                name: name,
                oldValue: oldValue
            });
        };
        for (var name in oldValue) {
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
            }
        }
        for (var name in newValue) {
            if (newValue.hasOwnProperty(name) && !oldValue.hasOwnProperty(name)) {
                change('add', name);
            }
        }
        return changes;
    };
    observe.checkForChanges = function () {
        var maxCycles = 100;
        for (var i = 0; i < maxCycles; i++) {
            var totalChanges = 0;
            var pendingChanges = [];
            for (var _i = 0; _i < array.length; _i++) {
                var meta = array[_i];
                var changes = getChanges(meta.clone, meta.object);
                if (changes != null) {
                    totalChanges++;
                    meta.clone = clone(meta.object);
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
                var _ref4 = pendingChanges[_i2];
                var changes = _ref4[0];
                var callbacks = _ref4[1];
                for (var _i3 = 0; _i3 < callbacks.length; _i3++) {
                    var callback = callbacks[_i3];
                    callback(changes);
                }
            }
        }
        throw new Error('Circular Object.observe dependency');
    };
    return [
        observe,
        unobserve,
        array
    ];
};
var test = exports.test = function () {
        var _ref = createObjectObserveAndUnobserve();
        var observe = _ref[0];
        var unobserve = _ref[1];
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
    var _ref2 = createObjectObserveAndUnobserve();
    var observe = _ref2[0];
    var unobserve = _ref2[1];
    var array = _ref2[2];
    Object.observe = observe;
    Object.unobserve = unobserve;
    global.array = array;
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