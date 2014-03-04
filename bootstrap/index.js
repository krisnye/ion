'use strict';
const nextTick = exports.nextTick = (this.process != null ? this.process.nextTick : void 0) != null ? this.process.nextTick : function (fn) {
        return setTimeout(fn, 0);
    };
const clone = exports.clone = function (object, deep) {
        deep = deep != null ? deep : false;
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