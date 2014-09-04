void (function(){var _ion_test_index_ = function(module,exports,require){exports['immediateTemplates'] = require('./immediateTemplates')
exports['ionCompiler'] = require('./ionCompiler')
exports['ionCompilerES5'] = require('./ionCompilerES5')
exports['reactiveTemplates'] = require('./reactiveTemplates')
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/test/index',_ion_test_index_);
    else
      _ion_test_index_.call(this, module, exports, require);
  }
  else {
    _ion_test_index_.call(this);
  }
}).call(this)