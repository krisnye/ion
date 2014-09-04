void (function(){var _ion_runtime_index_ = function(module,exports,require){exports['ArrayExpression'] = require('./ArrayExpression')
exports['BlockStatement'] = require('./BlockStatement')
exports['CallExpression'] = require('./CallExpression')
exports['Context'] = require('./Context')
exports['DynamicExpression'] = require('./DynamicExpression')
exports['Expression'] = require('./Expression')
exports['ExpressionStatement'] = require('./ExpressionStatement')
exports['Factory'] = require('./Factory')
exports['ForInOfStatement'] = require('./ForInOfStatement')
exports['IfStatement'] = require('./IfStatement')
exports['Literal'] = require('./Literal')
exports['MemberExpression'] = require('./MemberExpression')
exports['Node'] = require('./Node')
exports['ObjectExpression'] = require('./ObjectExpression')
exports['OperationExpression'] = require('./OperationExpression')
exports['Property'] = require('./Property')
exports['ReturnStatement'] = require('./ReturnStatement')
exports['Statement'] = require('./Statement')
exports['Template'] = require('./Template')
exports['VariableDeclaration'] = require('./VariableDeclaration')
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/index',_ion_runtime_index_);
    else
      _ion_runtime_index_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_index_.call(this);
  }
}).call(this)