void (function(){var _ion_mergePatch_ = function(module,exports,require){'use strict';
var ion = require('./'), isObject = function (a) {
        var type = typeof a;
        return a != null && type === 'object' || type === 'function';
    }, deleteValue = null, isPrivate = function (name) {
        return name[0] === '_';
    }, watchImmediate = function (object, handler, edge) {
        if (!isObject(object)) {
            throw new Error('Cannot watch: #{object}');
        }
        var watching = true;
        var propertyWatchers = {};
        var watchProperties = function (changes) {
            var properties = Object.keys(changes != null ? changes : object);
            for (var _i = 0; _i < properties.length; _i++) {
                var name = properties[_i];
                (function (name) {
                    if (watching) {
                        propertyWatchers[name] != null ? propertyWatchers[name]() : void 0;
                        delete propertyWatchers[name];
                        var value = object[name];
                        if (isObject(value)) {
                            propertyWatchers[name] = watchInternal(value, function (patch) {
                                if (watching) {
                                    var _ref = {};
                                    _ref[name] = patch;
                                    handler(_ref);
                                }
                            }, edge);
                        }
                    }
                }(name));
            }
        };
        watchProperties(null);
        var unobserve = ion.observe(object, function (changes) {
                if (watching) {
                    var patch = null;
                    var changedProperties = {};
                    for (var _i2 = 0; _i2 < changes.length; _i2++) {
                        var _ref2 = changes[_i2];
                        var name = _ref2.name;
                        var oldValue = _ref2.oldValue;
                        changedProperties[name] = true;
                        if (!isPrivate(name)) {
                            patch = patch != null ? patch : {};
                            var newValue = object[name];
                            var newDiff = diff(oldValue, newValue);
                            if (newDiff !== void 0) {
                                patch[name] = newDiff;
                            }
                        }
                    }
                    watchProperties(changedProperties);
                    if (patch != null) {
                        handler(patch);
                    }
                }
            }, null, edge);
        return function () {
            watching = false;
            for (var key in propertyWatchers) {
                var unwatch = propertyWatchers[key];
                unwatch();
            }
            unobserve();
            unobserve = null;
        };
    }, increment = /[+-]\d+/, watchInternal = function (object, handler, edge) {
        global.watchInternalCount = global.watchInternalCount != null ? global.watchInternalCount : 0;
        global.watchInternalCount++;
        var active = false;
        var combinedPatch = void 0;
        var finalCallback = function () {
            handler(combinedPatch);
            active = false;
            combinedPatch = void 0;
        };
        var delayedHandler = function (patch) {
            combinedPatch = combine(combinedPatch, patch);
            if (!active) {
                ion.nextCheck(finalCallback);
                active = true;
            }
        };
        var unwatch = watchImmediate(object, delayedHandler, edge);
        return function () {
            unwatch();
            global.watchInternalCount--;
        };
    };
var canSetProperty = exports.canSetProperty = function (object, key) {
        return !(typeof object === 'function' && key === 'name');
    }, merge = exports.merge = function (_target, _values, options, schema) {
        var values = _values;
        var target = _target;
        var deleteNull = (options != null ? options.deleteNull : void 0) != null ? options.deleteNull : true;
        var _delete = (options != null ? options.delete : void 0) != null ? options.delete : true;
        if ((schema != null ? schema.type : void 0) === 'integer' && increment.test(values)) {
            if (!deleteNull || typeof target === 'string' && increment.test(target)) {
                var total = parseInt(target != null ? target : 0) + parseInt(values.substring(1));
                values = '' + (total > 0 ? '+' : '-') + Math.abs(total);
            } else {
                values = (typeof target === 'number' ? target : 0) + parseInt(values.substring(1));
            }
        }
        if (Array.isArray(target) && (values != null ? values.length : void 0) === null) {
            target = {};
            values = ion.clone(values, false);
            delete values.length;
        }
        if ((values != null ? values.constructor : void 0) !== Object) {
            if (Array.isArray(values)) {
                return values.slice(0);
            } else {
                return values;
            }
        }
        if (!isObject(target)) {
            if ((options != null ? options.factory : void 0) != null) {
                target = options.factory(values);
            } else {
                target = {};
            }
        }
        var deletedValues = false;
        for (var key in values) {
            var value = values[key];
            if (deleteNull && value === deleteValue) {
                deletedValues = true;
                if (_delete) {
                    delete target[key];
                } else {
                    target[key] = void 0;
                }
            } else {
                var itemSchema = (schema != null ? schema.items : void 0) != null ? schema.items : schema != null ? schema.properties != null ? schema.properties[key] : void 0 : void 0;
                var newValue = merge(target[key], value, options, itemSchema);
                if (canSetProperty(target, key)) {
                    target[key] = newValue;
                }
            }
        }
        if (deletedValues && Array.isArray(target)) {
            for (var i = target.length; i > 0; i--) {
                if (!(target[i - 1] != null)) {
                    target.length = i - 1;
                }
            }
        }
        return target;
    }, patchNoDelete = exports.patchNoDelete = function (object, patch) {
        return merge(object, patch, { delete: false });
    }, combine = exports.combine = function (patch1, patch2, schema) {
        return merge(patch1, patch2, { deleteNull: false }, schema);
    }, watch = exports.watch = function (object, handler, edge) {
        global.watchCount = global.watchCount != null ? global.watchCount : 0;
        global.watchCount++;
        var unwatch = watchInternal(object, handler, edge);
        return function () {
            unwatch();
            global.watchCount--;
        };
    }, diff = exports.diff = function (oldValue, newValue) {
        if (oldValue === newValue) {
            return void 0;
        }
        if (!(oldValue != null && newValue != null && typeof newValue === 'object' && typeof oldValue === 'object')) {
            return newValue != null ? newValue : null;
        }
        if (!Array.isArray(oldValue) && Array.isArray(newValue)) {
            return newValue;
        }
        if (Array.isArray(oldValue) && !Array.isArray(newValue)) {
            return ion.patch.combine(JSON.parse(JSON.stringify(newValue)), { length: null });
        }
        var patch = void 0;
        for (var name in oldValue) {
            if (oldValue.hasOwnProperty(name)) {
                if (!newValue.hasOwnProperty(name)) {
                    patch = patch != null ? patch : {};
                    patch[name] = null;
                } else {
                    var propertyDiff = diff(oldValue[name], newValue[name]);
                    if (propertyDiff !== void 0) {
                        patch = patch != null ? patch : {};
                        patch[name] = propertyDiff;
                    }
                }
            }
        }
        for (var name in newValue) {
            if (newValue.hasOwnProperty(name) && !oldValue.hasOwnProperty(name)) {
                patch = patch != null ? patch : {};
                patch[name] = newValue[name];
            }
        }
        if (Array.isArray(oldValue) && Array.isArray(newValue) && newValue.length < oldValue.length) {
            patch.length = newValue.length;
            for (var i = newValue.length; i < oldValue.length; i++) {
                delete patch[i];
            }
        }
        return patch;
    }, isChange = exports.isChange = function (oldValue, newValue) {
        if (oldValue === newValue) {
            return false;
        }
        if (!(oldValue != null && newValue != null && typeof newValue === 'object' && typeof oldValue === 'object')) {
            return true;
        }
        if (Array.isArray(newValue) && JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
            return true;
        }
        for (var name in newValue) {
            if (!oldValue.hasOwnProperty(name)) {
                if (!(newValue[name] != null)) {
                    continue;
                } else {
                    return true;
                }
            }
            if (isChange(oldValue[name], newValue[name])) {
                return true;
            }
        }
        return false;
    }, test = exports.test = function () {
        var equal = function (a, b) {
            return JSON.stringify(a) === JSON.stringify(b);
        };
        return {
            merge: function () {
                if (!equal({
                        a: {
                            b: 2,
                            c: 3
                        },
                        d: 4
                    }, merge({ a: { b: 2 } }, {
                        a: { c: 3 },
                        d: 4
                    })))
                    throw new Error('Assertion Failed: (equal({a:{b:2,c:3},d:4}, merge({a:{b:2}}, {a:{c:3},d:4})))');
                if (!equal({ b: 2 }, merge(null, { b: 2 })))
                    throw new Error('Assertion Failed: (equal({b:2}, merge(null, {b:2})))');
                if (!equal({
                        a: 1,
                        b: 2
                    }, merge({
                        a: 1,
                        b: 2,
                        c: 3
                    }, { c: void 0 })))
                    throw new Error('Assertion Failed: (equal({a:1,b:2}, merge({a:1,b:2,c:3}, {c:undefined})))');
                var double = function (x) {
                    return x * 2;
                };
                if (!equal({ a: double }, merge({}, { a: double })))
                    throw new Error('Assertion Failed: (equal({a:double}, merge({},{a:double})))');
                if (!equal({ a: [] }, merge({
                        a: [
                            1,
                            2
                        ]
                    }, { a: [] })))
                    throw new Error('Assertion Failed: (equal({a:[]}, merge({a:[1,2]}, {a:[]})))');
                if (!('+2' === merge('+1', '+1', null, { type: 'integer' })))
                    throw new Error('Assertion Failed: ("+2" is merge("+1", "+1", null, {type:\'integer\'}))');
                if (!equal([1], merge([
                        1,
                        2
                    ], { 1: null })))
                    throw new Error('Assertion Failed: (equal([1], merge([1,2], {1:null})))');
                if (!(merge([
                        1,
                        2
                    ], { 1: null }).length === 1))
                    throw new Error('Assertion Failed: (merge([1,2], {1:null}).length is 1)');
                if (!(merge({
                        foo: [
                            1,
                            2
                        ]
                    }, { foo: { 1: null } }).foo.length === 1))
                    throw new Error('Assertion Failed: (merge({foo:[1,2]}, {foo:{1:null}}).foo.length is 1)');
                if (!equal([
                        1,
                        void 0
                    ], merge([
                        1,
                        2
                    ], { 1: void 0 })))
                    throw new Error('Assertion Failed: (equal([1, undefined], merge([1,2], {1:undefined})))');
            },
            isChange: function () {
                if (!isChange({ a: 1 }, null))
                    throw new Error('Assertion Failed: (isChange({a:1}, null))');
                if (!!isChange(null, null))
                    throw new Error('Assertion Failed: (not isChange(null, null))');
                if (!isChange(void 0, null))
                    throw new Error('Assertion Failed: (isChange(undefined, null))');
                if (!isChange(null, void 0))
                    throw new Error('Assertion Failed: (isChange(null, undefined))');
                if (!!isChange({ a: 1 }, { a: 1 }))
                    throw new Error('Assertion Failed: (not isChange({a:1}, {a:1}))');
                if (!!isChange({
                        a: {
                            b: 2,
                            c: 3
                        }
                    }, { a: { b: 2 } }))
                    throw new Error('Assertion Failed: (not isChange({a:{b:2,c:3}}, {a:{b:2}}))');
                if (!isChange({ a: { b: 2 } }, { a: { b: 3 } }))
                    throw new Error('Assertion Failed: (isChange({a:{b:2}}, {a:{b:3}}))');
                if (!!isChange({ a: 1 }, { b: null }))
                    throw new Error('Assertion Failed: (not isChange({a:1}, {b:null}))');
                if (!isChange({
                        a: [
                            1,
                            2
                        ]
                    }, { a: [] }))
                    throw new Error('Assertion Failed: (isChange({a:[1,2]}, {a:[]}))');
            },
            diff: function () {
                if (!equal({ b: 2 }, diff({ a: 1 }, {
                        a: 1,
                        b: 2
                    })))
                    throw new Error('Assertion Failed: (equal({b:2}, diff({a:1}, {a:1,b:2})))');
                if (!equal({
                        a: {
                            b: 3,
                            c: null
                        }
                    }, diff({
                        a: {
                            b: 2,
                            c: 4
                        }
                    }, { a: { b: 3 } })))
                    throw new Error('Assertion Failed: (equal({a:{b:3,c:null}}, diff({a:{b:2,c:4}}, {a:{b:3}})))');
                if (!equal({ a: 1 }, diff(null, { a: 1 })))
                    throw new Error('Assertion Failed: (equal({a:1}, diff(null, {a:1})))');
                if (!equal({ c: { d: { f: 4 } } }, diff({
                        a: 1,
                        b: 2,
                        c: {
                            d: {
                                e: 1,
                                f: 2
                            }
                        }
                    }, {
                        a: 1,
                        b: 2,
                        c: {
                            d: {
                                e: 1,
                                f: 4
                            }
                        }
                    })))
                    throw new Error('Assertion Failed: (equal({c:{d:{f:4}}}, diff({a:1,b:2,c:{d:{e:1,f:2}}}, {a:1,b:2,c:{d:{e:1,f:4}}})))');
                if (!equal(null, diff({ a: 1 }, void 0)))
                    throw new Error('Assertion Failed: (equal(null, diff({a:1}, undefined)))');
                if (!equal(null, diff({ a: 1 }, null)))
                    throw new Error('Assertion Failed: (equal(null, diff({a:1}, null)))');
                if (!equal(void 0, diff({ a: { b: 2 } }, { a: { b: 2 } })))
                    throw new Error('Assertion Failed: (equal(undefined, diff({a:{b:2}}, {a:{b:2}})))');
                if (!equal(diff([
                        1,
                        2,
                        3
                    ], [
                        3,
                        2
                    ]), {
                        '0': 3,
                        length: 2
                    }))
                    throw new Error('Assertion Failed: ((equal(diff([1,2,3], [3,2]), { \'0\': 3, length: 2 })))');
                if (!equal(diff([], {}), { length: null }))
                    throw new Error('Assertion Failed: (equal(diff([], {}), {length:null}))');
                if (!equal(diff({}, []), []))
                    throw new Error('Assertion Failed: (equal(diff({}, []), []))');
                var start = [
                        1,
                        2,
                        3
                    ];
                var delta = diff(start, { foo: 'a' });
                var result = merge(start, delta);
                if (!equal(result, { foo: 'a' }))
                    throw new Error('Assertion Failed: (equal(result, {foo:"a"}))');
            },
            mergeActuallySetsValuesEvenWhenValueIsntChanged: function () {
                var Point = ion.defineClass({
                        name: 'Point',
                        properties: {
                            x: 0,
                            y: 0
                        }
                    });
                var Point = Point;
                var a = new Point({});
                if (!!a.hasOwnProperty('x'))
                    throw new Error('Assertion Failed: (not a.hasOwnProperty(\'x\'))');
                merge(a, { x: 0 });
                if (!a.hasOwnProperty('x'))
                    throw new Error('Assertion Failed: (a.hasOwnProperty(\'x\'))');
            },
            observe: function (done) {
                var before = global.watchCount != null ? global.watchCount : 0;
                var source = {
                        name: 'Kris',
                        age: 41,
                        children: {
                            Sadera: {
                                grandchildren: {
                                    One: 1,
                                    Two: 2
                                }
                            },
                            Orion: [],
                            Third: {},
                            Fifth: { alpha: 1 }
                        }
                    };
                var target = ion.clone(source, true);
                var unwatch = watch(source, function (patch) {
                        target = merge(target, patch);
                        if (equal(source, target)) {
                            unwatch();
                            var after = global.watchCount;
                            if (before !== after) {
                                done('Memory leak in watch: before = ' + before + ', after = ' + after);
                            } else {
                                done();
                            }
                        }
                    });
                ion.patch.combine(source, {
                    name: 'Fred',
                    children: {
                        Orion: {
                            a: 1,
                            b: 2,
                            c: 12
                        },
                        Sadera: { grandchildren: { three: 3 } },
                        Fourth: {
                            Something: {
                                One: 1,
                                Two: 2
                            }
                        }
                    }
                });
                source.children.Fifth = { beta: 2 };
                delete source.children.Third;
                ion.sync();
            }
        };
    }();
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/mergePatch',_ion_mergePatch_);
    else
      _ion_mergePatch_.call(this, module, exports, require);
  }
  else {
    _ion_mergePatch_.call(this);
  }
}).call(this)