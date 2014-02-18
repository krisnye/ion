'use strict';
const compile = exports.compile = require('./compiler').compile;
const create = exports.create = function (type, properties) {
        if (typeof type === 'function')
            instance = new type();
        else
            instance = type;
        if (instance != null && properties != null)
            for (let key in properties) {
                let value = properties[key];
                instance[key] = value;
            }
        return instance;
    };