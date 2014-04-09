(function(){var _ion_runtime_ObjectExpression_ = function(module,exports,require){'use strict';
const DynamicExpression = require('./DynamicExpression'), ion = require('../');
const ObjectExpression = ion.defineClass({
        id: 'ObjectExpression',
        properties: {
            setLeftValue: function (value) {
                this.value = value;
            },
            activate: function () {
                ObjectExpression.super.prototype.activate.apply(this, arguments);
                this.typeExpression = this.typeExpression != null ? this.typeExpression : this.context.createRuntime(this.objectType != null ? this.objectType : null);
                this.typeExpression.watch(this.typeWatcher = this.typeWatcher != null ? this.typeWatcher : function (type) {
                    let value;
                    if (type === void 0) {
                        value = void 0;
                    } else if (!ion.is(this.value, type)) {
                        this.statements != null ? this.statements.deactivate() : void 0;
                        this.statements = null;
                        if (type != null && typeof type === 'object') {
                            value = type;
                        } else {
                            value = new (type != null ? type : Object)();
                        }
                    } else {
                        value = this.value;
                    }
                    if (value != null && !(this.statements != null)) {
                        let newContext = this.context.newContext(value);
                        this.statements = newContext.createRuntime({
                            type: 'BlockStatement',
                            body: this.properties
                        });
                        this.statements.activate();
                    }
                    this.setValue(value);
                }.bind(this));
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