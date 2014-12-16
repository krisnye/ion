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