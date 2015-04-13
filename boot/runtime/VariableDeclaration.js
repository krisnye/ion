void (function(){var _ion_runtime_VariableDeclaration_ = function(module,exports,require){'use strict';
var ion = require('../');
var Statement = require('./Statement');
var noop = function () {
};
var VariableDeclaration = ion.defineClass({
        name: 'VariableDeclaration',
        constructor: function VariableDeclaration() {
            VariableDeclaration.super.apply(this, arguments);
            var _ref4 = [];
            {
                var _ref = this.declarations;
                for (var _i = 0; _i < _ref.length; _i++) {
                    var _ref5 = _ref[_i];
                    var name = _ref5.id.name;
                    var init = _ref5.init;
                    _ref4.push(this.context.setVariableFromAst(name, init));
                }
            }
            this.expressions = _ref4;
        },
        properties: {
            activate: function () {
                var _ref6 = [];
                {
                    var _ref2 = this.expressions;
                    for (var _i2 = 0; _i2 < _ref2.length; _i2++) {
                        var expression = _ref2[_i2];
                        _ref6.push(expression.observe(noop));
                    }
                }
                this.unobserves = _ref6;
            },
            deactivate: function () {
                {
                    var _ref3 = this.unobserves;
                    for (var _i3 = 0; _i3 < _ref3.length; _i3++) {
                        var unobserve = _ref3[_i3];
                        unobserve();
                    }
                }
                this.unobserves = null;
            }
        }
    }, Statement);
module.exports = exports = VariableDeclaration;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/VariableDeclaration',_ion_runtime_VariableDeclaration_);
    else
      _ion_runtime_VariableDeclaration_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_VariableDeclaration_.call(this);
  }
}).call(this)
//# sourceMappingURL=./VariableDeclaration.map