void (function(){var _ion_runtime_Expression_ = function(module,exports,require){'use strict';
var ion = require('../');
var Expression = ion.defineClass({
        name: 'Expression',
        properties: {
            watchValue: function (watcher) {
                return this.watch(watcher);
            },
            unwatchValue: function (watcher) {
                return this.unwatch(watcher);
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
//# sourceMappingURL=./Expression.map