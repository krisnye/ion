void (function(){var _runtime_Expression_ = function(module,exports,require){'use strict';
const ion = require('ion');
const Expression = ion.defineClass({
        id: 'Expression',
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
      require.register('runtime/Expression',_runtime_Expression_);
    else
      _runtime_Expression_.call(this, module, exports, require);
  }
  else {
    _runtime_Expression_.call(this);
  }
}).call(this)