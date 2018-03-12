void (function(){var _ion_compiler_traverseAst_ = function(module,exports,require){var addStatement, basicTraverse, nodes, trackVariableDeclaration, trackVariableDeclarations;

basicTraverse = require('./traverse');

nodes = require('./nodes');

({addStatement} = require("./astFunctions"));

trackVariableDeclaration = function(context, node, kind, name = node.name) {
  var scope, variable;
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

trackVariableDeclarations = function(context, node, kind = 'let') {
  var declarator, i, item, j, len, len1, ref, results, results1;
  if (Array.isArray(node)) {
    results = [];
    for (i = 0, len = node.length; i < len; i++) {
      item = node[i];
      results.push(trackVariableDeclarations(context, item, kind));
    }
    return results;
  } else {
    if (node.type === 'FunctionDeclaration') {
      kind = 'const';
      if (node.id != null) {
        return trackVariableDeclarations(context, node.id, kind);
      }
    } else if (node.type === 'VariableDeclaration') {
      kind = node.kind;
      ref = node.declarations;
      results1 = [];
      for (j = 0, len1 = ref.length; j < len1; j++) {
        declarator = ref[j];
        results1.push(trackVariableDeclarations(context, declarator.id, kind));
      }
      return results1;
    } else if (node.type === "Identifier") {
      return trackVariableDeclaration(context, node, kind);
    } else if (node.type === "ObjectPattern") {
      return basicTraverse.traverse(node, function(child, newContext) {
        var name, ref1;
        if ((child.key != null) && (child.value != null)) {
          name = (ref1 = child.key.value) != null ? ref1 : child.key.name;
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
    var nodeInfo, ref, ref1, ref2;
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
        var ancestor, i, ref;
        ref = this.ancestorNodes;
        for (i = ref.length - 1; i >= 0; i += -1) {
          ancestor = ref[i];
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
        var ref, ref1, ref2;
        return (ref = (ref1 = nodes[(ref2 = this.parentNode()) != null ? ref2.type : void 0]) != null ? ref1.isBlock : void 0) != null ? ref : false;
      };
    }
    if (context.getVariableInfo == null) {
      context.getVariableInfo = function(id) {
        return this.scope().variables[id];
      };
    }
    if (context._variableCounts == null) {
      context._variableCounts = (ref = previousContext != null ? previousContext._variableCounts : void 0) != null ? ref : {};
    }
    if (context.getNewInternalIdentifier == null) {
      context.getNewInternalIdentifier = function(prefix = '_ref') {
        var count, counts, name;
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
        var index, ref1;
        index = this.ancestorNodes.indexOf(ancestor);
        if (index >= 0) {
          return (ref1 = this.ancestorNodes[index + 1]) != null ? ref1 : this.current();
        } else {
          return void 0;
        }
      };
    }
    if (context.getSharedVariableId == null) {
      context.getSharedVariableId = function(name) {
        var ref1, ref2;
        return (ref1 = (ref2 = this.getVariableInfo(name)) != null ? ref2.id : void 0) != null ? ref1 : this.addVariable({
          id: name,
          offset: Number.MIN_VALUE
        });
      };
    }
    if (context.addStatement == null) {
      context.addStatement = function(statement, offset, addToNode) {
        if (typeof statement === 'number') {
          [statement, offset] = [offset, statement];
        }
        if (addToNode == null) {
          addToNode = this.scope().node;
        }
        trackVariableDeclarations(context, statement);
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
          options.id = this.getNewInternalIdentifier(options.prefix);
        }
        if (options.kind == null) {
          options.kind = 'let';
        }
        // handle patterns.
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
      var e, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8;
      if (node == null) {
        node = this.current();
      }
      // make sure node has line/column numbers or else search up stack
      e = new Error(message);
      e.line = (ref1 = node.loc) != null ? (ref2 = ref1.start) != null ? ref2.line : void 0 : void 0;
      e.column = ((ref3 = node.loc) != null ? (ref4 = ref3.start) != null ? ref4.column : void 0 : void 0) + 1;
      e.lineEnd = (ref5 = node.loc) != null ? (ref6 = ref5.end) != null ? ref6.line : void 0 : void 0;
      e.columnEnd = ((ref7 = node.loc) != null ? (ref8 = ref7.end) != null ? ref8.column : void 0 : void 0) + 1;
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
          variables: Object.create((ref1 = (ref2 = context.scope()) != null ? ref2.variables : void 0) != null ? ref1 : {}),
          node: node
        });
      }
      if (Array.isArray(node.body)) {
        trackVariableDeclarations(context, node.body);
      }
      if (nodeInfo != null ? nodeInfo.isFunction : void 0) {
        trackVariableDeclarations(context, node.params, nodeInfo.paramKind);
      } else if (node.type === 'ForInStatement' || node.type === 'ForOfStatement') {
        trackVariableDeclarations(context, node.left);
      } else if (node.type === 'ObjectExpression') {
        trackVariableDeclarations(context, node.properties);
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

// exports.test = ->
//     index = require './index'
//     ast = index.parse """
//         var double = ->
//             var foo = -> 2
//             var a = 1
//             var b = 2
//             var {e,f} = bar, [g,[h]] = baz
//             if a is b
//                 var c = 3
//                 if c
//                     log(c)
//             else
//                 var c = 5
//                 var d = 4
//                 log(d)
//         """
//     expected = ["enter",1,["double"],"Program","enter",2,["double"],"FunctionExpression","enter",3,["foo","a","b","e","f","g","h","double"],"BlockStatement","enter",4,["foo","a","b","e","f","g","h","double"],"FunctionExpression","enter",5,["foo","a","b","e","f","g","h","double"],"BlockStatement","exit",5,["foo","a","b","e","f","g","h","double"],"BlockStatement","exit",4,["foo","a","b","e","f","g","h","double"],"FunctionExpression","enter",4,["c","foo","a","b","e","f","g","h","double"],"BlockStatement","exit",4,["c","foo","a","b","e","f","g","h","double"],"BlockStatement","enter",4,["c","d","foo","a","b","e","f","g","h","double"],"BlockStatement","exit",4,["c","d","foo","a","b","e","f","g","h","double"],"BlockStatement","exit",3,["foo","a","b","e","f","g","h","double"],"BlockStatement","exit",2,["double"],"FunctionExpression","exit",1,["double"],"Program"]
//     actual = []
//     enter = (node, context) ->
//         keys = (key for key of context.scope().variables)
//         if nodes[node.type]?.newScope
//             actual.push "enter", context.scopeStack.length, keys, node.type
//     exit = (node, context) ->
//         keys = (key for key of context.scope().variables)
//         if nodes[node.type]?.newScope
//             actual.push "exit", context.scopeStack.length, keys, node.type
//     exports.traverse ast, enter, exit
//     if JSON.stringify(actual) isnt JSON.stringify(expected)
//         throw new Error "#{actual} isnt #{expected}"
//     return

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