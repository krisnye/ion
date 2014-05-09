void (function(){var _ion_runtime_ExpressionStatement_ = function(module,exports,require){'use strict';
var ion = require('../'), Statement = require('./Statement');
var ExpressionStatement = ion.defineClass({
        name: 'ExpressionStatement',
        properties: {
            activate: function () {
                ExpressionStatement.super.prototype.activate.apply(this, arguments);
                this.runtimeExpression = this.runtimeExpression != null ? this.runtimeExpression : this.context.createRuntime(this.expression);
                this.runtimeExpression.watch(this.runtimeExpressionWatcher = this.runtimeExpressionWatcher != null ? this.runtimeExpressionWatcher : ion.bind(function (value) {
                    if (this.expressionValue !== value) {
                        this.expressionValue = value;
                        this._remove != null ? this._remove() : void 0;
                        this._remove = null;
                        if (this.context.output != null && value !== void 0) {
                            this._remove = ion.add(this.context.output, value);
                        }
                    }
                }, this));
            },
            deactivate: function () {
                ExpressionStatement.super.prototype.deactivate.apply(this, arguments);
                this.runtimeExpression.unwatch(this.runtimeExpressionWatcher);
            }
        }
    }, Statement);
module.exports = exports = ExpressionStatement;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/ExpressionStatement',_ion_runtime_ExpressionStatement_);
    else
      _ion_runtime_ExpressionStatement_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_ExpressionStatement_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./ExpressionStatement.map