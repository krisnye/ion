void (function(){var _ion_compiler_browser_ = function(module,exports,require){'use strict';
console.log('look to listen for on load');
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/browser',_ion_compiler_browser_);
    else
      _ion_compiler_browser_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_browser_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./browser.map