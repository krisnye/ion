(function(){var _ion_runtime_VariableDeclaration_ = function(module,exports,require){'use strict';
const ion = require('ion');
const Statement = require('./Statement');
const VariableDeclaration = ion.defineClass({
        id: 'VariableDeclaration',
        constructor: function VariableDeclaration() {
            VariableDeclaration.super.apply(this, arguments);
            {
                let _ref = this.declarations;
                for (let _i = 0; _i < _ref.length; _i++) {
                    let _ref2 = _ref[_i];
                    let name = _ref2.id.name;
                    let init = _ref2.init;
                    this.context.setVariable(name, init);
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