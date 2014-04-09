void (function(){var _runtime_Node_ = function(module,exports,require){'use strict';
const ion = require('ion');
const Node = ion.defineClass({ id: 'Node' });
module.exports = exports = Node;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('runtime/Node',_runtime_Node_);
    else
      _runtime_Node_.call(this, module, exports, require);
  }
  else {
    _runtime_Node_.call(this);
  }
}).call(this)