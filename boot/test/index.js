void (function(){var _ion_test_index_ = function(module,exports,require){Object.defineProperty(exports, 'duplicateDeclares', {get:function(){ return require('./duplicateDeclares') }, enumerable: true}) 
Object.defineProperty(exports, 'es6Scoping', {get:function(){ return require('./es6Scoping') }, enumerable: true}) 
Object.defineProperty(exports, 'immediateTemplates', {get:function(){ return require('./immediateTemplates') }, enumerable: true}) 
Object.defineProperty(exports, 'ionCompiler', {get:function(){ return require('./ionCompiler') }, enumerable: true}) 
Object.defineProperty(exports, 'ionCompilerES5', {get:function(){ return require('./ionCompilerES5') }, enumerable: true}) 
Object.defineProperty(exports, 'reactiveTemplates', {get:function(){ return require('./reactiveTemplates') }, enumerable: true}) 
Object.defineProperty(exports, 'sourceSize', {get:function(){ return require('./sourceSize') }, enumerable: true}) 
Object.defineProperty(exports, 'syntax', {get:function(){ return require('./syntax') }, enumerable: true}) 
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