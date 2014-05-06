void (function(){var _ion_Object_observe_ = function(module,exports,require){'use strict';
const clone = function (object) {
    let _ref3 = {};
    {
        for (let key in object) {
            let value = object[key];
            _ref3[key] = value;
        }
    }
    return _ref3;
};
const createObjectObserveAndUnobserve = function () {
    let map = new Map();
    let array = [];
    let observe = function (object, callback) {
        if (object.nodeType === 1 || object === global.document) {
            return;
        }
        let meta = map.get(object);
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
    let unobserve = function (object, callback) {
        if (object.nodeType === 1 || object === global.document) {
            return;
        }
        let meta = map.get(object);
        if (meta != null) {
            let index = meta.callbacks.lastIndexOf(callback);
            if (index >= 0) {
                meta.callbacks.splice(index, 1);
                if (meta.callbacks.length === 0) {
                    map.delete(object);
                    array.splice(array.lastIndexOf(meta), 1);
                }
            }
        }
    };
    let getChanges = function (oldValue, newValue) {
        let changes = null;
        let change = function (type, name, oldValue) {
            changes = changes != null ? changes : [];
            changes.push({
                type: type,
                name: name,
                oldValue: oldValue
            });
        };
        for (let name in oldValue) {
            if (oldValue.hasOwnProperty(name)) {
                let oldPropertyValue = oldValue[name];
                if (!newValue.hasOwnProperty(name)) {
                    change('delete', name, oldPropertyValue);
                } else {
                    let newPropertyValue = newValue[name];
                    if (newPropertyValue !== oldPropertyValue) {
                        change('update', name, oldPropertyValue);
                    }
                }
            }
        }
        for (let name in newValue) {
            if (newValue.hasOwnProperty(name) && !oldValue.hasOwnProperty(name)) {
                change('add', name);
            }
        }
        return changes;
    };
    observe.checkForChanges = function () {
        let maxCycles = 100;
        for (let i = 0; i < maxCycles; i++) {
            let totalChanges = 0;
            let pendingChanges = [];
            for (let _i = 0; _i < array.length; _i++) {
                let meta = array[_i];
                let changes = getChanges(meta.clone, meta.object);
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
            for (let _i2 = 0; _i2 < pendingChanges.length; _i2++) {
                let _ref4 = pendingChanges[_i2];
                let changes = _ref4[0];
                let callbacks = _ref4[1];
                for (let _i3 = 0; _i3 < callbacks.length; _i3++) {
                    let callback = callbacks[_i3];
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
const test = exports.test = function () {
        let _ref = createObjectObserveAndUnobserve();
        let observe = _ref[0];
        let unobserve = _ref[1];
        let object = {
                a: 1,
                b: {
                    c: 2,
                    d: 3
                }
            };
        let changes;
        let handler = function (c) {
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
    let _ref2 = createObjectObserveAndUnobserve();
    let observe = _ref2[0];
    let unobserve = _ref2[1];
    let array = _ref2[2];
    Object.observe = observe;
    Object.unobserve = unobserve;
    global.array = array;
}
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/Object.observe',_ion_Object_observe_);
    else
      _ion_Object_observe_.call(this, module, exports, require);
  }
  else {
    _ion_Object_observe_.call(this);
  }
}).call(this)