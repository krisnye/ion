(function(){var _ion_compiler_traverseAst_ = function(module,exports,require){var addStatement, basicTraverse, nodes, trackVariables;

basicTraverse = require('./traverse');

nodes = require('./nodes');

addStatement = require("./astFunctions").addStatement;

trackVariables = function(context, nodes) {
  var declarator, idpattern, node, scope, trackVariable, _i, _len, _results;
  scope = context.scope();
  trackVariable = function(kind, name, init, sourceNode, shadow) {
    return scope.variables[name] = {
      kind: kind,
      id: {
        type: 'Identifier',
        name: name
      },
      init: init,
      sourceNode: sourceNode
    };
  };
  _results = [];
  for (_i = 0, _len = nodes.length; _i < _len; _i++) {
    node = nodes[_i];
    if (node.type === "Identifier") {
      trackVariable("let", node, null, node);
    }
    if (node.type === "VariableDeclaration") {
      _results.push((function() {
        var _j, _len1, _ref, _results1;
        _ref = node.declarations;
        _results1 = [];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          declarator = _ref[_j];
          idpattern = declarator.id;
          if (idpattern.type === "Identifier") {
            _results1.push(trackVariable(node.kind, idpattern.name, declarator.init, node));
          } else if (idpattern.type === "ObjectPattern") {
            _results1.push(basicTraverse.traverse(idpattern, function(child, newContext) {
              var name, _ref1;
              if ((child.key != null) && (child.value != null)) {
                name = (_ref1 = child.key.value) != null ? _ref1 : child.key.name;
                trackVariable(node.kind, name, declarator.init, node);
                return newContext.skip();
              }
            }));
          } else if (idpattern.type === "ArrayPattern") {
            _results1.push(basicTraverse.traverse(idpattern, function(child, newContext) {
              if (child.type === 'Identifier') {
                trackVariable(node.kind, child.name, declarator.init, node);
                return newContext.skip();
              }
            }));
          } else {
            _results1.push(void 0);
          }
        }
        return _results1;
      })());
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};

exports.traverse = function(program, enterCallback, exitCallback) {
  var ourEnter, ourExit;
  ourEnter = function(node, context) {
    var nodeInfo, _ref, _ref1;
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
    if (context.parentNode == null) {
      context.parentNode = function() {
        return this.ancestorNodes[this.ancestorNodes.length - 1];
      };
    }
    if (context.getAncestorBlock == null) {
      context.getAncestorBlock = function() {
        var ancestor, _i, _ref, _ref1;
        _ref = this.ancestorNodes;
        for (_i = _ref.length - 1; _i >= 0; _i += -1) {
          ancestor = _ref[_i];
          if ((_ref1 = nodes[ancestor.type]) != null ? _ref1.isBlock : void 0) {
            return ancestor;
          }
        }
        return void 0;
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
    if (context.getNewInternalIdentifier == null) {
      context.getNewInternalIdentifier = function(prefix) {
        var check, i;
        if (prefix == null) {
          prefix = '_ref';
        }
        i = 0;
        while (++i) {
          check = prefix + (i === 1 ? "" : i);
          if (this.getVariableInfo(check) === void 0) {
            return {
              type: 'Identifier',
              name: check
            };
          }
        }
      };
    }
    if (context.getAncestorChildOf == null) {
      context.getAncestorChildOf = function(ancestor) {
        var index, _ref;
        index = this.ancestorNodes.indexOf(ancestor);
        if (index >= 0) {
          return (_ref = this.ancestorNodes[index + 1]) != null ? _ref : this.current();
        } else {
          return void 0;
        }
      };
    }
    if (context.getSharedVariableId == null) {
      context.getSharedVariableId = function(name) {
        var _ref, _ref1;
        return (_ref = (_ref1 = this.getVariableInfo(name)) != null ? _ref1.id : void 0) != null ? _ref : this.addVariable({
          id: name,
          offset: Number.MIN_VALUE
        });
      };
    }
    if (context.addStatement == null) {
      context.addStatement = function(statement, offset, addToNode) {
        if (addToNode == null) {
          addToNode = this.scope().sourceNode;
        }
        if (statement.type === 'VariableDeclaration') {
          trackVariables(context, [statement]);
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
    if (node.type != null) {
      nodeInfo = nodes[node.type];
      if (nodeInfo != null ? nodeInfo.newScope : void 0) {
        context.scopeStack.push({
          variables: Object.create((_ref = (_ref1 = context.scope()) != null ? _ref1.variables : void 0) != null ? _ref : {}),
          sourceNode: node
        });
      }
      if ((nodeInfo != null ? nodeInfo.getVariables : void 0) != null) {
        trackVariables(context, nodeInfo.getVariables(node));
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