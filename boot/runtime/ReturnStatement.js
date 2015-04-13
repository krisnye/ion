void (function(){var _ion_runtime_ReturnStatement_ = function(module,exports,require){'use strict';
var ion = require('../'), Statement = require('./Statement');
var ReturnStatement = ion.defineClass({
        name: 'ReturnStatement',
        properties: {
            activate: function () {
                ReturnStatement.super.prototype.activate.apply(this, arguments);
                this.argumentExpression = this.argumentExpression != null ? this.argumentExpression : this.context.createRuntime(this.argument);
                this.unobserve = this.argumentExpression.observe(this.argumentWatcher = this.argumentWatcher != null ? this.argumentWatcher : ion.bind(function (value) {
                    return this.context.returnExpression.setValue(value);
                }, this));
            },
            deactivate: function () {
                ReturnStatement.super.prototype.deactivate.apply(this, arguments);
                this.argumentWatcher != null ? this.argumentWatcher(void 0) : void 0;
                this.unobserve();
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
//# sourceMappingURL=./ReturnStatement.map