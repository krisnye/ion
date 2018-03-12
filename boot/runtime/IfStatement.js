void (function(){var _ion_runtime_IfStatement_ = function(module,exports,require){'use strict';
var ion = require('../'), _ref;
_ref = require('./');
var Statement = _ref.Statement;
var Factory = _ref.Factory;
var counter = 0;
var getCounter = function () {
    return counter++;
};
var IfStatement = ion.defineClass({
        name: 'IfStatement',
        constructor: function IfStatement() {
            IfStatement.super.apply(this, arguments);
            this.id = getCounter();
        },
        properties: {
            activate: function () {
                IfStatement.super.prototype.activate.apply(this, arguments);
                this.testExpression = this.testExpression != null ? this.testExpression : this.context.createRuntime(this.test);
                this.unobserve = this.testExpression.observe(this.testExpressionObserver = this.testExpressionObserver != null ? this.testExpressionObserver : ion.bind(function (value) {
                    if (value) {
                        if (!(this.consequentStatement != null ? this.consequentStatement.isActive : void 0)) {
                            if (this.alternateStatement != null ? this.alternateStatement.isActive : void 0) {
                                this.alternateStatement.deactivate();
                                this.alternateStatement = null;
                            }
                            var context = this.context.newContext(null, this.order);
                            this.consequentStatement = context.createRuntime(this.consequent);
                            this.consequentStatement.activate();
                        }
                    } else {
                        if (!(this.alternateStatement != null ? this.alternateStatement.isActive : void 0)) {
                            if (this.consequentStatement != null ? this.consequentStatement.isActive : void 0) {
                                this.consequentStatement.deactivate();
                                this.consequentStatement = null;
                            }
                            if (this.alternate != null) {
                                var context = this.context.newContext(null, this.order);
                                this.alternateStatement = context.createRuntime(this.alternate);
                                this.alternateStatement.activate();
                            }
                        }
                    }
                }, this));
            },
            deactivate: function () {
                IfStatement.super.prototype.deactivate.apply(this, arguments);
                this.unobserve != null ? this.unobserve() : void 0;
                if (this.alternateStatement != null ? this.alternateStatement.isActive : void 0) {
                    this.alternateStatement != null ? this.alternateStatement.deactivate() : void 0;
                    this.alternateStatement = null;
                }
                if (this.consequentStatement != null ? this.consequentStatement.isActive : void 0) {
                    this.consequentStatement != null ? this.consequentStatement.deactivate() : void 0;
                    this.consequentStatement = null;
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