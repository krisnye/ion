void (function(){var _ion_index_ = function(module,exports,require){'use strict';
var ion = module.exports;
var noop = function () {
};
require('./es6');
var valueTypes = {
        string: true,
        number: true,
        boolean: true
    }, isValueType = function (object) {
        return (!(object != null) || valueTypes[typeof object]) != null ? !(object != null) || valueTypes[typeof object] : false;
    }, primitive = {
        string: true,
        number: true,
        boolean: true,
        function: true
    }, isPrimitive = function (object) {
        return !(object != null) || primitive[typeof object] || false;
    }, normalizeProperty = function (property, name) {
        if (typeof property === 'function') {
            property = {
                writable: false,
                value: property
            };
        } else if (isPrimitive(property) || Array.isArray(property)) {
            property = { value: property };
        }
        if (!(property.get != null) && !(property.set != null) && !property.hasOwnProperty('value')) {
            property.value = void 0;
        }
        if (property.hasOwnProperty('value')) {
            property.writable = property.writable != null ? property.writable : true;
        }
        property.name = name;
        return property;
    }, normalizeProperties = function (properties) {
        if (properties == null)
            properties = {};
        for (var name in properties) {
            var property = properties[name];
            properties[name] = normalizeProperty(property, name);
        }
        return properties;
    }, variableArgConstructs = [
        function (type, a) {
            return new type();
        },
        function (type, a) {
            return new type(a[0]);
        },
        function (type, a) {
            return new type(a[0], a[1]);
        },
        function (type, a) {
            return new type(a[0], a[1], a[2]);
        },
        function (type, a) {
            return new type(a[0], a[1], a[2], a[3]);
        },
        function (type, a) {
            return new type(a[0], a[1], a[2], a[3], a[4]);
        },
        function (type, a) {
            return new type(a[0], a[1], a[2], a[3], a[4], a[5]);
        },
        function (type, a) {
            return new type(a[0], a[1], a[2], a[3], a[4], a[5], a[6]);
        },
        function (type, a) {
            return new type(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]);
        },
        function (type, a) {
            return new type(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
        },
        function (type, a) {
            return new type(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9]);
        }
    ], observeShim = require('./es6/Object.observe'), isObjectObservable = function () {
        var Node = global.Node != null ? global.Node : function () {
            };
        var NodeList = global.NodeList != null ? global.NodeList : function () {
            };
        var Location = global.Location != null ? global.Location : function () {
            };
        return function (a) {
            if (a instanceof Node || a instanceof NodeList || a instanceof Location) {
                return false;
            }
            return true;
        };
    }();
var freeze = exports.freeze = function (object, deep) {
        if (deep == null)
            deep = true;
        if (Object.isFrozen(object)) {
            return object;
        }
        Object.freeze(object);
        if (deep) {
            for (var key in object) {
                var value = object[key];
                if (value != null && typeof value === 'object') {
                    freeze(value, deep);
                }
            }
        }
        return object;
    }, createSortFunction = exports.createSortFunction = function (sorts) {
        if (!Array.isArray(sorts)) {
            sorts = [sorts];
        }
        return function (a, b) {
            if (a === b) {
                return 0;
            }
            if (!(a != null)) {
                return +1;
            }
            if (!(b != null)) {
                return -1;
            }
            for (var _i = 0; _i < sorts.length; _i++) {
                var sort = sorts[_i];
                for (var name in sort) {
                    var ascending = sort[name];
                    var aValue = a[name] != null ? a[name] : null;
                    var bValue = b[name] != null ? b[name] : null;
                    if (aValue === bValue) {
                        continue;
                    }
                    if (aValue != null && !(bValue != null)) {
                        return -1;
                    }
                    if (!(aValue != null) && bValue != null) {
                        return +1;
                    }
                    if (aValue > bValue) {
                        return ascending ? +1 : -1;
                    }
                    if (aValue < bValue) {
                        return ascending ? -1 : +1;
                    }
                }
            }
            return 0;
        };
    }, runFile = exports.runFile = function (file) {
        return require('./builder').runFile(file);
    }, patch = exports.patch = function () {
        var mergePatch = require('./mergePatch');
        var patchFunction = function (object, patch, schema) {
            return mergePatch.merge(object, patch, null, schema);
        };
        for (var key in mergePatch) {
            var value = mergePatch[key];
            patchFunction[key] = value;
        }
        return patchFunction;
    }(), create = exports.create = function (type, args) {
        return variableArgConstructs[args.length](type, args);
    }, setImmediate = exports.setImmediate = function (callback) {
        if (global.setImmediate != null) {
            var id = global.setImmediate(callback);
            return function () {
                return global.clearImmediate(id);
            };
        } else {
            var id = setTimeout(callback, 50);
            return function () {
                return clearTimeout(id);
            };
        }
    }, requestAnimationFrame = exports.requestAnimationFrame = function (callback) {
        if (global.requestAnimationFrame != null) {
            return global.requestAnimationFrame(callback);
        } else if ((global != null ? global.nextTick : void 0) != null) {
            global.process.nextTick(callback);
        } else {
            setImmediate(callback);
        }
    }, throttleAnimation = exports.throttleAnimation = function (callback) {
        var awaitingCallbackArgs = null;
        var animationFrameCallback = function () {
            callback.apply(null, awaitingCallbackArgs);
            awaitingCallbackArgs = null;
        };
        return function () {
            if (!(awaitingCallbackArgs != null)) {
                requestAnimationFrame(animationFrameCallback);
            }
            awaitingCallbackArgs = Array.prototype.slice.call(arguments, 0);
        };
    }, template = exports.template = function (fn, template) {
        fn.template = template != null ? template : true;
        return fn;
    }, createRuntime = exports.createRuntime = function (ast, args, parent) {
        var Context = require('./runtime/Context');
        var context = new Context(parent);
        if (args != null) {
            for (var name in args) {
                var value = args[name];
                context.setVariableLiteral(name, value);
            }
        }
        return context.createRuntime(ast);
    }, clone = exports.clone = function (object, _deep, depth) {
        if (_deep == null)
            _deep = false;
        if (depth == null)
            depth = 0;
        if (object === null || typeof object !== 'object') {
            return object;
        }
        if (depth >= 50) {
            console.log('this is too deep, debug it');
            debugger;
        }
        var copy = Array.isArray(object) ? [] : {};
        if (_deep) {
            for (var k in object) {
                var v = object[k];
                copy[k] = clone(v, true, depth + 1);
            }
        } else {
            for (var k in object) {
                var v = object[k];
                copy[k] = v;
            }
        }
        return copy;
    }, observe = exports.observe = function (object, observer, options) {
        if (object === global || object === console || isValueType(object)) {
            return noop;
        }
        var property = options != null ? options.property : void 0;
        var priority = options != null ? options.priority : void 0;
        var removed = false;
        var observable = isObjectObservable(object);
        if (!observable) {
            if (!(property != null)) {
                return noop;
            }
            observeShim.observe(object, observer, property, priority);
        } else if (object != null && observer != null && typeof object === 'object') {
            observeShim.observe(object, observer, null, priority);
            object.addEventListener != null ? object.addEventListener('change', observer) : void 0;
        }
        object != null ? object.onObserved != null ? object.onObserved(observer, property) : void 0 : void 0;
        observe.count = (observe.count != null ? observe.count : 0) + 1;
        return function () {
            if (!removed) {
                observe.count--;
                removed = true;
                if (!observable) {
                    observeShim.unobserve(object, observer, property);
                } else if (object != null && observer != null && typeof object === 'object') {
                    observeShim.unobserve(object, observer, property);
                    object.removeEventListener != null ? object.removeEventListener('change', observer) : void 0;
                }
                object != null ? object.unObserved != null ? object.unObserved(observer, property) : void 0 : void 0;
            } else {
                console.warn('unobserve should not be called multiple times!');
            }
        };
    }, checkForChanges = exports.checkForChanges = observeShim.checkForChanges, sync = exports.sync = observeShim.checkForChanges, nextCheck = exports.nextCheck = function (callback) {
        observeShim.nextCheck(callback);
    }, bind = exports.bind = function (fn, thisArg) {
        var newFn = fn.bind(thisArg);
        if ((fn.name != null ? fn.name.length : void 0) > 0) {
            newFn.id = fn.id != null ? fn.id : fn.name;
        }
        return newFn;
    }, add = exports.add = function (container, item, sourceNode) {
        var originalItem = item;
        var remove;
        if (typeof item === 'function' && ((item.name != null ? item.name.length : void 0) > 0 || item.id != null) && typeof container.addEventListener === 'function') {
            var name = item.id != null ? item.id : item.name;
            var capture = false;
            var captureSuffix = '_capture';
            if (name.endsWith(captureSuffix)) {
                capture = true;
                name = name.substring(0, name.length - captureSuffix.length);
            }
            item = function () {
                originalItem.apply(this, arguments);
                sync(name);
            };
            container.addEventListener(name, item, capture);
            remove = function () {
                container.removeEventListener(name, item);
            };
        } else {
            if (container.nodeType === 1) {
                if (typeof item !== 'string' && !((item != null ? item.nodeType : void 0) != null)) {
                    item = JSON.stringify(item);
                }
                if (typeof item === 'string') {
                    item = document.createTextNode(item);
                }
                container.appendChild(item);
            } else if (container.push != null) {
                container.push(item);
            } else {
                container.add(item);
            }
            remove = function () {
                if ((item != null ? item.removeSelf : void 0) != null) {
                    item.removeSelf();
                } else if ((item != null ? item.parentNode : void 0) != null) {
                    item.parentNode.removeChild(item);
                } else if (container.lastIndexOf != null && container.removeAt != null) {
                    var index = container.lastIndexOf(item);
                    if (index >= 0) {
                        container.removeAt(index);
                    }
                } else if (typeof container.remove === 'function') {
                    container.remove(item);
                } else if (Array.isArray(container)) {
                    var index = container.lastIndexOf(item);
                    if (index >= 0) {
                        container.splice(index, 1);
                    }
                }
            };
        }
        item != null ? item.onAdded != null ? item.onAdded(container) : void 0 : void 0;
        return function () {
            remove();
            item != null ? item.onRemoved != null ? item.onRemoved(container) : void 0 : void 0;
        };
    }, defineProperties = exports.defineProperties = function (object, properties) {
        return Object.defineProperties(object, normalizeProperties(properties));
    }, defineClass = exports.defineClass = function (___definitions) {
        var definitions = Array.prototype.slice.call(arguments, 0);
        var classDefinition = definitions[0];
        if (definitions[1] === void 0) {
            definitions[1] = require('./Object');
        }
        classDefinition.super = definitions[1];
        var name = classDefinition.name != null ? classDefinition.name : classDefinition.id != null ? classDefinition.id.match(/([a-z_0-9\$]+)(\.js)?$/i) != null ? classDefinition.id.match(/([a-z_0-9\$]+)(\.js)?$/i)[1] : void 0 : void 0;
        if (!(name != null)) {
            throw new Error('missing name property');
        }
        var classFunction;
        if (classDefinition.hasOwnProperty('constructor')) {
            classFunction = classDefinition.constructor;
        } else if (classDefinition.super != null) {
            classFunction = eval('(function ' + name + '() { ' + name + '.super.apply(this, arguments); })');
        } else {
            classFunction = eval('(function ' + name + '() {})');
        }
        var canSetClassProperty = function (key) {
            if (key === 'name') {
                return false;
            }
            var descriptor = Object.getOwnPropertyDescriptor(classFunction, key);
            return !(descriptor != null) || descriptor.writable || !(descriptor.get != null);
        };
        var types = new Set();
        types.add(classFunction);
        for (var i = definitions.length - 1; i >= 0; i--) {
            var definition = definitions[i];
            if (definition != null) {
                types.add(definition);
                for (var key in definition) {
                    var value = definition[key];
                    if (key !== 'test' || i === 0) {
                        if (canSetClassProperty(key)) {
                            classFunction[key] = patch(classFunction[key], value);
                        }
                    }
                }
            }
        }
        classFunction.types = types;
        if (classFunction.properties != null) {
            defineProperties(classFunction.prototype, classFunction.properties);
        }
        return classFunction;
    }, is = exports.is = function (instance, type) {
        if (!(instance != null)) {
            return false;
        }
        if (!(type != null)) {
            return true;
        }
        if (typeof type === 'function') {
            if (typeof instance.is === 'function') {
                return instance.is(type);
            }
            return instance instanceof type;
        } else {
            return instance === type;
        }
    }, makeReactive = exports.makeReactive = function (object, activate) {
        var observeCount = 0;
        var deactivate = null;
        return Object.defineProperties(object, {
            onObserved: {
                value: function () {
                    observeCount++;
                    if (observeCount === 1) {
                        deactivate = activate.call(object);
                    }
                }
            },
            unObserved: {
                value: function () {
                    observeCount--;
                    if (observeCount === 0) {
                        deactivate != null ? deactivate() : void 0;
                    }
                }
            }
        });
    }, serialize = exports.serialize = function (object) {
        return JSON.stringify(object);
    }, typeKey = exports.typeKey = '$', deserialize = exports.deserialize = function () {
        var extractType = function (object, namespace) {
            if (!(object != null)) {
                return null;
            }
            var typeName = object[typeKey];
            if (!(typeName != null)) {
                return null;
            }
            typeName = typeName.split(/\//g).pop();
            var type = namespace[typeName];
            if (!(type != null)) {
                throw new Error('Type not found: ' + typeName);
            }
            if (!type.serializable) {
                throw new Error('Type is not serializable: ' + typeName);
            }
            return type;
        };
        var convertType = function (object, namespace) {
            var type = extractType(object, namespace);
            if (type != null) {
                var values = object;
                object = new type();
                for (var k in values) {
                    var v = values[k];
                    var property = type.properties != null ? type.properties[k] : void 0;
                    if (!((property != null ? property.get : void 0) != null) || (property != null ? property.set : void 0) != null) {
                        object[k] = v;
                    }
                }
            }
            for (var key in object) {
                var value = object[key];
                if ((value != null ? value.constructor : void 0) === Object) {
                    object[key] = convertType(value, namespace);
                }
            }
            return object;
        };
        var deserialize = function (object, namespace) {
            if (typeof object === 'string') {
                object = JSON.parse(object);
            }
            return convertType(object, namespace);
        };
        deserialize.extractType = extractType;
        deserialize.convertType = convertType;
        return deserialize;
    }(), reactive = exports.reactive = function (fn) {
        var state = {};
        var patchResult = function (intermediateResult) {
            var diff = ion.patch.diff(state.result, intermediateResult);
            if (diff !== void 0) {
                state.result = ion.patch(state.result, diff);
            }
        };
        return ion.template(function (arg) {
            return ion.createRuntime({
                type: 'Template',
                id: null,
                body: [
                    {
                        type: 'VariableDeclaration',
                        declarations: [{
                                type: 'VariableDeclarator',
                                id: {
                                    type: 'Identifier',
                                    name: 'intermediateResult',
                                    loc: {
                                        start: {
                                            line: 372,
                                            column: 16,
                                            fixed: true,
                                            source: 'ion/index.ion'
                                        },
                                        end: {
                                            line: 372,
                                            column: 34,
                                            fixed: true,
                                            source: 'ion/index.ion'
                                        }
                                    }
                                },
                                init: {
                                    type: 'CallExpression',
                                    callee: {
                                        type: 'Identifier',
                                        name: 'fn',
                                        loc: {
                                            start: {
                                                line: 372,
                                                column: 37,
                                                fixed: true,
                                                source: 'ion/index.ion'
                                            },
                                            end: {
                                                line: 372,
                                                column: 39,
                                                fixed: true,
                                                source: 'ion/index.ion'
                                            }
                                        }
                                    },
                                    arguments: [{
                                            type: 'Identifier',
                                            name: 'arg',
                                            loc: {
                                                start: {
                                                    line: 372,
                                                    column: 45,
                                                    fixed: true,
                                                    source: 'ion/index.ion'
                                                },
                                                end: {
                                                    line: 372,
                                                    column: 48,
                                                    fixed: true,
                                                    source: 'ion/index.ion'
                                                }
                                            },
                                            deep: true
                                        }],
                                    loc: {
                                        start: {
                                            line: 372,
                                            column: 37,
                                            fixed: true,
                                            source: 'ion/index.ion'
                                        },
                                        end: {
                                            line: 372,
                                            column: 49,
                                            fixed: true,
                                            source: 'ion/index.ion'
                                        }
                                    }
                                }
                            }],
                        kind: 'let',
                        order: '0'
                    },
                    {
                        type: 'ExpressionStatement',
                        expression: {
                            type: 'CallExpression',
                            callee: {
                                type: 'Identifier',
                                name: 'patchResult',
                                loc: {
                                    start: {
                                        line: 373,
                                        column: 12,
                                        fixed: true,
                                        source: 'ion/index.ion'
                                    },
                                    end: {
                                        line: 373,
                                        column: 23,
                                        fixed: true,
                                        source: 'ion/index.ion'
                                    }
                                }
                            },
                            arguments: [{
                                    type: 'Identifier',
                                    name: 'intermediateResult',
                                    loc: {
                                        start: {
                                            line: 373,
                                            column: 29,
                                            fixed: true,
                                            source: 'ion/index.ion'
                                        },
                                        end: {
                                            line: 373,
                                            column: 47,
                                            fixed: true,
                                            source: 'ion/index.ion'
                                        }
                                    },
                                    deep: true
                                }],
                            loc: {
                                start: {
                                    line: 373,
                                    column: 12,
                                    fixed: true,
                                    source: 'ion/index.ion'
                                },
                                end: {
                                    line: 373,
                                    column: 48,
                                    fixed: true,
                                    source: 'ion/index.ion'
                                }
                            }
                        },
                        loc: {
                            start: {
                                line: 373,
                                column: 12,
                                fixed: true,
                                source: 'ion/index.ion'
                            },
                            end: {
                                line: 373,
                                column: 48,
                                fixed: true,
                                source: 'ion/index.ion'
                            }
                        },
                        order: '1'
                    },
                    {
                        type: 'ReturnStatement',
                        argument: {
                            type: 'MemberExpression',
                            computed: false,
                            object: {
                                type: 'Identifier',
                                name: 'state',
                                loc: {
                                    start: {
                                        line: 374,
                                        column: 19,
                                        fixed: true,
                                        source: 'ion/index.ion'
                                    },
                                    end: {
                                        line: 374,
                                        column: 24,
                                        fixed: true,
                                        source: 'ion/index.ion'
                                    }
                                }
                            },
                            property: {
                                type: 'Identifier',
                                name: 'result',
                                loc: {
                                    start: {
                                        line: 374,
                                        column: 25,
                                        fixed: true,
                                        source: 'ion/index.ion'
                                    },
                                    end: {
                                        line: 374,
                                        column: 31,
                                        fixed: true,
                                        source: 'ion/index.ion'
                                    }
                                }
                            },
                            loc: {
                                start: {
                                    line: 374,
                                    column: 19,
                                    fixed: true,
                                    source: 'ion/index.ion'
                                },
                                end: {
                                    line: 374,
                                    column: 31,
                                    fixed: true,
                                    source: 'ion/index.ion'
                                }
                            }
                        },
                        order: '2'
                    }
                ],
                bound: false
            }, {
                this: this,
                arg: arg,
                state: state,
                patchResult: patchResult,
                fn: fn,
                ion: ion,
                noop: noop,
                valueTypes: valueTypes,
                isValueType: isValueType,
                primitive: primitive,
                isPrimitive: isPrimitive,
                normalizeProperty: normalizeProperty,
                normalizeProperties: normalizeProperties,
                variableArgConstructs: variableArgConstructs,
                observeShim: observeShim,
                isObjectObservable: isObjectObservable,
                freeze: freeze,
                createSortFunction: createSortFunction,
                runFile: runFile,
                patch: patch,
                create: create,
                setImmediate: setImmediate,
                requestAnimationFrame: requestAnimationFrame,
                throttleAnimation: throttleAnimation,
                template: template,
                createRuntime: createRuntime,
                clone: clone,
                observe: observe,
                checkForChanges: checkForChanges,
                sync: sync,
                nextCheck: nextCheck,
                bind: bind,
                add: add,
                defineProperties: defineProperties,
                defineClass: defineClass,
                is: is,
                makeReactive: makeReactive,
                serialize: serialize,
                typeKey: typeKey,
                deserialize: deserialize,
                reactive: reactive,
                test: test
            }, null);
        });
    }, test = exports.test = {
        defineClass: function () {
            var Foo = defineClass({
                    id: 'Foo',
                    constructor: function (number) {
                        this.number = number;
                    },
                    properties: {
                        getValue: function () {
                            return this.number;
                        }
                    }
                });
            if (!(new Foo(2).getValue() === 2))
                throw new Error('Assertion Failed: (new Foo(2).getValue() is 2)');
        },
        sortFunction: function () {
            var records = [
                    {
                        name: 'a',
                        order: 1
                    },
                    {
                        name: 'b',
                        order: 2
                    },
                    {
                        name: 'q',
                        order: null
                    },
                    {
                        name: 'd',
                        order: 4
                    },
                    {
                        name: 'c',
                        order: void 0
                    }
                ];
            records.sort(ion.createSortFunction([{ order: true }]));
            if (!(records.map(function (x) {
                    return x.name;
                }).join('') === 'abdqc'))
                throw new Error('Assertion Failed: (records.map((x) -> x.name).join(\'\') is \'abdqc\')');
            records = [
                {
                    name: 'a',
                    order: 1
                },
                {
                    name: 'b',
                    order: 2
                },
                {
                    name: 'q',
                    order: null
                },
                {
                    name: 'd',
                    order: 4
                },
                {
                    name: 'c',
                    order: void 0
                }
            ];
            records.sort(ion.createSortFunction([{ order: false }]));
            if (!(records.map(function (x) {
                    return x.name;
                }).join('') === 'dbaqc'))
                throw new Error('Assertion Failed: (records.map((x) -> x.name).join(\'\') is \'dbaqc\')');
        },
        defineProperties: {
            'should allow primitive values': function () {
                var object = {};
                var result = defineProperties(object, {
                        f: function () {
                            return 'function';
                        },
                        i: 2,
                        b: true,
                        a: [],
                        s: 'hello'
                    });
                if (!(object === result))
                    throw new Error('Assertion Failed: (object is result)');
                if (!(typeof object.f === 'function'))
                    throw new Error('Assertion Failed: (typeof object.f is \'function\')');
                if (!(object.f() === 'function'))
                    throw new Error('Assertion Failed: (object.f() is \'function\')');
                if (!(object.i === 2))
                    throw new Error('Assertion Failed: (object.i is 2)');
                if (!(object.b === true))
                    throw new Error('Assertion Failed: (object.b is true)');
                if (!Array.isArray(object.a))
                    throw new Error('Assertion Failed: (Array.isArray(object.a))');
                if (!(object.s === 'hello'))
                    throw new Error('Assertion Failed: (object.s is \'hello\')');
            }
        }
    };
{
    var _ref = [
            'runtime',
            'compiler',
            'builder',
            'browser'
        ];
    for (var _i2 = 0; _i2 < _ref.length; _i2++) {
        var name = _ref[_i2];
        (function (name) {
            Object.defineProperty(exports, name, {
                enumerable: true,
                get: function () {
                    return require('./' + name);
                }
            });
        }(name));
    }
}
if (global.window != null) {
    global.window.addEventListener('resize', sync);
}
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/index',_ion_index_);
    else
      _ion_index_.call(this, module, exports, require);
  }
  else {
    _ion_index_.call(this);
  }
}).call(this)