void (function(){var _ion_es6_index_ = function(module,exports,require){'use strict';
require('./String');
require('./Map');
require('./Set');
require('./Object');
require('./Object.observe');
require('./Function');
require('./Array');
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
//# sourceMappingURL=./index.map