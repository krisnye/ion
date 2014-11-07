void (function(){var _ion_index_ = function(module,exports,require){'use strict';
var ion = null;
require('./es6');
global.DEBUG = global.DEBUG != null ? global.DEBUG : false;
var primitive = {
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
    ], nodeObserveShim = (Object.observe != null ? Object.observe.checkForChanges : void 0) ? Object : require('./es6/Object.observe').createShim(), isObjectObservable = function () {
        var Node = global.Node != null ? global.Node : function () {
            };
        var NodeList = global.NodeList != null ? global.NodeList : function () {
            };
        return function (a) {
            if (a instanceof Node || a instanceof NodeList) {
                return false;
            }
            return true;
        };
    }();
var patch = exports.patch = function () {
        var mergePatch = require('./mergePatch');
        var patch = function (object, patch) {
            return mergePatch.merge(object, patch);
        };
        for (var key in mergePatch) {
            var value = mergePatch[key];
            patch[key] = value;
        }
        return patch;
    }(), create = exports.create = function (type, args) {
        return variableArgConstructs[args.length](type, args);
    }, template = exports.template = function (fn, template) {
        fn.template = template != null ? template : true;
        return fn;
    }, createRuntime = exports.createRuntime = function (ast, args) {
        var Context = require('./runtime/Context');
        var context = new Context();
        if (args != null) {
            for (var name in args) {
                var value = args[name];
                context.setVariableLiteral(name, value);
            }
        }
        return context.createRuntime(ast);
    }, nextTick = exports.nextTick = (this.process != null ? this.process.nextTick : void 0) != null ? this.process.nextTick : function (fn) {
        return setTimeout(fn, 0);
    }, clone = exports.clone = function (object, deep) {
        if (deep == null)
            deep = false;
        if (Array.isArray(object)) {
            var _ref = [];
            for (var _i = 0; _i < object.length; _i++) {
                var item = object[_i];
                _ref.push(deep ? clone(item, deep) : item);
            }
            return _ref;
        } else if ((object != null ? object.constructor : void 0) === Object) {
            var _ref2 = {};
            for (var key in object) {
                var value = object[key];
                _ref2[key] = deep ? clone(value, deep) : value;
            }
            return _ref2;
        } else {
            return object;
        }
    }, observe = exports.observe = function (object, observer, property) {
        if (object === global || object === console) {
            return;
        }
        if (!isObjectObservable(object)) {
            if (!(property != null)) {
                return;
            }
            nodeObserveShim.observe(object, observer, property);
        } else if (object != null && observer != null && Object.observe != null && typeof object === 'object') {
            if (DEBUG) {
                observer.tryWrapper = observer.tryWrapper != null ? observer.tryWrapper : function (changes) {
                    try {
                        observer(changes);
                    } catch (error) {
                        console.error('Exception in Object.observe callback', error);
                    }
                };
            }
            Object.observe(object, observer.tryWrapper != null ? observer.tryWrapper : observer);
            object.addEventListener != null ? object.addEventListener('change', observer) : void 0;
        }
        object != null ? object.onObserved != null ? object.onObserved(observer, property) : void 0 : void 0;
    }, unobserve = exports.unobserve = function (object, observer, property) {
        if (!isObjectObservable(object)) {
            if (!(property != null)) {
                return;
            }
            nodeObserveShim.unobserve(object, observer, property);
        } else if (object != null && observer != null && Object.unobserve != null && typeof object === 'object') {
            Object.unobserve(object, observer.tryWrapper != null ? observer.tryWrapper : observer);
            object.removeEventListener != null ? object.removeEventListener('change', observer) : void 0;
        }
        object != null ? object.unObserved != null ? object.unObserved(observer, property) : void 0 : void 0;
    }, checkForChanges = exports.checkForChanges = function () {
        if (Object.observe.checkForChanges != null) {
            Object.observe.checkForChanges();
        } else {
            nodeObserveShim.observe.checkForChanges();
        }
    }, bind = exports.bind = function (fn, thisArg) {
        var newFn = fn.bind(thisArg);
        if ((fn.name != null ? fn.name.length : void 0) > 0) {
            newFn.id = fn.id != null ? fn.id : fn.name;
        }
        return newFn;
    }, add = exports.add = function (container, item) {
        var remove;
        if (typeof item === 'function' && ((item.name != null ? item.name.length : void 0) > 0 || item.id != null) && typeof container.addEventListener === 'function') {
            var name = item.id != null ? item.id : item.name;
            var capture = false;
            var captureSuffix = '_capture';
            if (name.endsWith(captureSuffix)) {
                capture = true;
                name = name.substring(0, name.length - captureSuffix.length);
            }
            if ((Object.observe != null ? Object.observe.checkForChanges : void 0) != null) {
                var originalItem = item;
                item = function () {
                    originalItem.apply(this, arguments);
                    Object.observe.checkForChanges();
                };
            }
            container.addEventListener(name, item, capture);
            remove = function () {
                container.removeEventListener(name, item);
            };
        } else if (container.nodeType === 1) {
            if (typeof item !== 'string' && !(item.nodeType != null)) {
                item = JSON.stringify(item);
            }
            if (typeof item === 'string') {
                item = document.createTextNode(item);
            }
            container.appendChild(item);
            remove = function () {
                if (item.parentNode === container) {
                    container.removeChild(item);
                }
            };
        } else {
            if (container.push != null) {
                container.push(item);
            } else {
                container.add(item);
            }
            remove = function () {
                if (container.lastIndexOf != null && container.removeAt != null) {
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
        var extractType = function (object) {
            var typeKey = require('ion/Object').typeKey;
            var typeName = object[typeKey];
            if (!(typeName != null)) {
                return Object;
            }
            var type = require(typeName);
            if (!type.serializable) {
                throw new Error('Type is not serializable: ' + typeName);
            }
            delete object[typeKey];
            return type;
        };
        var deserialize = function (object) {
            if (typeof object === 'string') {
                object = JSON.parse(object);
            }
            var typeKey = require('ion/Object').typeKey;
            var typeName = object[typeKey];
            if (typeName != null) {
                var type = require(typeName);
                if (!type.serializable) {
                    throw new Error('Type is not serializable: ' + typeName);
                }
                var typedObject = new type();
                for (var key in object) {
                    var value = object[key];
                    if (key !== typeKey) {
                        typedObject[key] = object[key];
                    }
                }
                return typedObject;
            } else {
                return object;
            }
        };
        deserialize.extractType = extractType;
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
if (global.window != null) {
    global.window.addEventListener('resize', checkForChanges);
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
//@ sourceMappingURL=./index.map