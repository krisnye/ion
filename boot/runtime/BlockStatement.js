void (function(){var _ion_runtime_BlockStatement_ = function(module,exports,require){'use strict';
var ion = require('../'), Statement = require('./Statement');
var BlockStatement = ion.defineClass({
        name: 'BlockStatement',
        properties: {
            activate: function () {
                BlockStatement.super.prototype.activate.apply(this, arguments);
                if (!(this.statements != null)) {
                    var _ref = [];
                    {
                        var _ref2 = this.body;
                        for (var _i = 0; _i < _ref2.length; _i++) {
                            var s = _ref2[_i];
                            _ref.push(this.context.createRuntime(s));
                        }
                    }
                    this.statements = _ref;
                }
                {
                    var _ref3 = this.statements;
                    for (var _i2 = 0; _i2 < _ref3.length; _i2++) {
                        var statement = _ref3[_i2];
                        statement.activate();
                    }
                }
            },
            deactivate: function () {
                BlockStatement.super.prototype.deactivate.apply(this, arguments);
                for (var i = this.statements.length - 1; i >= 0; i--) {
                    var statement = this.statements[i];
                    statement.deactivate();
                }
            }
        }
    }, Statement);
module.exports = exports = BlockStatement;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/BlockStatement',_ion_runtime_BlockStatement_);
    else
      _ion_runtime_BlockStatement_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_BlockStatement_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./BlockStatement.map