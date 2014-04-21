void (function(){var _ion_runtime_Expression_ = function(module,exports,require){'use strict';
const ion = require('../');
const Expression = ion.defineClass({
        name: 'Expression',
        properties: {
            watch: function (watcher) {
                throw new Error('not implemented');
            },
            unwatch: function (watcher) {
                throw new Error('not implemented');
            }
        }
    }, require('./Node'));
module.exports = exports = Expression;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/Expression',_ion_runtime_Expression_);
    else
      _ion_runtime_Expression_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_Expression_.call(this);
  }
}).call(this)