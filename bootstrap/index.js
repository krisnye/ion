'use strict';
const primitive = {
        string: true,
        number: true,
        boolean: true,
        function: true
    };
const nextTick = exports.nextTick = (this.process != null ? this.process.nextTick : void 0) != null ? this.process.nextTick : function (fn) {
        return setTimeout(fn, 0);
    };
const clone = exports.clone = function (object) {
        let _ref = [];
        for (let _i = 0; _i < object.length; _i++) {
            let item = object[_i];
            _ref.push(item);
        }
        let _ref2 = {};
        for (let key in object) {
            let value = object[key];
            _ref2[key] = value;
        }
        if ((object != null ? object.constructor : void 0) === Object)
            return _ref2;
        else if (Array.isArray(object))
            return _ref;
        else
            return object;
    };