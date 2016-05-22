void (function(){var _ion_runtime_UndoStatement_ = function(module,exports,require){'use strict';
var ion = require('../'), _ref;
_ref = require('./');
var Factory = _ref.Factory;
var Statement = _ref.Statement;
var UndoStatement = ion.defineClass({
        name: 'UndoStatement',
        properties: {
            activate: function () {
                UndoStatement.super.prototype.activate.apply(this, arguments);
            },
            deactivate: function () {
                UndoStatement.super.prototype.deactivate.apply(this, arguments);
                this.calleeExpression = this.calleeExpression != null ? this.calleeExpression : this.context.createRuntime(this.callee);
                this.calleeExpression.value();
            }
        }
    }, Statement);
module.exports = exports = UndoStatement;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/UndoStatement',_ion_runtime_UndoStatement_);
    else
      _ion_runtime_UndoStatement_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_UndoStatement_.call(this);
  }
}).call(this)