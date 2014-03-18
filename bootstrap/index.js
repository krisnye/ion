'use strict';
const primitive = {
        string: true,
        number: true,
        boolean: true,
        function: true
    };
const isPrimitive = function (object) {
    return !(object != null) || primitive[typeof object] || false;
};
const normalizeProperty = function (property) {
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
};
const normalizeProperties = function (properties) {
    if (properties == null)
        properties = {};
    for (let name in properties) {
        let property = properties[name];
        properties[name] = normalizeProperty(property);
    }
    return properties;
};
const defineProperties = function (object, properties) {
    return Object.defineProperties(object, normalizeProperties(properties));
};
const nextTick = exports.nextTick = (this.process != null ? this.process.nextTick : void 0) != null ? this.process.nextTick : function (fn) {
        return setTimeout(fn, 0);
    };
const clone = exports.clone = function (object, deep) {
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
    };
const observe = exports.observe = function (object, observer, property) {
        if (object != null && observer != null && Object.observe != null && typeof object === 'object') {
            Object.observe(object, observer);
            object.addEventListener != null ? object.addEventListener('change', observer) : void 0;
        }
        object != null ? object.onObserved != null ? object.onObserved(observer, property) : void 0 : void 0;
    };
const unobserve = exports.unobserve = function (object, observer, property) {
        if (object != null && observer != null && Object.unobserve != null && typeof object === 'object') {
            Object.unobserve(object, observer);
            object.removeEventListener != null ? object.removeEventListener('change', observer) : void 0;
        }
        object != null ? object.unObserved != null ? object.unObserved(observer, property) : void 0 : void 0;
    };
const add = exports.add = function (container, item, returnRemoveFunction) {
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
    };
const defineClass = exports.defineClass = function (definitions) {
        definitions = Array.prototype.slice.call(arguments, 0);
        const classDefinition = definitions[0];
        classDefinition.super = definitions[1];
        const name = classDefinition.name != null ? classDefinition.name : classDefinition.id != null ? classDefinition.id.match(/([a-z_0-9\$]+)(\.js)?$/i) != null ? classDefinition.id.match(/([a-z_0-9\$]+)(\.js)?$/i)[1] : void 0 : void 0;
        if (!(name != null)) {
            throw new Error('missing name property');
        }
        let ctor;
        if (classDefinition.hasOwnProperty('constructor')) {
            ctor = classDefinition.constructor;
        } else {
            ctor = eval('(function ' + name + '() { this.constructor.super.apply(this, arguments); })');
        }
        const mergePatch = require('./mergePatch');
        for (let i = definitions.length - 1; i >= 0; i--) {
            const definition = definitions[i];
            for (let key in definition) {
                let value = definition[key];
                if (key !== 'test' || i === 0) {
                    ctor[key] = mergePatch.apply(ctor[key], value);
                }
            }
        }
        defineProperties(ctor.prototype, ctor.properties);
        return ctor;
    };
const test = exports.test = {
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
        }
    };