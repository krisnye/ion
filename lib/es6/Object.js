void (function(){var _ion_es6_Object_ = function(module,exports,require){'use strict';
if (!(Object.is != null)) {
    Object.defineProperty(Object, 'is', {
        value: function (a, b) {
            if (a === b) {
                if (a === 0) {
                    return 1 / a === 1 / b;
                }
                return true;
            }
            return a !== a && b !== b;
        }
    });
}
Object.isEmpty = function (object) {
    if (!(object != null)) {
        return true;
    }
    if (typeof object === 'string') {
        return object.trim().length === 0;
    }
    if (Array.isArray(object)) {
        return object.length === 0;
    }
    if (object.constructor === Object) {
        for (var key in object) {
            return false;
        }
        return true;
    }
    return false;
};
var test = exports.test = function () {
        if (!Object.isEmpty(null))
            throw new Error('Assertion Failed: (Object.isEmpty(null))');
        if (!Object.isEmpty())
            throw new Error('Assertion Failed: (Object.isEmpty())');
        if (!Object.isEmpty(void 0))
            throw new Error('Assertion Failed: (Object.isEmpty(undefined))');
        if (!Object.isEmpty([]))
            throw new Error('Assertion Failed: (Object.isEmpty([]))');
        if (!Object.isEmpty({}))
            throw new Error('Assertion Failed: (Object.isEmpty({}))');
        if (!Object.isEmpty(''))
            throw new Error('Assertion Failed: (Object.isEmpty(""))');
        if (!Object.isEmpty(' '))
            throw new Error('Assertion Failed: (Object.isEmpty(" "))');
        if (!!Object.isEmpty([1]))
            throw new Error('Assertion Failed: (not Object.isEmpty([1]))');
        if (!!Object.isEmpty({ x: 1 }))
            throw new Error('Assertion Failed: (not Object.isEmpty({x:1}))');
        if (!!Object.isEmpty('h'))
            throw new Error('Assertion Failed: (not Object.isEmpty("h"))');
        if (!!Object.isEmpty(true))
            throw new Error('Assertion Failed: (not Object.isEmpty(true))');
        if (!!Object.isEmpty(false))
            throw new Error('Assertion Failed: (not Object.isEmpty(false))');
        if (!!Object.isEmpty(45))
            throw new Error('Assertion Failed: (not Object.isEmpty(45))');
        if (!!Object.isEmpty(new Date()))
            throw new Error('Assertion Failed: (not Object.isEmpty(new Date()))');
    };
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/Object',_ion_es6_Object_);
    else
      _ion_es6_Object_.call(this, module, exports, require);
  }
  else {
    _ion_es6_Object_.call(this);
  }
}).call(this)
//# sourceMappingURL=./Object.map