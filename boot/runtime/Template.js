void (function(){var _ion_runtime_Template_ = function(module,exports,require){'use strict';
var ion = require('../'), BlockStatement = require('./BlockStatement'), DynamicExpression = require('./DynamicExpression'), noop = function () {
    };
var Template = ion.defineClass({
        name: 'Template',
        constructor: function Template() {
            Template.super.apply(this, arguments);
            this.context.returnExpression = new DynamicExpression();
        },
        properties: {
            watchValue: function (watcher) {
                if (watcher == null)
                    watcher = noop;
                if (!this.isActive) {
                    this.activate();
                }
                this.context.returnExpression.watchValue(watcher);
            },
            unwatchValue: function (watcher) {
                this.context.returnExpression.unwatchValue(watcher);
                if (!this.context.returnExpression.isActive) {
                    this.deactivate();
                }
            }
        }
    }, BlockStatement);
module.exports = exports = Template;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/Template',_ion_runtime_Template_);
    else
      _ion_runtime_Template_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_Template_.call(this);
  }
}).call(this)
//# sourceMappingURL=./Template.map