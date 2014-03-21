'use strict';
const primitive = {
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
    };
const createRuntime = exports.createRuntime = function (ast, args) {
        const Context = require('./runtime/Context');
        const context = new Context();
        if (variables != null) {
            for (let name in variables) {
                let value = variables[name];
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
            let _ref = {};
            for (let key in object) {
                let value = object[key];
                _ref[key] = deep ? clone(value, deep) : value;
            }
            return _ref;
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
    }, add = exports.add = function (container, item, returnRemoveFunction) {
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
        if (returnRemoveFunction) {
            return function () {
                if (container.nodeType === 1) {
                    container.removeChild(item);
                } else if (container.lastIndexOf != null && container.removeAt != null) {
                    let index = container.lastIndexOf(item);
                    if (index >= 0) {
                        container.removeAt(index);
                    }
                } else {
                    container.remove(item);
                }
                item.onRemoved != null ? item.onRemoved(container) : void 0;
            };
        }
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
        const mergePatch = require('./mergePatch');
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