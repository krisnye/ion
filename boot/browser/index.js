void (function(){var _ion_browser_index_ = function(module,exports,require){exports['elements'] = require('./elements')
exports['require'] = require('./require')
exports['tester'] = require('./tester')
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/browser/index',_ion_browser_index_);
    else
      _ion_browser_index_.call(this, module, exports, require);
  }
  else {
    _ion_browser_index_.call(this);
  }
}).call(this)