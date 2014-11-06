void (function(){var _ion_test_index_ = function(module,exports,require){Object.defineProperty(exports, 'immediateTemplates', {get:function(){ return require('./immediateTemplates') }}) 
Object.defineProperty(exports, 'ionCompiler', {get:function(){ return require('./ionCompiler') }}) 
Object.defineProperty(exports, 'ionCompilerES5', {get:function(){ return require('./ionCompilerES5') }}) 
Object.defineProperty(exports, 'reactiveTemplates', {get:function(){ return require('./reactiveTemplates') }}) 
Object.defineProperty(exports, 'sourceSize', {get:function(){ return require('./sourceSize') }}) 
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