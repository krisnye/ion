void (function(){var _runtime_Statement_ = function(module,exports,require){'use strict';
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
      require.register('runtime/Statement',_runtime_Statement_);
    else
      _runtime_Statement_.call(this, module, exports, require);
  }
  else {
    _runtime_Statement_.call(this);
  }
}).call(this)