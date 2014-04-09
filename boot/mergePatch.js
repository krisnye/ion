void (function(){var _mergePatch_ = function(module,exports,require){'use strict';
const ion = require('./'), isObject = function (a) {
        return a != null && typeof a === 'object';
    }, deleteValue = void 0;
const apply = exports.apply = function (target, values, deleteUndefined) {
        if (deleteUndefined == null)
            deleteUndefined = true;
        if ((values != null ? values.constructor : void 0) !== Object) {
            return values;
        }
        if (!isObject(target)) {
            target = {};
        }
        for (let key in values) {
            let value = values[key];
            let patchedValue = apply(target[key], value, deleteUndefined);
            if (deleteUndefined && value === deleteValue) {
                delete target[key];
            } else {
                target[key] = patchedValue;
            }
        }
        return target;
    }, combine = exports.combine = function (patch1, patch2) {
        return apply(patch1, patch2, false);
    }, watch = exports.watch = function (object, handler, callInitial) {
        if (callInitial == null)
            callInitial = true;
        if (!isObject(object)) {
            throw new Error('Cannot watch: #{object}');
        }
        let subWatchers = {};
        let pendingPatch = null;
        let processPatch = function (patchValues) {
            for (let name in patchValues) {
                subWatchers[name] != null ? subWatchers[name]() : void 0;
                let value = object[name];
                if (isObject(value)) {
                    (function (name) {
                        let subHandler = function (patch) {
                            let basePatch = {};
                            basePatch[name] = patch;
                            if (pendingPatch != null) {
                                pendingPatch = combine(pendingPatch, basePatch);
                            } else {
                                handler(basePatch);
                            }
                        };
                        subWatchers[name] = watch(value, subHandler, false);
                    }(name));
                }
            }
        };
        let watcher = function (changes) {
            try {
                pendingPatch = {};
                for (let _i = 0; _i < changes.length; _i++) {
                    let change = changes[_i];
                    pendingPatch[change.name] = object[change.name] != null ? object[change.name] : deleteValue;
                }
                processPatch(pendingPatch);
                ion.nextTick(function () {
                    handler(pendingPatch);
                    pendingPatch = null;
                });
            } catch (e) {
                console.error(e);
            }
        };
        processPatch(object);
        ion.observe(object, watcher);
        return function () {
            ion.unobserve(object, watcher);
            for (let key in subWatchers) {
                let value = subWatchers[key];
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
        let patch = void 0;
        for (let name in oldValue) {
            if (oldValue.hasOwnProperty(name)) {
                let propertyDiff = diff(oldValue[name], newValue[name]);
                if (propertyDiff !== void 0) {
                    patch = patch != null ? patch : {};
                    patch[name] = propertyDiff;
                }
            }
        }
        for (let name in newValue) {
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
        for (let name in newValue) {
            if (isChange(oldValue[name], newValue[name])) {
                return true;
            }
        }
        return false;
    }, isEmpty = exports.isEmpty = function (patch) {
        return patch === void 0 || Object.isObject(patch) && Object.isEmpty(patch);
    }, test = exports.test = function () {
        const equal = function (a, b) {
            return !isChange(a, b) && !isChange(b, a);
        };
        return {
            apply: function () {
                if (!equal({
                        a: {
                            b: 2,
                            c: 3
                        },
                        d: 4
                    }, apply({ a: { b: 2 } }, {
                        a: { c: 3 },
                        d: 4
                    })))
                    throw new Error('Assertion Failed: (equal({a:{b:2,c:3},d:4}, apply({a:{b:2}}, {a:{c:3},d:4})))');
                if (!equal({ b: 2 }, apply(null, { b: 2 })))
                    throw new Error('Assertion Failed: (equal({b:2}, apply(null, {b:2})))');
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
                let source = {
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
                let target = ion.clone(source, true);
                let unwatch = watch(source, function (patch) {
                        target = apply(target, patch);
                        if (!equal(source, target))
                            throw new Error('Assertion Failed: (equal(source, target))');
                        done();
                        unwatch();
                    });
                ion.patch(source, {
                    name: 'Fred',
                    children: {
                        Orion: {
                            a: 1,
                            b: 2,
                            c: 12
                        },
                        Sadera: { grandchildren: { three: 3 } }
                    }
                });
                delete source.children.Third;
            }
        };
    }();
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('mergePatch',_mergePatch_);
    else
      _mergePatch_.call(this, module, exports, require);
  }
  else {
    _mergePatch_.call(this);
  }
}).call(this)