(function(){var _ion_compiler_nodes_ = function(module,exports,require){var blockStatement, getVariablesFromStatements;

getVariablesFromStatements = function(statements) {
  var statement, variables;
  if (statements == null) {
    return [];
  }
  variables = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = statements.length; _i < _len; _i++) {
      statement = statements[_i];
      if (statement.type === 'VariableDeclaration') {
        _results.push(statement);
      }
    }
    return _results;
  })();
  return variables;
};

module.exports = {
  BlockStatement: blockStatement = {
    isBlock: true,
    newScope: true,
    getVariables: function(node) {
      return getVariablesFromStatements(node.body);
    }
  },
  Program: blockStatement,
  ForInStatement: {
    newScope: true,
    getVariables: function(node) {
      return [node.left].concat(getVariablesFromStatements(node.body));
    }
  },
  FunctionExpression: {
    newScope: true,
    getVariables: function(node) {
      return node.params;
    }
  }
};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/nodes',_ion_compiler_nodes_);
    else
      _ion_compiler_nodes_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_nodes_.call(this);
  }
}).call(this)