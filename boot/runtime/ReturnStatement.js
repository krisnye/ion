(function(){var _ion_runtime_ReturnStatement_ = function(module,exports,require){'use strict';
const ion = require('ion');
const Statement = require('./Statement');
const ReturnStatement = ion.defineClass({
        id: 'ReturnStatement',
        properties: {
            activate: function () {
                ReturnStatement.super.prototype.activate.apply(this, arguments);
                this.argumentExpression = this.argumentExpression != null ? this.argumentExpression : this.context.createRuntime(this.argument);
                this.argumentExpression.watch(this.argumentWatcher = this.argumentWatcher != null ? this.argumentWatcher : function (value) {
                    return this.context.returnExpression.setValue(value);
                }.bind(this));
            },
            deactivate: function () {
                ReturnStatement.super.prototype.deactivate.apply(this, arguments);
                this.argumentExpression.unwatch(this.argumentWatcher);
            }
        }
    }, Statement);
module.exports = exports = ReturnStatement;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/ReturnStatement',_ion_runtime_ReturnStatement_);
    else
      _ion_runtime_ReturnStatement_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_ReturnStatement_.call(this);
  }
}).call(this)