void (function(){var _ion_browser_index_ = function(module,exports,require){Object.defineProperty(exports, 'elements', {get:function(){ return require('./elements') }, enumerable: true}) 
Object.defineProperty(exports, 'require', {get:function(){ return require('./require') }, enumerable: true}) 
Object.defineProperty(exports, 'tester', {get:function(){ return require('./tester') }, enumerable: true}) 
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