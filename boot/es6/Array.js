void (function(){var _ion_es6_Array_ = function(module,exports,require){'use strict';
if (!(Array.prototype.add != null)) {
    Object.defineProperty(Array.prototype, 'add', { value: Array.prototype.push });
}
if (!(Array.prototype.remove != null)) {
    Object.defineProperty(Array.prototype, 'remove', {
        value: function () {
            for (var _i = 0; _i < arguments.length; _i++) {
                var item = arguments[_i];
                var index = this.lastIndexOf(item);
                if (index >= 0) {
                    this.splice(index, 1);
                }
            }
        }
    });
}
if (!(Array.prototype.contains != null)) {
    Object.defineProperty(Array.prototype, 'contains', {
        value: function (item) {
            return this.indexOf(item) >= 0;
        }
    });
}
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/Array',_ion_es6_Array_);
    else
      _ion_es6_Array_.call(this, module, exports, require);
  }
  else {
    _ion_es6_Array_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./Array.map