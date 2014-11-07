void (function(){var _ion_runtime_VariableDeclaration_ = function(module,exports,require){'use strict';
var ion = require('../');
var Statement = require('./Statement');
var VariableDeclaration = ion.defineClass({
        name: 'VariableDeclaration',
        constructor: function VariableDeclaration() {
            VariableDeclaration.super.apply(this, arguments);
            {
                var _ref = this.declarations;
                for (var _i = 0; _i < _ref.length; _i++) {
                    var _ref2 = _ref[_i];
                    var name = _ref2.id.name;
                    var init = _ref2.init;
                    this.context.setVariableFromAst(name, init);
                }
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
//@ sourceMappingURL=./VariableDeclaration.map