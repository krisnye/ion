void (function(){var _ion_es6_Function_ = function(module,exports,require){
// Fix Function#name on browsers that do not support it (IE):
if (!(function f() {}).name) {
    Object.defineProperty(Function.prototype, 'name', {
        get: function() {
            var name = this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1]
            Object.defineProperty(this, 'name', {value:name})
            return name
        }
    });
}

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/Function',_ion_es6_Function_);
    else
      _ion_es6_Function_.call(this, module, exports, require);
  }
  else {
    _ion_es6_Function_.call(this);
  }
}).call(this)