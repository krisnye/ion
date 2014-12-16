void (function(){var _ion_runtime_ObjectExpression_ = function(module,exports,require){'use strict';
var ion = require('../'), DynamicExpression = require('./DynamicExpression');
var ObjectExpression = ion.defineClass({
        name: 'ObjectExpression',
        properties: {
            setLeftValue: function (value) {
                this.value = value;
            },
            activate: function () {
                ObjectExpression.super.prototype.activate.apply(this, arguments);
                this.typeExpression = this.typeExpression != null ? this.typeExpression : this.context.createRuntime(this.objectType != null ? this.objectType : null);
                this.typeExpression.watch(this.typeWatcher = this.typeWatcher != null ? this.typeWatcher : ion.bind(function (type) {
                    var value;
                    if (!ion.is(this.value, type)) {
                        this.statements != null ? this.statements.deactivate() : void 0;
                        this.statements = null;
                        value = type != null ? type : {};
                    } else {
                        value = this.value;
                    }
                    if (value != null && !(this.statements != null)) {
                        var newContext = this.context.newContext(value);
                        this.statements = newContext.createRuntime({
                            type: 'BlockStatement',
                            body: this.properties
                        });
                        this.statements.activate();
                    }
                    this.setValue(value);
                }, this));
            },
            deactivate: function () {
                ObjectExpression.super.prototype.deactivate.apply(this, arguments);
                this.typeExpression.unwatch(this.typeWatcher);
            }
        }
    }, DynamicExpression);
module.exports = exports = ObjectExpression;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/ObjectExpression',_ion_runtime_ObjectExpression_);
    else
      _ion_runtime_ObjectExpression_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_ObjectExpression_.call(this);
  }
}).call(this)
//# sourceMappingURL=./ObjectExpression.map