void (function(){var _ion_runtime_Literal_ = function(module,exports,require){'use strict';
var ion = require('../');
var Literal = ion.defineClass({
        name: 'Literal',
        properties: {
            observe: function (observer) {
                observer(this.value);
                return function () {
                };
            }
        }
    }, require('./Expression'));
module.exports = exports = Literal;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/Literal',_ion_runtime_Literal_);
    else
      _ion_runtime_Literal_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_Literal_.call(this);
  }
}).call(this)
//# sourceMappingURL=./Literal.map