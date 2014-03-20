(function(){var _ion_compiler_postprocessor_ = function(module,exports,require){var addStatement, addUseStrictAndRequireIon, arrayComprehensionsToES5, assertStatements, basicTraverse, block, callFunctionBindForFatArrows, checkVariableDeclarations, classExpressions, convertForInToForLength, createForInLoopValueVariable, createTemplateFunctionClone, createTemplateRuntime, defaultAssignmentsToDefaultOperators, defaultOperatorsToConditionals, destructuringAssignments, ensureIonVariable, existentialExpression, extractForLoopRightVariable, extractForLoopsInnerAndTest, forEachDestructuringAssignment, functionParameterDefaultValuesToES5, getPathExpression, ion, ionExpression, isAncestorObjectExpression, isFunctionNode, isSuperExpression, namedFunctions, nodejsModules, nodes, nullExpression, propertyStatements, spreadExpressions, superExpressions, thisExpression, toLiteral, traverse, typedObjectExpressions, undefinedExpression, validateTemplateNodes, _ref;

traverse = require('./traverseAst').traverse;

basicTraverse = require('./traverse').traverse;

_ref = require('./astFunctions'), addStatement = _ref.addStatement, forEachDestructuringAssignment = _ref.forEachDestructuringAssignment;

nodes = require('./nodes');

ion = require('../');

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

ionExpression = Object.freeze({
  type: 'Identifier',
  name: 'ion'
});

thisExpression = Object.freeze({
  type: 'ThisExpression'
});

getPathExpression = function(path) {
  var i, result, step, steps, _i, _len;
  steps = path.split('.');
  if (steps[0] === 'this') {
    result = {
      type: 'ThisExpression'
    };
  } else {
    result = {
      type: 'Identifier',
      name: steps[0]
    };
  }
  for (i = _i = 0, _len = steps.length; _i < _len; i = ++_i) {
    step = steps[i];
    if (i > 0) {
      result = {
        type: 'MemberExpression',
        object: result,
        property: {
          type: 'Identifier',
          name: step
        }
      };
    }
  }
  return result;
};

isFunctionNode = function(node) {
  var _ref1, _ref2;
  return (_ref1 = (_ref2 = nodes[node.type]) != null ? _ref2.isFunction : void 0) != null ? _ref1 : false;
};

toLiteral = function(object) {
  var item, key, node, value;
  node = null;
  if (Array.isArray(object)) {
    node = {
      type: 'ArrayExpression',
      elements: (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = object.length; _i < _len; _i++) {
          item = object[_i];
          _results.push(toLiteral(item));
        }
        return _results;
      })()
    };
  } else if ((object != null) && typeof object === 'object') {
    node = {
      type: 'ObjectExpression',
      properties: []
    };
    for (key in object) {
      value = object[key];
      if (value !== void 0) {
        node.properties.push({
          key: {
            type: 'Identifier',
            name: key
          },
          value: toLiteral(value),
          kind: 'init'
        });
      }
    }
  } else {
    node = {
      type: 'Literal',
      value: object
    };
  }
  return node;
};

block = function(node) {
  if (node.type !== 'BlockStatement') {
    node = {
      type: 'BlockStatement',
      body: [node]
    };
  }
  return node;
};

extractForLoopRightVariable = function(node, context) {
  var ref, right;
  if (context.reactive) {
    return;
  }
  if (node.type === 'ForOfStatement' || node.type === 'ForInStatement' && node.left.declarations.length > 1) {
    if (node.left.declarations.length > 2) {
      throw context.error("too many declarations", node.left.declarations[2]);
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
  if (context.reactive) {
    return;
  }
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
  if (context.reactive) {
    return;
  }
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
  if (node.type === 'FunctionExpression' && node.bound) {
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
          throw context.error("Export variables must have an init value", declarator);
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
        throw context.error("default export must be first");
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

destructuringAssignments = function(node, context) {
  var count, declarator, expression, index, isPattern, pattern, statement, statements, tempId, _i, _j, _k, _len, _len1, _len2, _ref1, _ref2;
  isPattern = function(node) {
    return (node.properties != null) || (node.elements != null);
  };
  if (isFunctionNode(node)) {
    _ref1 = node.params;
    for (index = _i = 0, _len = _ref1.length; _i < _len; index = ++_i) {
      pattern = _ref1[index];
      if (!(isPattern(pattern))) {
        continue;
      }
      tempId = context.getNewInternalIdentifier();
      node.params[index] = tempId;
      statements = [];
      forEachDestructuringAssignment(pattern, tempId, function(id, expression) {
        return statements.unshift({
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: id,
              init: expression
            }
          ],
          kind: 'let'
        });
      });
      for (_j = 0, _len1 = statements.length; _j < _len1; _j++) {
        statement = statements[_j];
        context.addStatement(statement);
      }
    }
  }
  if (node.type === 'VariableDeclaration' && context.isParentBlock()) {
    _ref2 = node.declarations;
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      declarator = _ref2[_k];
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

ensureIonVariable = function(context, required) {
  if (required == null) {
    required = true;
  }
  return context.ancestorNodes[0].requiresIon = required;
};

addUseStrictAndRequireIon = {
  enter: function(node, context) {
    var d, _i, _len, _ref1, _ref2, _results;
    if (node.type === 'VariableDeclaration' && ((_ref1 = context.parentNode()) != null ? _ref1.type : void 0) === 'Program') {
      _ref2 = node.declarations;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        d = _ref2[_i];
        if (!(d.id.name === 'ion')) {
          continue;
        }
        ensureIonVariable(context, false);
        break;
      }
      return _results;
    }
  },
  exit: function(node, context) {
    if (node.type === 'Program') {
      if (node.requiresIon) {
        delete node.requiresIon;
        context.addVariable({
          offset: Number.MIN_VALUE,
          kind: 'const',
          id: ionExpression,
          init: {
            type: 'ImportExpression',
            name: {
              type: 'Literal',
              value: 'ion'
            }
          }
        });
      }
      return node.body.unshift({
        type: 'ExpressionStatement',
        expression: {
          type: 'Literal',
          value: 'use strict'
        }
      });
    }
  }
};

extractForLoopsInnerAndTest = function(node, context) {
  if (node.type === 'ForInStatement' || node.type === 'ForOfStatement') {
    if (node.inner != null) {
      node.inner.body = node.body;
      node.body = node.inner;
      delete node.inner;
    }
    if (node.test != null) {
      node.body = block({
        type: 'IfStatement',
        test: node.test,
        consequent: block(node.body)
      });
      return delete node.test;
    }
  }
};

arrayComprehensionsToES5 = function(node, context) {
  var forStatement, tempId;
  if (node.type === 'ArrayExpression' && (node.value != null) && (node.comprehension != null)) {
    tempId = context.addVariable({
      offset: 0,
      init: {
        type: 'ArrayExpression',
        elements: []
      }
    });
    forStatement = node.comprehension;
    forStatement.body = {
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: tempId,
          property: {
            type: 'Identifier',
            name: 'push'
          }
        },
        "arguments": [node.value]
      }
    };
    context.addStatement(0, forStatement);
    return context.replace(tempId);
  }
};

functionParameterDefaultValuesToES5 = function(node, context) {
  var defaultValue, index, param, _i, _ref1, _ref2, _results;
  if (context.reactive) {
    return;
  }
  if (isFunctionNode(node) && (node.params != null) && (node.defaults != null)) {
    _ref1 = node.params;
    _results = [];
    for (index = _i = _ref1.length - 1; _i >= 0; index = _i += -1) {
      param = _ref1[index];
      defaultValue = (_ref2 = node.defaults) != null ? _ref2[index] : void 0;
      if (defaultValue != null) {
        context.addStatement({
          type: 'IfStatement',
          test: {
            type: 'BinaryExpression',
            operator: '==',
            left: param,
            right: nullExpression
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: param,
              right: defaultValue
            }
          }
        });
        _results.push(node.defaults[index] = void 0);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  }
};

typedObjectExpressions = function(node, context) {
  var addPosition, element, elements, expressionStatement, getExistingObjectIdIfTempVarNotNeeded, grandNode, initialValue, isArray, isSimple, objectId, parentNode, property, statements, _i, _j, _k, _len, _len1, _len2, _ref1, _ref2, _ref3, _ref4;
  if (context.reactive) {
    return;
  }
  if (node.type === 'ObjectExpression' && node.simple !== true) {
    isArray = ((_ref1 = node.objectType) != null ? _ref1.type : void 0) === "ArrayExpression";
    isSimple = true;
    if (node.properties != null) {
      _ref2 = node.properties;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        property = _ref2[_i];
        if (isArray) {
          if (property.type !== 'ExpressionStatement') {
            isSimple = false;
            break;
          }
        } else {
          if (property.type !== 'Property' || property.computed) {
            isSimple = false;
            break;
          }
        }
      }
    }
    if (isSimple) {
      if (isArray) {
        elements = [];
        if (node.objectType != null) {
          _ref3 = node.objectType.elements;
          for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
            element = _ref3[_j];
            elements.push(element);
          }
        }
        _ref4 = node.properties;
        for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
          expressionStatement = _ref4[_k];
          elements.push(expressionStatement.expression);
        }
        context.replace({
          type: "ArrayExpression",
          elements: elements
        });
        return;
      }
      if ((node.objectType == null) || (node.objectType.type === 'ObjectExpression' && node.objectType.properties.length === 0)) {
        delete node.objectType;
        Object.defineProperty(node, 'simple', {
          value: true
        });
        return;
      }
    }
    if (node.objectType == null) {
      initialValue = {
        type: 'ObjectExpression',
        properties: []
      };
    } else if (node.objectType.type === 'ArrayExpression' || node.objectType.type === 'NewExpression' || node.objectType.type === 'ObjectExpression') {
      initialValue = node.objectType;
    } else {
      initialValue = {
        type: 'NewExpression',
        callee: node.objectType,
        "arguments": []
      };
    }
    parentNode = context.parentNode();
    grandNode = context.ancestorNodes[context.ancestorNodes.length - 2];
    addPosition = 0;
    getExistingObjectIdIfTempVarNotNeeded = function(node, parentNode, grandNode) {
      if (parentNode.type === 'VariableDeclarator') {
        return parentNode.id;
      }
      if (parentNode.type === 'AssignmentExpression' && parentNode.left.type === 'Identifier' && (grandNode != null ? grandNode.type : void 0) === 'ExpressionStatement') {
        return parentNode.left;
      }
      return null;
    };
    objectId = getExistingObjectIdIfTempVarNotNeeded(node, parentNode, grandNode);
    if (objectId != null) {
      context.replace(initialValue);
      addPosition = 1;
    } else {
      objectId = context.addVariable({
        offset: 0,
        init: initialValue
      });
      context.replace(objectId);
    }
    statements = [];
    traverse(node.properties, function(subnode, subcontext) {
      if (subnode.type === 'ObjectExpression' || subnode.type === 'ArrayExpression') {
        return subcontext.skip();
      }
      if (subnode.type === 'Property') {
        subnode = subcontext.replace({
          type: 'Property',
          key: objectId,
          value: {
            type: 'ObjectExpression',
            properties: [subnode],
            create: false
          }
        });
        subcontext.skip();
      } else if (subnode.type === 'ExpressionStatement') {
        if (!isArray) {
          ensureIonVariable(context);
        }
        subnode = subcontext.replace({
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: isArray ? objectId : ionExpression,
              property: {
                type: 'Identifier',
                name: isArray ? 'push' : 'add'
              }
            },
            "arguments": isArray ? [subnode.expression] : [objectId, subnode.expression]
          }
        });
        subcontext.skip();
      }
      if (subcontext.parentNode() == null) {
        return statements.push(subnode);
      }
    });
    if (statements.length === 1) {
      return context.addStatement(statements[0], addPosition);
    } else {
      return context.addStatement({
        type: 'BlockStatement',
        body: statements
      }, addPosition);
    }
  }
};

propertyStatements = function(node, context) {
  var createAssignments, parent;
  if (context.reactive) {
    return;
  }
  parent = context.parentNode();
  if (node.type === 'Property' && !(parent.type === 'ObjectExpression' || parent.type === 'ObjectPattern')) {
    createAssignments = function(path, value) {
      var newPath, property, _i, _ref1;
      if (value.type === 'ObjectExpression' && (value.objectType == null)) {
        _ref1 = value.properties;
        for (_i = _ref1.length - 1; _i >= 0; _i += -1) {
          property = _ref1[_i];
          newPath = {
            type: 'MemberExpression',
            object: path,
            property: property.key,
            computed: property.computed || property.key.type !== 'Identifier'
          };
          createAssignments(newPath, property.value);
        }
        if (value.create !== false) {
          return context.addStatement({
            type: 'IfStatement',
            test: {
              type: 'BinaryExpression',
              operator: '==',
              left: path,
              right: nullExpression
            },
            consequent: {
              type: 'ExpressionStatement',
              expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: path,
                right: {
                  type: 'ObjectExpression',
                  properties: []
                }
              }
            }
          }, 0);
        }
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
    return context.remove(node);
  }
};

classExpressions = function(node, context) {
  var classExpression, hasIdentifierName, name, properties, property, _base, _i, _len;
  if (node.type === 'ClassExpression') {
    ensureIonVariable(context);
    properties = node.properties;
    hasIdentifierName = (node.name != null) && !node.computed;
    if (node.name != null) {
      name = hasIdentifierName ? {
        type: 'Literal',
        value: node.name.name
      } : node.name;
      properties = [
        {
          type: 'Property',
          key: {
            type: 'Identifier',
            name: 'id'
          },
          value: name
        }
      ].concat(properties);
    }
    if (hasIdentifierName) {
      for (_i = 0, _len = properties.length; _i < _len; _i++) {
        property = properties[_i];
        if (property.key.name === 'constructor') {
          if ((_base = property.value).id == null) {
            _base.id = node.name;
          }
        }
      }
    }
    classExpression = {
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: ionExpression,
        property: {
          type: 'Identifier',
          name: 'defineClass'
        }
      },
      "arguments": [
        {
          type: 'ObjectExpression',
          properties: properties
        }
      ].concat(node["extends"])
    };
    if (hasIdentifierName) {
      context.addVariable({
        id: node.name,
        kind: 'const',
        init: classExpression,
        offset: 0
      });
      return context.replace(node.name);
    } else {
      return context.replace(classExpression);
    }
  }
};

checkVariableDeclarations = {
  enter: function(node, context) {
    var key, parent, variable, _base;
    if (node.type === 'AssignmentExpression') {
      if (node.left.type === 'Identifier') {
        variable = context.getVariableInfo(node.left.name);
        if (variable == null) {
          throw context.error("cannot assign to undeclared variable " + node.left.name);
        }
        if (variable.kind === 'const') {
          throw context.error("cannot assign to a const", node.left);
        }
      }
      if (context.reactive) {
        throw context.error("cannot assign within templates", node);
      }
    }
    if (node.type === 'Identifier') {
      key = context.key();
      parent = context.parentNode();
      if (!(parent.type === 'MemberExpression' && key === 'property' || parent.type === 'Property' && key === 'key')) {
        return ((_base = context.scope()).usage != null ? (_base = context.scope()).usage : _base.usage = {})[node.name] = node;
      }
    }
  },
  variable: function(variable, context) {
    var checkScope, existing, scope, shadow, used, _i, _j, _ref1, _ref2, _ref3, _ref4, _ref5, _results;
    scope = context.scope();
    existing = context.getVariableInfo(variable.name);
    if (existing != null) {
      shadow = false;
      _ref1 = context.scopeStack;
      for (_i = _ref1.length - 1; _i >= 0; _i += -1) {
        checkScope = _ref1[_i];
        if (checkScope === (existing != null ? existing.scope : void 0)) {
          break;
        }
        if ((_ref2 = nodes[checkScope.node.type]) != null ? _ref2.shadow : void 0) {
          shadow = true;
          break;
        }
      }
      if (!shadow) {
        throw context.error("Cannot redeclare variable " + variable.name, variable.node);
      }
    }
    _ref3 = context.scopeStack;
    _results = [];
    for (_j = _ref3.length - 1; _j >= 0; _j += -1) {
      checkScope = _ref3[_j];
      used = (_ref4 = checkScope.usage) != null ? _ref4[variable.name] : void 0;
      if (used != null) {
        throw context.error("Cannot use variable '" + variable.name + "' before declaration", used);
      }
      if ((_ref5 = nodes[checkScope.node.type]) != null ? _ref5.shadow : void 0) {
        break;
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  }
};

isAncestorObjectExpression = function(context) {
  var ancestor, _i, _ref1;
  _ref1 = context.ancestorNodes;
  for (_i = _ref1.length - 1; _i >= 0; _i += -1) {
    ancestor = _ref1[_i];
    if (ancestor.type === 'ObjectExpression') {
      return true;
    }
    if (isFunctionNode(ancestor)) {
      return false;
    }
  }
  return false;
};

namedFunctions = function(node, context) {
  var func, _base, _base1, _ref1;
  if (node.type === 'ExpressionStatement' && node.expression.type === 'FunctionExpression') {
    func = node.expression;
    if (func.id == null) {
      throw context.error("Function declaration missing name", func);
    }
    func.type = 'FunctionDeclaration';
    context.replace(func);
  }
  if (node.type === 'VariableDeclarator' && ((_ref1 = node.init) != null ? _ref1.type : void 0) === 'FunctionExpression') {
    if ((_base = node.init).name == null) {
      _base.name = node.id;
    }
  }
  if (node.type === 'Property' && node.value.type === 'FunctionExpression' && node.key.type === 'Identifier') {
    if (node.key.name !== 'constructor') {
      return (_base1 = node.value).name != null ? (_base1 = node.value).name : _base1.name = node.key;
    }
  }
};

assertStatements = function(node, context) {
  if (node.type === 'AssertStatement') {
    return context.replace({
      type: 'IfStatement',
      test: {
        type: 'UnaryExpression',
        prefix: true,
        operator: '!',
        argument: node.expression
      },
      consequent: {
        type: 'ThrowStatement',
        argument: {
          type: 'NewExpression',
          callee: {
            type: 'Identifier',
            name: 'Error'
          },
          "arguments": [
            {
              type: 'Literal',
              value: "Assertion Failed: (" + node.text + ")"
            }
          ]
        }
      }
    });
  }
};

isSuperExpression = function(node, context) {
  var parentNode;
  parentNode = context.parentNode();
  if (node.type === 'Identifier' && node.name === 'super' && parentNode.type !== 'CallExpression' && parentNode.type !== 'MemberExpression') {
    return true;
  }
  if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'super') {
    return true;
  }
  return false;
};

superExpressions = function(node, context) {
  var applyOrCall, args, classNode, functionNode, functionProperty, isConstructor, superFunction, _ref1, _ref2;
  if (isSuperExpression(node, context)) {
    classNode = context.getAncestor(function(node) {
      return node.type === 'ClassExpression';
    });
    functionNode = context.getAncestor(isFunctionNode);
    functionProperty = context.ancestorNodes[context.ancestorNodes.indexOf(functionNode) - 1];
    isConstructor = (functionProperty != null ? (_ref1 = functionProperty.key) != null ? _ref1.name : void 0 : void 0) === 'constructor';
    if ((classNode == null) || !(((functionNode != null ? functionNode.name : void 0) != null) || isConstructor)) {
      throw context.error("super can only be used within named class functions", node);
    }
    args = [
      {
        type: 'ThisExpression'
      }
    ];
    if (node.type === 'Identifier') {
      args.push({
        type: 'Identifier',
        name: 'arguments'
      });
      applyOrCall = 'apply';
    } else {
      args = args.concat(node["arguments"]);
      applyOrCall = 'call';
    }
    superFunction = getPathExpression("this.constructor.super");
    if (!isConstructor) {
      superFunction = {
        type: 'MemberExpression',
        object: {
          type: 'MemberExpression',
          object: superFunction,
          property: {
            type: 'Identifier',
            name: 'prototype'
          }
        },
        property: (_ref2 = functionNode.name) != null ? _ref2 : 'constructor'
      };
    }
    return context.replace({
      type: 'CallExpression',
      callee: {
        type: 'MemberExpression',
        object: superFunction,
        property: {
          type: 'Identifier',
          name: applyOrCall
        }
      },
      "arguments": args
    });
  }
};

spreadExpressions = function(node, context) {
  var args, finalParameters, getOffsetFromArgumentsLength, index, param, spread, spreadIndex, _i, _len, _ref1;
  if (isFunctionNode(node)) {
    spread = null;
    spreadIndex = null;
    _ref1 = node.params;
    for (index = _i = 0, _len = _ref1.length; _i < _len; index = ++_i) {
      param = _ref1[index];
      if (param.type === 'SpreadExpression') {
        spread = param;
        spreadIndex = index;
        break;
      }
    }
    if (spread != null) {
      node.params[spreadIndex] = {
        type: 'Identifier',
        name: "___" + spread.expression.name
      };
      args = [
        {
          type: 'Identifier',
          name: 'arguments'
        }, {
          type: 'Literal',
          value: spreadIndex
        }
      ];
      finalParameters = node.params.length - 1 - spreadIndex;
      if (finalParameters > 0) {
        getOffsetFromArgumentsLength = function(offset) {
          return {
            type: 'BinaryExpression',
            operator: '-',
            left: getPathExpression('arguments.length'),
            right: {
              type: 'Literal',
              value: offset
            }
          };
        };
        args.push(getOffsetFromArgumentsLength(finalParameters));
        index = node.params.length - 1;
        while (index > spreadIndex) {
          param = node.params[index--];
          context.addStatement({
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: param,
              right: {
                type: 'MemberExpression',
                computed: true,
                object: getPathExpression('arguments'),
                property: getOffsetFromArgumentsLength(node.params.length - 1 - index)
              }
            }
          });
        }
      }
      return context.addVariable({
        id: spread.expression,
        init: {
          type: 'CallExpression',
          callee: getPathExpression('Array.prototype.slice.call'),
          "arguments": args
        }
      });
    }
  }
};

createTemplateFunctionClone = function(node, context) {
  var template;
  if (isFunctionNode(node) && node.template === true) {
    if (node.bound) {
      throw context.error("Templates cannot use the fat arrow (=>) binding syntax", node);
    }
    delete node.template;
    template = ion.clone(node, true);
    delete template.type;
    delete template.id;
    delete template.defaults;
    delete template.bound;
    Object.defineProperties(template, {
      type: {
        value: 'Template'
      }
    });
    return node.template = template;
  }
};

validateTemplateNodes = function(node, context) {
  var _ref1;
  if (!context.reactive) {
    return;
  }
  if (((_ref1 = nodes[node.type]) != null ? _ref1.allowedInReactive : void 0) === false) {
    throw context.error(node.type + " not allowed in templates", node);
  }
  if (node.type === 'VariableDeclaration' && node.kind === 'let') {
    throw context.error("only const variables are allowed in templates", node);
  }
};

createTemplateRuntime = function(node, context) {
  var args, param, template, templateId, _i, _len, _ref1;
  if (isFunctionNode(node) && (node.template != null)) {
    templateId = node.id != null ? node.id : node.id = context.getNewInternalIdentifier('_template');
    template = node.template;
    ensureIonVariable(context);
    args = {
      type: 'ObjectExpression',
      properties: []
    };
    _ref1 = template.params;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      param = _ref1[_i];
      forEachDestructuringAssignment(param, param, function(id) {
        return args.properties.push({
          key: id,
          value: id,
          kind: 'init'
        });
      });
    }
    delete template.params;
    context.addStatement({
      type: 'IfStatement',
      test: {
        type: 'BinaryExpression',
        operator: '===',
        left: getPathExpression('this.constructor'),
        right: templateId
      },
      consequent: block({
        type: 'ReturnStatement',
        argument: {
          type: 'CallExpression',
          callee: getPathExpression('ion.createRuntime'),
          "arguments": [args, toLiteral(template)]
        }
      })
    });
    return delete node.template;
  }
};

exports.postprocess = function(program, options) {
  var enter, exit, steps, traversal, variable, _i, _len;
  steps = [[namedFunctions, superExpressions], [createTemplateFunctionClone, checkVariableDeclarations, arrayComprehensionsToES5, extractForLoopsInnerAndTest, extractForLoopRightVariable, callFunctionBindForFatArrows], [validateTemplateNodes, classExpressions], [createForInLoopValueVariable, convertForInToForLength, typedObjectExpressions, propertyStatements, defaultAssignmentsToDefaultOperators, defaultOperatorsToConditionals], [existentialExpression, createTemplateRuntime, functionParameterDefaultValuesToES5, addUseStrictAndRequireIon], [nodejsModules, destructuringAssignments, spreadExpressions, assertStatements]];
  for (_i = 0, _len = steps.length; _i < _len; _i++) {
    traversal = steps[_i];
    enter = function(node, context) {
      var handler, step, _j, _len1, _ref1, _results;
      if (context.options == null) {
        context.options = options;
      }
      _results = [];
      for (_j = 0, _len1 = traversal.length; _j < _len1; _j++) {
        step = traversal[_j];
        if (!(node != null)) {
          continue;
        }
        handler = (_ref1 = step.enter) != null ? _ref1 : (typeof step === 'function' ? step : null);
        if (handler != null) {
          handler(node, context);
          _results.push(node = context.current());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    exit = function(node, context) {
      var handler, step, _j, _ref1, _results;
      _results = [];
      for (_j = traversal.length - 1; _j >= 0; _j += -1) {
        step = traversal[_j];
        if (!(node != null)) {
          continue;
        }
        handler = (_ref1 = step.exit) != null ? _ref1 : null;
        if (handler != null) {
          handler(node, context);
          _results.push(node = context.current());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    variable = function(node, context, kind, name) {
      var handler, step, _j, _len1, _ref1, _results;
      _results = [];
      for (_j = 0, _len1 = traversal.length; _j < _len1; _j++) {
        step = traversal[_j];
        if (!(node != null)) {
          continue;
        }
        handler = (_ref1 = step.variable) != null ? _ref1 : null;
        if (handler != null) {
          handler(node, context, kind, name);
          _results.push(node = context.current());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    traverse(program, enter, exit, variable);
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