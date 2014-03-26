void (function(){var _ion_runtime_Statement_ = function(module,exports,require){'use strict';
const ion = require('ion');
const Statement = ion.defineClass({
        id: 'Statement',
        properties: {
            isActive: false,
            activate: function () {
                this.isActive = true;
            },
            deactivate: function () {
                this.isActive = false;
            }
        }
    }, require('./Node'));
module.exports = exports = Statement;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/Statement',_ion_runtime_Statement_);
    else
      _ion_runtime_Statement_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_Statement_.call(this);
  }
}).call(this)