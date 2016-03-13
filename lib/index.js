void (function(){var _ion_index_ = function(module,exports,require){'use strict';
var ion = null;
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
        return function (a, b) {
            if (a === b) {
                return 0;
            }
            if (!(a != null)) {
                return b;
            }
            if (!(b != null)) {
                return a;
            }
            for (var _i = 0; _i < sorts.length; _i++) {
                var sort = sorts[_i];
                for (var name in sort) {
                    var ascending = sort[name];
                    var aValue = a[name];
                    var bValue = b[name];
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
    }, clone = exports.clone = function (object, _deep) {
        if (_deep == null)
            _deep = false;
        if (Array.isArray(object)) {
            var _ref = [];
            for (var _i2 = 0; _i2 < object.length; _i2++) {
                var item = object[_i2];
                _ref.push(_deep ? clone(item, _deep) : item);
            }
            return _ref;
        } else if ((object != null ? object.constructor : void 0) === Object) {
            var _ref3 = {};
            for (var key in object) {
                var value = object[key];
                _ref3[key] = _deep ? clone(value, _deep) : value;
            }
            return _ref3;
        } else {
            return object;
        }
    }, observe = exports.observe = function (object, observer, options) {
        if (object === global || object === console || isValueType(object)) {
            return noop;
        }
        var property = options != null ? options.property : void 0;
        var removed = false;
        var observable = isObjectObservable(object);
        if (!observable) {
            if (!(property != null)) {
                return noop;
            }
            observeShim.observe(object, observer, property);
        } else if (object != null && observer != null && typeof object === 'object') {
            observeShim.observe(object, observer);
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
                } else if (object != null && observer != null && Object.unobserve != null && typeof object === 'object') {
                    Object.unobserve(object, observer);
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
    }, add = exports.add = function (container, item) {
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
            if (item.toString().indexOf('sync') < 0) {
                item = function () {
                    originalItem.apply(this, arguments);
                    sync();
                };
            }
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
    }, deserialize = exports.deserialize = function () {
        var extractType = function (object, namespace) {
            if (!(object != null)) {
                return null;
            }
            var typeKey = require('./Object').typeKey;
            var typeName = object[typeKey];
            if (!(typeName != null)) {
                return null;
            }
            typeName = typeName.split(/\//g).pop();
            var type = namespace[typeName];
            if (!type.serializable) {
                throw new Error('Type is not serializable: ' + typeName);
            }
            return type;
        };
        var convertType = function (object, namespace) {
            var type = extractType(object, namespace);
            if (type != null) {
                object = new type(object);
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
    }(), test = exports.test = {
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
    var _ref2 = [
            'runtime',
            'compiler',
            'builder',
            'browser'
        ];
    for (var _i3 = 0; _i3 < _ref2.length; _i3++) {
        var name = _ref2[_i3];
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