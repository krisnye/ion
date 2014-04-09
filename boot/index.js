(function(){var _ion_index_ = function(module,exports,require){'use strict';
require('./es6');
const mergePatch = require('./mergePatch'), primitive = {
        string: true,
        number: true,
        boolean: true,
        function: true
    }, isPrimitive = function (object) {
        return !(object != null) || primitive[typeof object] || false;
    }, normalizeProperty = function (property) {
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
        return property;
    }, normalizeProperties = function (properties) {
        if (properties == null)
            properties = {};
        for (let name in properties) {
            let property = properties[name];
            properties[name] = normalizeProperty(property);
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
    ];
const patch = exports.patch = function (target, values, deleteNull) {
        return mergePatch.apply(target, values, deleteNull);
    }, create = exports.create = function (type, args) {
        return variableArgConstructs[args.length](type, args);
    }, createRuntime = exports.createRuntime = function (ast, args) {
        const Context = require('./runtime/Context');
        const context = new Context();
        if (args != null) {
            for (let name in args) {
                let value = args[name];
                context.setVariable(name, value);
            }
        }
        return context.createRuntime(ast);
    }, nextTick = exports.nextTick = (this.process != null ? this.process.nextTick : void 0) != null ? this.process.nextTick : function (fn) {
        return setTimeout(fn, 0);
    }, clone = exports.clone = function (object, deep) {
        if (deep == null)
            deep = false;
        if ((object != null ? object.constructor : void 0) === Object) {
            let _ref2 = {};
            {
                for (let key in object) {
                    let value = object[key];
                    _ref2[key] = deep ? clone(value, deep) : value;
                }
            }
            return _ref2;
        } else if (Array.isArray(object)) {
            let _ref = [];
            for (let _i = 0; _i < object.length; _i++) {
                let item = object[_i];
                _ref.push(deep ? clone(item, deep) : item);
            }
            return _ref;
        } else {
            return object;
        }
    }, observe = exports.observe = function (object, observer, property) {
        if (object != null && observer != null && Object.observe != null && typeof object === 'object') {
            Object.observe(object, observer);
            object.addEventListener != null ? object.addEventListener('change', observer) : void 0;
        }
        object != null ? object.onObserved != null ? object.onObserved(observer, property) : void 0 : void 0;
    }, unobserve = exports.unobserve = function (object, observer, property) {
        if (object != null && observer != null && Object.unobserve != null && typeof object === 'object') {
            Object.unobserve(object, observer);
            object.removeEventListener != null ? object.removeEventListener('change', observer) : void 0;
        }
        object != null ? object.unObserved != null ? object.unObserved(observer, property) : void 0 : void 0;
    }, add = exports.add = function (container, item) {
        if (container.nodeType === 1) {
            if (typeof item === 'string') {
                item = document.createTextNode(item);
            }
            container.appendChild(item);
        } else if (container.push != null) {
            container.push(item);
        } else {
            container.add(item);
        }
        item.onAdded != null ? item.onAdded(container) : void 0;
        return function () {
            if (container.nodeType === 1) {
                container.removeChild(item);
            } else if (container.lastIndexOf != null && container.removeAt != null) {
                let index = container.lastIndexOf(item);
                if (index >= 0) {
                    container.removeAt(index);
                }
            } else if (typeof container.remove === 'function') {
                container.remove(item);
            } else {
                remove(container, item);
            }
            item.onRemoved != null ? item.onRemoved(container) : void 0;
        };
    }, remove = exports.remove = function (array, item) {
        if (array != null) {
            let index = array.lastIndexOf(item);
            if (index >= 0) {
                array.splice(index, 1);
                return index;
            }
        }
        return;
    }, defineProperties = exports.defineProperties = function (object, properties) {
        return Object.defineProperties(object, normalizeProperties(properties));
    }, defineClass = exports.defineClass = function (___definitions) {
        let definitions = Array.prototype.slice.call(arguments, 0);
        const classDefinition = definitions[0];
        if (definitions[1] === void 0) {
            definitions[1] = require('./Object');
        }
        classDefinition.super = definitions[1];
        const name = classDefinition.name != null ? classDefinition.name : classDefinition.id != null ? classDefinition.id.match(/([a-z_0-9\$]+)(\.js)?$/i) != null ? classDefinition.id.match(/([a-z_0-9\$]+)(\.js)?$/i)[1] : void 0 : void 0;
        if (!(name != null)) {
            throw new Error('missing name property');
        }
        let classFunction;
        if (classDefinition.hasOwnProperty('constructor')) {
            classFunction = classDefinition.constructor;
        } else if (classDefinition.super != null) {
            classFunction = eval('(function ' + name + '() { ' + name + '.super.apply(this, arguments); })');
        } else {
            classFunction = eval('(function ' + name + '() {})');
        }
        for (let i = definitions.length - 1; i >= 0; i--) {
            const definition = definitions[i];
            for (let key in definition) {
                let value = definition[key];
                if (key !== 'test' || i === 0) {
                    classFunction[key] = mergePatch.apply(classFunction[key], value);
                }
            }
        }
        if (classFunction.properties != null) {
            defineProperties(classFunction.prototype, classFunction.properties);
        }
        return classFunction;
    }, get = exports.get = function (object, property) {
        if (!(object != null && property != null)) {
            return void 0;
        }
        if (typeof object.get === 'function') {
            return object.get(property);
        } else {
            return object[property];
        }
    }, set = exports.set = function (object, property, value) {
        if (object != null && property != null) {
            if (arguments.length === 2) {
                for (let k in property) {
                    let v = property[k];
                    set(object, k, v);
                }
                return;
            }
            if (typeof object.set === 'function') {
                object.set(property, value);
            } else if (value === void 0) {
                delete object[property];
            } else {
                object[property] = value;
            }
            value != null ? value.onSet != null ? value.onSet(object, property) : void 0 : void 0;
        }
        return value;
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
        let observeCount = 0;
        let deactivate = null;
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
    }, test = exports.test = {
        defineClass: function () {
            const Foo = defineClass({
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
                const object = {};
                const result = defineProperties(object, {
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