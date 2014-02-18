(function(){var _ion_compiler_postprocessor_ = function(module,exports,require){var addStatement, addUseStrict, basicTraverse, callFunctionBindForFatArrows, convertForInToForLength, convertObjectExpressionToArrayExpression, createForInLoopValueVariable, defaultAssignmentsToDefaultOperators, defaultOperatorsToConditionals, destructuringAssignments, existentialExpression, extractForLoopRightVariable, forEachDestructuringAssignment, nodejsModules, nodes, nullExpression, propertyStatements, separateAllVariableDeclarations, traverse, typedObjectExpressions, undefinedExpression, _ref;

traverse = require('./traverseAst').traverse;

basicTraverse = require('./traverse').traverse;

_ref = require('./astFunctions'), addStatement = _ref.addStatement, forEachDestructuringAssignment = _ref.forEachDestructuringAssignment;

nodes = require('./nodes');

undefinedExpression = Object.freeze({
  type: 'UnaryExpression',
  argument: {
    type: 'Literal',
    value: 0
  },
  operator: 'void',
  prefix: true
});

nullExpression = Object.freeze({
  type: 'Literal',
  value: null
});

extractForLoopRightVariable = function(node, context) {
  var ref, right;
  if (node.type === 'ForOfStatement' || node.type === 'ForInStatement' && node.left.declarations.length > 1) {
    if (node.left.declarations.length > 2) {
      throw new Error("too many declarations");
    }
    right = node.right;
    if (right.type !== "Identifier") {
      ref = context.getNewInternalIdentifier();
      node.right = ref;
      return context.replace({
        type: "BlockStatement",
        body: [
          {
            type: "VariableDeclaration",
            declarations: [
              {
                type: "VariableDeclarator",
                id: ref,
                init: right
              }
            ],
            kind: node.left.kind
          }, node
        ]
      });
    }
  }
};

createForInLoopValueVariable = function(node, context) {
  var valueDeclarator;
  if (node.type === 'ForInStatement' && node.left.declarations.length > 1) {
    valueDeclarator = node.left.declarations[1];
    return context.addVariable({
      id: valueDeclarator.id,
      init: {
        type: 'MemberExpression',
        computed: true,
        object: node.right,
        property: node.left.declarations[0].id
      }
    });
  }
};

convertForInToForLength = function(node, context) {
  var loopIndex, userIndex, _ref1;
  if (node.type === 'ForOfStatement') {
    userIndex = (_ref1 = node.left.declarations[1]) != null ? _ref1.id : void 0;
    loopIndex = context.getNewInternalIdentifier("_i");
    addStatement(node, {
      type: "VariableDeclaration",
      declarations: [
        {
          type: "VariableDeclarator",
          id: node.left.declarations[0].id,
          init: {
            type: "MemberExpression",
            object: node.right,
            property: loopIndex,
            computed: true
          }
        }
      ],
      kind: node.left.kind
    });
    if (userIndex != null) {
      addStatement(node, {
        type: "VariableDeclaration",
        declarations: [
          {
            type: "VariableDeclarator",
            id: userIndex,
            init: loopIndex
          }
        ],
        kind: node.left.kind
      });
    }
    return context.replace({
      type: 'ForStatement',
      init: {
        type: "VariableDeclaration",
        declarations: [
          {
            type: "VariableDeclarator",
            id: loopIndex,
            init: {
              type: "Literal",
              value: 0
            }
          }
        ],
        kind: 'let'
      },
      test: {
        type: "BinaryExpression",
        operator: "<",
        left: loopIndex,
        right: {
          type: "MemberExpression",
          object: node.right,
          property: {
            type: "Identifier",
            name: "length"
          },
          computed: false
        }
      },
      update: {
        type: "UpdateExpression",
        operator: "++",
        argument: loopIndex,
        prefix: false
      },
      body: node.body
    });
  }
};

callFunctionBindForFatArrows = function(node, context) {
  if (node.type === "FunctionExpression" && node.bound) {
    delete node.bound;
    return context.replace({
      type: "CallExpression",
      callee: {
        type: "MemberExpression",
        object: node,
        property: {
          type: "Identifier",
          name: "bind"
        }
      },
      "arguments": [
        {
          type: "ThisExpression"
        }
      ]
    });
  }
};

convertObjectExpressionToArrayExpression = function(node, context) {
  var _ref1;
  if (node.type === "ObjectExpression" && ((_ref1 = node.objectType) != null ? _ref1.type : void 0) === "ArrayExpression") {
    node.type = "ArrayExpression";
    node.elements = node.properties.map(function(x) {
      return x.expression;
    });
    return delete node.properties;
  }
};

nodejsModules = function(node, context) {
  var declarator, _i, _ref1, _results;
  if (node.type === 'ImportExpression') {
    node.type = 'CallExpression';
    node.callee = {
      type: 'Identifier',
      name: 'require'
    };
    node["arguments"] = [node.name];
    return delete node.name;
  } else if (node.type === 'ExportStatement') {
    if (node.value.type === 'VariableDeclaration') {
      context.exports = true;
      context.replace(node.value);
      _ref1 = node.value.declarations;
      _results = [];
      for (_i = _ref1.length - 1; _i >= 0; _i += -1) {
        declarator = _ref1[_i];
        if (declarator.init == null) {
          throw new Error("Export variables must have an init value");
        }
        _results.push(declarator.init = {
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'exports'
            },
            property: declarator.id
          },
          right: declarator.init
        });
      }
      return _results;
    } else {
      if (context.exports) {
        throw new Error("default export must be first");
      }
      return context.replace({
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'module'
            },
            property: {
              type: 'Identifier',
              name: 'exports'
            }
          },
          right: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'Identifier',
              name: 'exports'
            },
            right: node.value
          }
        }
      });
    }
  }
};

separateAllVariableDeclarations = function(node, context) {
  var declaration, _results;
  if (node.type === 'VariableDeclaration' && context.isParentBlock()) {
    _results = [];
    while (node.declarations.length > 1) {
      declaration = node.declarations.pop();
      _results.push(context.addStatement({
        type: node.type,
        declarations: [declaration],
        kind: node.kind
      }));
    }
    return _results;
  }
};

destructuringAssignments = function(node, context) {
  var count, declarator, expression, isPattern, pattern, tempId, _i, _len, _ref1;
  isPattern = function(node) {
    return (node.properties != null) || (node.elements != null);
  };
  if (node.type === 'VariableDeclaration' && (context.isParentBlock() || node.type === 'ForOfStatement')) {
    _ref1 = node.declarations;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      declarator = _ref1[_i];
      if (!(isPattern(declarator.id))) {
        continue;
      }
      pattern = declarator.id;
      tempId = context.getNewInternalIdentifier();
      declarator.id = tempId;
      count = 0;
      forEachDestructuringAssignment(pattern, tempId, function(id, expression) {
        return context.addStatement({
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: id,
              init: expression
            }
          ],
          kind: 'let'
        }, ++count);
      });
    }
  }
  if (node.type === 'ExpressionStatement' && node.expression.operator === '=') {
    expression = node.expression;
    pattern = expression.left;
    if (isPattern(pattern)) {
      tempId = context.getNewInternalIdentifier();
      context.replace({
        type: 'VariableDeclaration',
        declarations: [
          {
            type: 'VariableDeclarator',
            id: tempId,
            init: expression.right
          }
        ],
        kind: 'const'
      });
      count = 0;
      return forEachDestructuringAssignment(pattern, tempId, function(id, expression) {
        return context.addStatement({
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: id,
            right: expression
          }
        }, ++count);
      });
    }
  }
};

defaultOperatorsToConditionals = function(node, context) {
  if (node.type === 'BinaryExpression' && (node.operator === '??' || node.operator === '?')) {
    return context.replace({
      type: 'ConditionalExpression',
      test: {
        type: 'BinaryExpression',
        operator: '!=',
        left: node.left,
        right: node.operator === '??' ? undefinedExpression : nullExpression
      },
      consequent: node.left,
      alternate: node.right
    });
  }
};

defaultAssignmentsToDefaultOperators = function(node, context) {
  if (node.type === 'AssignmentExpression' && (node.operator === '?=' || node.operator === '??=')) {
    node.right = {
      type: 'BinaryExpression',
      operator: node.operator === '?=' ? '?' : '??',
      left: node.left,
      right: node.right
    };
    return node.operator = '=';
  }
};

existentialExpression = function(node, context) {
  var existentialChild, existentialChildObject, getExistentialDescendantObject, _ref1;
  if (node.type === 'UnaryExpression' && node.operator === '?') {
    context.replace({
      type: 'BinaryExpression',
      operator: '!=',
      left: node.argument,
      right: nullExpression
    });
  }
  if (node.type === 'MemberExpression' || node.type === 'CallExpression') {
    getExistentialDescendantObject = function(check) {
      var result, _ref1;
      result = null;
      if (check.type === 'MemberExpression' || check.type === 'CallExpression') {
        result = getExistentialDescendantObject((_ref1 = check.object) != null ? _ref1 : check.callee);
        if (check.existential) {
          if (result == null) {
            result = check;
          }
        }
      }
      return result;
    };
    existentialChild = getExistentialDescendantObject(node);
    if (existentialChild != null) {
      existentialChildObject = (_ref1 = existentialChild.object) != null ? _ref1 : existentialChild.callee;
      delete existentialChild.existential;
      return context.replace({
        type: 'ConditionalExpression',
        test: {
          type: 'BinaryExpression',
          operator: '!=',
          left: existentialChildObject,
          right: nullExpression
        },
        consequent: node,
        alternate: undefinedExpression
      });
    }
  }
};

addUseStrict = function(node, context) {
  if (node.type === 'Program') {
    return node.body.unshift({
      type: 'ExpressionStatement',
      expression: {
        type: 'Literal',
        value: 'use strict'
      }
    });
  }
};

typedObjectExpressions = function(node, context) {
  var key, objectId, parentNode, value, _i, _ref1, _ref2, _results;
  if (node.type === 'ObjectExpression' && (node.objectType != null)) {
    if (node.objectType.type === 'ObjectExpression' && node.objectType.properties.length === 0) {
      delete node.objectType;
      return;
    }
    if (node.objectType.type === 'ArrayExpression' || node.objectType.type === 'NewExpression') {
      value = node.objectType;
    } else {
      value = {
        type: 'NewExpression',
        callee: node.objectType,
        "arguments": []
      };
    }
    parentNode = context.parentNode();
    if (parentNode.type === 'AssignmentExpression') {
      objectId = parentNode.left;
      context.replace(value);
    } else {
      objectId = context.addVariable({
        offset: 0,
        init: value
      });
      context.replace(objectId);
    }
    delete node.objectType;
    _ref1 = node.properties;
    _results = [];
    for (_i = _ref1.length - 1; _i >= 0; _i += -1) {
      _ref2 = _ref1[_i], key = _ref2.key, value = _ref2.value;
      _results.push(context.addStatement({
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'MemberExpression',
            object: objectId,
            property: key
          },
          right: value
        }
      }, 1));
    }
    return _results;
  }
};

propertyStatements = function(node, context) {
  var createAssignments, parent;
  parent = context.parentNode();
  if (node.type === 'Property' && !(parent.type === 'ObjectExpression' || parent.type === 'ObjectPattern')) {
    if (node.objectType != null) {
      throw new Error("Cannot use a typed object on a property declaration statement");
    }
    createAssignments = function(path, value) {
      var newPath, property, _i, _ref1, _results;
      if (value.type === 'ObjectExpression' && (value.objectType == null)) {
        _ref1 = value.properties;
        _results = [];
        for (_i = _ref1.length - 1; _i >= 0; _i += -1) {
          property = _ref1[_i];
          newPath = {
            type: 'MemberExpression',
            object: path,
            property: property.key,
            computed: property.key.type !== 'Identifier'
          };
          _results.push(createAssignments(newPath, property.value));
        }
        return _results;
      } else {
        return context.addStatement({
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: path,
            right: value
          }
        }, 0);
      }
    };
    createAssignments(node.key, node.value);
    return context.remove();
  }
};

exports.postprocess = function(program, options) {
  var steps, traversal, _i, _len;
  steps = [[extractForLoopRightVariable, callFunctionBindForFatArrows, defaultAssignmentsToDefaultOperators], [createForInLoopValueVariable, convertForInToForLength, convertObjectExpressionToArrayExpression, nodejsModules], [propertyStatements, separateAllVariableDeclarations, destructuringAssignments, defaultOperatorsToConditionals], [existentialExpression, addUseStrict, typedObjectExpressions]];
  for (_i = 0, _len = steps.length; _i < _len; _i++) {
    traversal = steps[_i];
    traverse(program, function(node, context) {
      var step, _j, _len1, _results;
      _results = [];
      for (_j = 0, _len1 = traversal.length; _j < _len1; _j++) {
        step = traversal[_j];
        _results.push(step(node, context, options));
      }
      return _results;
    });
  }
  return program;
};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/postprocessor',_ion_compiler_postprocessor_);
    else
      _ion_compiler_postprocessor_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_postprocessor_.call(this);
  }
}).call(this)