void (function(){var _ion_mergePatch_ = function(module,exports,require){'use strict';
var ion = require('./'), isObject = function (a) {
        return a != null && typeof a === 'object';
    }, deleteValue = null;
var merge = exports.merge = function (target, values, options) {
        var deleteNull = (options != null ? options.deleteNull : void 0) != null ? options.deleteNull : true;
        if ((values != null ? values.constructor : void 0) !== Object) {
            return values;
        }
        if (!isObject(target)) {
            if ((options != null ? options.factory : void 0) != null) {
                target = options.factory(values);
            } else {
                target = {};
            }
        }
        for (var key in values) {
            var value = values[key];
            if (deleteNull && value === deleteValue) {
                delete target[key];
            } else {
                target[key] = merge(target[key], value, options);
            }
        }
        return target;
    }, combine = exports.combine = function (patch1, patch2) {
        return merge(patch1, patch2, { deleteNull: false });
    }, watch = exports.watch = function (object, handler, callInitial) {
        if (callInitial == null)
            callInitial = true;
        if (!isObject(object)) {
            throw new Error('Cannot watch: #{object}');
        }
        var subWatchers = {};
        var pendingPatch = null;
        var processPatch = function (patchValues) {
            for (var name in patchValues) {
                subWatchers[name] != null ? subWatchers[name]() : void 0;
                var value = object[name];
                if (isObject(value)) {
                    (function (name) {
                        var subHandler = function (patch) {
                            var basePatch = {};
                            basePatch[name] = patch;
                            queuePatch(basePatch);
                        };
                        subWatchers[name] = watch(value, subHandler, false);
                    }(name));
                }
            }
        };
        var pendingTimeout = null;
        var queuePatch = function (patch) {
            if (!callInitial) {
                handler(patch);
            } else {
                pendingPatch = combine(pendingPatch, patch);
                processPatch(pendingPatch);
                pendingTimeout = pendingTimeout != null ? pendingTimeout : setTimeout(function () {
                    handler(pendingPatch);
                    pendingPatch = null;
                    pendingTimeout = null;
                }, 0);
            }
        };
        var watcher = function (changes) {
            try {
                var patch = {};
                for (var _i = 0; _i < changes.length; _i++) {
                    var change = changes[_i];
                    patch[change.name] = object[change.name] != null ? object[change.name] : deleteValue;
                }
                queuePatch(patch);
            } catch (e) {
                console.error(e);
            }
        };
        processPatch(object);
        ion.observe(object, watcher);
        return function () {
            ion.unobserve(object, watcher);
            for (var key in subWatchers) {
                var value = subWatchers[key];
                value();
            }
        };
    }, diff = exports.diff = function (oldValue, newValue) {
        if (oldValue === newValue) {
            return void 0;
        }
        if (!(oldValue != null && newValue != null && typeof newValue === 'object' && typeof oldValue === 'object')) {
            return newValue != null ? newValue : null;
        }
        var patch = void 0;
        for (var name in oldValue) {
            if (oldValue.hasOwnProperty(name)) {
                var propertyDiff = diff(oldValue[name], newValue[name]);
                if (propertyDiff !== void 0) {
                    patch = patch != null ? patch : {};
                    patch[name] = propertyDiff;
                }
            }
        }
        for (var name in newValue) {
            if (newValue.hasOwnProperty(name) && !oldValue.hasOwnProperty(name)) {
                patch = patch != null ? patch : {};
                patch[name] = newValue[name];
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
        for (var name in newValue) {
            if (newValue[name] === null && !oldValue.hasOwnProperty(name)) {
                continue;
            }
            if (isChange(oldValue[name], newValue[name])) {
                return true;
            }
        }
        return false;
    }, test = exports.test = function () {
        var equal = function (a, b) {
            return !isChange(a, b) && !isChange(b, a);
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
            },
            observe: function (done) {
                if (!(Object.observe != null)) {
                    return done(null, 'Object.observe missing.');
                }
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
                            Orion: {},
                            Third: {}
                        }
                    };
                var target = ion.clone(source, true);
                var unwatch = watch(source, function (patch) {
                        target = merge(target, patch);
                        if (equal(source, target)) {
                            done();
                            unwatch();
                        }
                    });
                {
                    source.name = 'Fred';
                    source.children = ion.patch(source.children, {
                        Orion: {
                            a: 1,
                            b: 2,
                            c: 12
                        },
                        Sadera: { grandchildren: { three: 3 } }
                    });
                }
                delete source.children.Third;
                ion.checkForChanges();
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
//@ sourceMappingURL=./mergePatch.map