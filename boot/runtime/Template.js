void (function(){var _ion_runtime_Template_ = function(module,exports,require){'use strict';
var ion = require('../'), BlockStatement = require('./BlockStatement'), DynamicExpression = require('./DynamicExpression'), noop = function () {
    };
var count = 0;
var Template = ion.defineClass({
        name: 'Template',
        constructor: function Template() {
            Template.super.apply(this, arguments);
            this.context.returnExpression = new DynamicExpression();
        },
        properties: {
            observe: function (watcher) {
                if (watcher == null)
                    watcher = noop;
                if (!this.isActive) {
                    this.activate();
                }
                var unobserve = this.context.returnExpression.observe(watcher);
                return ion.bind(function () {
                    unobserve();
                    if (!this.context.returnExpression.isActive) {
                        this.deactivate();
                    }
                }, this);
            },
            activate: function () {
                Template.super.prototype.activate.apply(this, arguments);
                count++;
            },
            deactivate: function () {
                Template.super.prototype.deactivate.apply(this, arguments);
                count--;
            },
            toString: function () {
                return this.id != null ? 'Template ' + this.id.name : 'Template';
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