void (function(){var _ion_runtime_IfStatement_ = function(module,exports,require){'use strict';
var ion = require('../'), Statement = require('./Statement');
var IfStatement = ion.defineClass({
        name: 'IfStatement',
        properties: {
            activate: function () {
                IfStatement.super.prototype.activate.apply(this, arguments);
                this.testExpression = this.testExpression != null ? this.testExpression : this.context.createRuntime(this.test);
                this.testExpression.watchValue(this.testExpressionWatcher = this.testExpressionWatcher != null ? this.testExpressionWatcher : ion.bind(function (value) {
                    if (value) {
                        if (this.alternateStatement != null ? this.alternateStatement.isActive : void 0) {
                            this.alternateStatement != null ? this.alternateStatement.deactivate() : void 0;
                            delete this.alternateStatement;
                        }
                        this.consequentStatement = this.consequentStatement != null ? this.consequentStatement : this.context.createRuntime(this.consequent);
                        this.consequentStatement.activate();
                    } else {
                        if (this.consequentStatement != null ? this.consequentStatement.isActive : void 0) {
                            this.consequentStatement != null ? this.consequentStatement.deactivate() : void 0;
                            delete this.consequentStatement;
                        }
                        if (this.alternate != null) {
                            this.alternateStatement = this.alternateStatement != null ? this.alternateStatement : this.context.createRuntime(this.alternate);
                            this.alternateStatement.activate();
                        }
                    }
                }, this));
            },
            deactivate: function () {
                IfStatement.super.prototype.deactivate.apply(this, arguments);
                this.testExpression.unwatchValue(this.testExpressionWatcher);
                if (this.alternateStatement != null ? this.alternateStatement.isActive : void 0) {
                    this.alternateStatement != null ? this.alternateStatement.deactivate() : void 0;
                }
                if (this.consequentStatement != null ? this.consequentStatement.isActive : void 0) {
                    this.consequentStatement != null ? this.consequentStatement.deactivate() : void 0;
                }
            }
        }
    }, Statement);
module.exports = exports = IfStatement;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/IfStatement',_ion_runtime_IfStatement_);
    else
      _ion_runtime_IfStatement_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_IfStatement_.call(this);
  }
}).call(this)
//# sourceMappingURL=./IfStatement.map