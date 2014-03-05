'use strict';
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