void (function(){var _ion_es6_index_ = function(module,exports,require){'use strict';
require('./String');
require('./Map');
require('./Object.observe');
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/index',_ion_es6_index_);
    else
      _ion_es6_index_.call(this, module, exports, require);
  }
  else {
    _ion_es6_index_.call(this);
  }
}).call(this)