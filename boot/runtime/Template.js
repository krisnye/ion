void (function(){var _ion_runtime_Template_ = function(module,exports,require){'use strict';
var ion = require('../'), BlockStatement = require('./BlockStatement'), DynamicExpression = require('./DynamicExpression');
var Template = ion.defineClass({
        name: 'Template',
        constructor: function Template() {
            Template.super.apply(this, arguments);
            this.context.returnExpression = new DynamicExpression();
        },
        properties: {
            watch: function (watcher) {
                if (!this.isActive) {
                    throw new Error('You must activate a Template before you watch it.');
                }
                this.context.returnExpression.watch(watcher);
            },
            unwatch: function (watcher) {
                this.context.returnExpression.unwatch(watcher);
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