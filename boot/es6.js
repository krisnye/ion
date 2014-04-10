void (function(){var _ion_es6_ = function(module,exports,require){void (function(){var _src_es6_ = function(module,exports,require){
if (!String.prototype.endsWith) {
    Object.defineProperty(String.prototype, 'endsWith', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function (searchString, position) {
            position = position || this.length;
            position = position - searchString.length;
            var lastIndex = this.lastIndexOf(searchString);
            return lastIndex !== -1 && lastIndex === position;
        }
    });
}

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function (searchString, position) {
      position = position || 0;
      return this.indexOf(searchString, position) === position;
    }
  });
}

if ( !String.prototype.contains ) {
    String.prototype.contains = function() {
        return String.prototype.indexOf.apply( this, arguments ) !== -1;
    };
}


  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('src/es6',_src_es6_);
    else
      _src_es6_.call(this, module, exports, require);
  }
  else {
    _src_es6_.call(this);
  }
}).call(this)
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6',_ion_es6_);
    else
      _ion_es6_.call(this, module, exports, require);
  }
  else {
    _ion_es6_.call(this);
  }
}).call(this)