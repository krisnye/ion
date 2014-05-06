void (function(){var _ion_runtime_Node_ = function(module,exports,require){'use strict';
var ion = require('../');
var Node = ion.defineClass({ name: 'Node' });
module.exports = exports = Node;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/Node',_ion_runtime_Node_);
    else
      _ion_runtime_Node_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_Node_.call(this);
  }
}).call(this)