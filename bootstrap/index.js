'use strict';
const create = exports.create = function (type, properties) {
        let instance = typeof type === 'function' ? new type() : type;
        if (instance != null && properties != null)
            for (let key in properties) {
                let value = properties[key];
                instance[key] = value;
            }
        return instance;
    };