void (function(){var _ion_compiler_traverseAst_ = function(module,exports,require){var addStatement, basicTraverse, nodes, trackVariableDeclaration, trackVariableDeclarations;

basicTraverse = require('./traverse');

nodes = require('./nodes');

addStatement = require("./astFunctions").addStatement;

trackVariableDeclaration = function(context, node, kind, name) {
  var scope, variable;
  if (name == null) {
    name = node.name;
  }
  scope = context.scope();
  if (scope == null) {
    return;
  }
  variable = {
    kind: kind,
    id: {
      type: 'Identifier',
      name: name
    },
    name: name,
    node: node,
    scope: scope
  };
  if (typeof context.variableCallback === "function") {
    context.variableCallback(variable, context);
  }
  return scope.variables[name] = variable;
};

trackVariableDeclarations = function(context, node, kind) {
  var declarator, item, _i, _j, _len, _len1, _ref, _results, _results1;
  if (kind == null) {
    kind = 'let';
  }
  if (Array.isArray(node)) {
    _results = [];
    for (_i = 0, _len = node.length; _i < _len; _i++) {
      item = node[_i];
      _results.push(trackVariableDeclarations(context, item, kind));
    }
    return _results;
  } else {
    if (node.type === 'FunctionDeclaration') {
      kind = 'const';
      if (node.id != null) {
        return trackVariableDeclarations(context, node.id, kind);
      }
    } else if (node.type === 'VariableDeclaration') {
      kind = node.kind;
      _ref = node.declarations;
      _results1 = [];
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        declarator = _ref[_j];
        _results1.push(trackVariableDeclarations(context, declarator.id, kind));
      }
      return _results1;
    } else if (node.type === "Identifier") {
      return trackVariableDeclaration(context, node, kind);
    } else if (node.type === "ObjectPattern") {
      return basicTraverse.traverse(node, function(child, newContext) {
        var name, _ref1;
        if ((child.key != null) && (child.value != null)) {
          name = (_ref1 = child.key.value) != null ? _ref1 : child.key.name;
          trackVariableDeclaration(context, child, kind, name);
          return newContext.skip();
        }
      });
    } else if (node.type === "ArrayPattern") {
      return basicTraverse.traverse(node, function(child, newContext) {
        if (child.type === 'Identifier') {
          trackVariableDeclaration(context, child, kind);
          return newContext.skip();
        }
      });
    }
  }
};

exports.traverse = function(program, enterCallback, exitCallback, variableCallback, previousContext) {
  var ourEnter, ourExit;
  ourEnter = function(node, context) {
    var nodeInfo, _ref, _ref1, _ref2;
    if (context.variableCallback == null) {
      context.variableCallback = variableCallback;
    }
    if (context.scopeStack == null) {
      context.scopeStack = [];
    }
    if (context.scope == null) {
      context.scope = function() {
        return this.scopeStack[this.scopeStack.length - 1];
      };
    }
    if (context.ancestorNodes == null) {
      context.ancestorNodes = [];
    }
    if (context.getAncestor == null) {
      context.getAncestor = function(predicate) {
        var ancestor, _i, _ref;
        _ref = this.ancestorNodes;
        for (_i = _ref.length - 1; _i >= 0; _i += -1) {
          ancestor = _ref[_i];
          if (predicate(ancestor)) {
            return ancestor;
          }
        }
        return null;
      };
    }
    if (context.rootNode == null) {
      context.rootNode = function() {
        return this.ancestorNodes[0];
      };
    }
    if (context.parentNode == null) {
      context.parentNode = function() {
        return this.ancestorNodes[this.ancestorNodes.length - 1];
      };
    }
    if (context.parentScope == null) {
      context.parentScope = function() {
        return this.scopeStack[this.scopeStack.length - 2];
      };
    }
    if (context.parentReactive == null) {
      context.parentReactive = function() {
        return this._reactiveStack[this._reactiveStack.length - 1];
      };
    }
    if (context.isParentBlock == null) {
      context.isParentBlock = function() {
        var _ref, _ref1, _ref2;
        return (_ref = (_ref1 = nodes[(_ref2 = this.parentNode()) != null ? _ref2.type : void 0]) != null ? _ref1.isBlock : void 0) != null ? _ref : false;
      };
    }
    if (context.getVariableInfo == null) {
      context.getVariableInfo = function(id) {
        return this.scope().variables[id];
      };
    }
    if (context._variableCounts == null) {
      context._variableCounts = (_ref = previousContext != null ? previousContext._variableCounts : void 0) != null ? _ref : {};
    }
    if (context.getNewInternalIdentifier == null) {
      context.getNewInternalIdentifier = function(prefix) {
        var count, counts, name;
        if (prefix == null) {
          prefix = '_ref';
        }
        counts = this._variableCounts;
        count = counts[prefix] != null ? counts[prefix] : counts[prefix] = 1;
        counts[prefix]++;
        name = count === 1 ? prefix : prefix + count;
        return {
          type: 'Identifier',
          name: name
        };
      };
    }
    if (context.getAncestorChildOf == null) {
      context.getAncestorChildOf = function(ancestor) {
        var index, _ref1;
        index = this.ancestorNodes.indexOf(ancestor);
        if (index >= 0) {
          return (_ref1 = this.ancestorNodes[index + 1]) != null ? _ref1 : this.current();
        } else {
          return void 0;
        }
      };
    }
    if (context.getSharedVariableId == null) {
      context.getSharedVariableId = function(name) {
        var _ref1, _ref2;
        return (_ref1 = (_ref2 = this.getVariableInfo(name)) != null ? _ref2.id : void 0) != null ? _ref1 : this.addVariable({
          id: name,
          offset: Number.MIN_VALUE
        });
      };
    }
    if (context.addStatement == null) {
      context.addStatement = function(statement, offset, addToNode) {
        var _ref1;
        if (typeof statement === 'number') {
          _ref1 = [offset, statement], statement = _ref1[0], offset = _ref1[1];
        }
        if (addToNode == null) {
          addToNode = this.scope().node;
        }
        if (statement.type === 'VariableDeclaration' || statement.type === 'FunctionDeclaration') {
          trackVariableDeclarations(context, statement);
        }
        return addStatement(addToNode, statement, this.getAncestorChildOf(addToNode), offset);
      };
    }
    if (context.addVariable == null) {
      context.addVariable = function(options) {
        var variable;
        variable = this.getVariable(options);
        this.addStatement(variable, options.offset);
        return variable.declarations[0].id;
      };
    }
    if (context.getVariable == null) {
      context.getVariable = function(options) {
        var variable;
        if (options == null) {
          options = {};
        }
        if (typeof options.id === 'string') {
          options.id = {
            type: 'Identifier',
            name: options.id
          };
        }
        if (options.id == null) {
          options.id = this.getNewInternalIdentifier();
        }
        if (options.kind == null) {
          options.kind = 'let';
        }
        variable = {
          type: "VariableDeclaration",
          declarations: [
            {
              type: "VariableDeclarator",
              id: options.id,
              init: options.init
            }
          ],
          kind: options.kind
        };
        return variable;
      };
    }
    context.error = function(message, node) {
      var e, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
      if (node == null) {
        node = this.current();
      }
      e = new Error(message);
      e.line = (_ref1 = node.loc) != null ? (_ref2 = _ref1.start) != null ? _ref2.line : void 0 : void 0;
      e.column = ((_ref3 = node.loc) != null ? (_ref4 = _ref3.start) != null ? _ref4.column : void 0 : void 0) + 1;
      e.lineEnd = (_ref5 = node.loc) != null ? (_ref6 = _ref5.end) != null ? _ref6.line : void 0 : void 0;
      e.columnEnd = ((_ref7 = node.loc) != null ? (_ref8 = _ref7.end) != null ? _ref8.column : void 0 : void 0) + 1;
      return e;
    };
    if (node.type != null) {
      nodeInfo = nodes[node.type];
      if ((nodeInfo != null ? nodeInfo.reactive : void 0) != null) {
        (context._reactiveStack != null ? context._reactiveStack : context._reactiveStack = []).push(context.reactive);
        context.reactive = nodeInfo.reactive;
      }
      if (nodeInfo != null ? nodeInfo.newScope : void 0) {
        context.scopeStack.push({
          variables: Object.create((_ref1 = (_ref2 = context.scope()) != null ? _ref2.variables : void 0) != null ? _ref1 : {}),
          node: node
        });
      }
      if (Array.isArray(node.body)) {
        trackVariableDeclarations(context, node.body);
      }
      if (nodeInfo != null ? nodeInfo.isFunction : void 0) {
        trackVariableDeclarations(context, node.params, nodeInfo.paramKind);
      }
      if (typeof enterCallback === "function") {
        enterCallback(node, context);
      }
      return context.ancestorNodes.push(node);
    }
  };
  ourExit = function(node, context) {
    var nodeInfo;
    if (node.type != null) {
      nodeInfo = nodes[node.type];
      if ((nodeInfo != null ? nodeInfo.reactive : void 0) != null) {
        context.reactive = context._reactiveStack.pop();
      }
      context.ancestorNodes.pop();
      if (typeof exitCallback === "function") {
        exitCallback(node, context);
      }
      if (nodeInfo != null ? nodeInfo.newScope : void 0) {
        return context.scopeStack.pop();
      }
    }
  };
  return basicTraverse.traverse(program, ourEnter, ourExit);
};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/traverseAst',_ion_compiler_traverseAst_);
    else
      _ion_compiler_traverseAst_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_traverseAst_.call(this);
  }
}).call(this)