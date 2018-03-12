void (function(){var _ion_compiler_postprocessor_ = function(module,exports,require){var activateStatements, addOrderPropertyToStatements, addPropertyDeclaration, addStatement, addUseStrictAndRequireIon, arrayComprehensionsToES5, assertStatements, basicTraverse, block, callFunctionBindForFatArrows, checkVariableDeclarations, classExpressions, convertForInToForLength, createForInLoopValueVariable, createTemplateFunctionClone, createTemplateRuntime, defaultAssignmentsToDefaultOperators, defaultOperatorsToConditionals, destructuringAssignments, ensureIonVariable, existentialExpression, extractForLoopRightVariable, extractForLoopsInnerAndTest, extractReactiveForPatterns, falseExpression, forEachDestructuringAssignment, functionDeclarations, functionParameterDefaultValuesToES5, getExternalIdentifiers, getPathExpression, getReferenceIdentifiers, globalOptions, hoistVariables, ion, ionExpression, isAncestorObjectExpression, isConstantLiteral, isFunctionNode, isObjectPatch, isPattern, isReferenceNode, isSimpleObjectExpression, isSuperExpression, isVariableReference, javascriptExpressions, letAndConstToVar, namedFunctionsAndNewArguments, nodeToLiteral, nodejsModules, nodes, nullExpression, patchAssignmentExpression, propertyDefinitions, propertyStatements, removeLocationInfo, setNodeOutputValues, spreadExpressions, superExpressions, thisExpression, traverse, trueExpression, typedObjectExpressions, undefinedExpression, validateTemplateNodes, variableDeclarationExpressions, wrapTemplateInnerFunctions;

({traverse} = require('./traverseAst'));

basicTraverse = require('./traverse').traverse;

({addStatement, forEachDestructuringAssignment} = require('./astFunctions'));

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

trueExpression = Object.freeze({
  type: 'Literal',
  value: true
});

falseExpression = Object.freeze({
  type: 'Literal',
  value: false
});

ionExpression = Object.freeze({
  type: 'Identifier',
  name: 'ion'
});

thisExpression = Object.freeze({
  type: 'ThisExpression'
});

isPattern = function(node) {
  return (node.properties != null) || (node.elements != null);
};

isVariableReference = function(node, parent, key) {
  return node.type === 'Identifier' && ((parent == null) || !(parent.type === 'MemberExpression' && key === 'property' || parent.type === 'Property' && key === 'key'));
};

isObjectPatch = function(node) {
  return (node != null) && node.type === 'ObjectExpression' && ((node.objectType != null) || (node.create != null));
};

isConstantLiteral = function(node, parent, key) {
  var computed, index, j, k, len, len1, ref1, ref2, type, value;
  if (isObjectPatch(node)) {
    return false;
  }
  if (node == null) {
    return false;
  }
  if (node.type === 'Literal') {
    return true;
  }
  if (isVariableReference(node, parent, key)) {
    return false;
  }
  if (node.type === 'ObjectExpression') {
    ref1 = node.properties;
    for (index = j = 0, len = ref1.length; j < len; index = ++j) {
      ({type, value, computed} = ref1[index]);
      if (computed || type !== 'Property' || !isConstantLiteral(value, node, index)) {
        return false;
      }
    }
    return true;
  } else if (node.type === 'ArrayExpression') {
    ref2 = node.elements;
    for (index = k = 0, len1 = ref2.length; k < len1; index = ++k) {
      value = ref2[index];
      if (!isConstantLiteral(value, node, index)) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
};

nodeToLiteral = function(object, checkForLiteral) {
  var item, key, node, value;
  if (checkForLiteral !== false && isObjectPatch(object)) {
    checkForLiteral = false;
  }
  node = null;
  if ((object != null ? object.toLiteral : void 0) != null) {
    node = object != null ? object.toLiteral() : void 0;
  // else if checkForLiteral isnt false and object? and (object.type is 'ArrayExpression' or object.type is 'ObjectExpression') and isConstantLiteral(object)
  //     node =
  //         type: 'ObjectExpression'
  //         properties: [
  //             {type:'Property',key:{type:"Identifier",name:"type"},value:{type:"Literal",value:"Literal"}}
  //             {type:'Property',key:{type:"Identifier",name:"value"},value:object}
  //         ]
  } else if (Array.isArray(object)) {
    node = {
      type: 'ArrayExpression',
      elements: (function() {
        var j, len, results1;
        results1 = [];
        for (j = 0, len = object.length; j < len; j++) {
          item = object[j];
          results1.push(nodeToLiteral(item, checkForLiteral));
        }
        return results1;
      })()
    };
  } else if ((object != null ? object.constructor : void 0) === Object) {
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
          value: nodeToLiteral(value, checkForLiteral),
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

getPathExpression = function(path) {
  var i, j, len, result, step, steps;
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
  for (i = j = 0, len = steps.length; j < len; i = ++j) {
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
  var ref1, ref2;
  return (ref1 = (ref2 = nodes[node != null ? node.type : void 0]) != null ? ref2.isFunction : void 0) != null ? ref1 : false;
};

// wraps a node in a BlockStatement if it isn't already.
block = function(node) {
  if (node.type !== 'BlockStatement') {
    node = {
      type: 'BlockStatement',
      body: [node]
    };
  }
  return node;
};

extractReactiveForPatterns = function(node, context) {
  var declarator, index, j, len, ref, ref1, results1;
  if (!context.reactive) {
    return;
  }
  if (node.type === 'ForOfStatement' || node.type === 'ForInStatement') {
    ref1 = node.left.declarations;
    results1 = [];
    for (index = j = 0, len = ref1.length; j < len; index = ++j) {
      declarator = ref1[index];
      if (!(isPattern(declarator.id))) {
        continue;
      }
      ref = context.getNewInternalIdentifier();
      // extract the object pattern into a destructuring assignment from a new variable
      context.addStatement({
        type: 'VariableDeclaration',
        declarations: [
          {
            type: 'VariableDeclarator',
            id: declarator.id,
            init: ref
          }
        ]
      });
      // replace it with a reference to the new variable
      results1.push(declarator.id = ref);
    }
    return results1;
  }
};

extractForLoopRightVariable = function(node, context) {
  var ref, right;
  if (context.reactive) {
    return;
  }
  if (node.type === 'ForOfStatement' || (node.type === 'ForInStatement' && node.left.declarations.length > 1)) {
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
          },
          node
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
    // TODO: Come up with a better fix for this. 
    // Find out why it's being visited more than once. 
    // It's probably because of all the tree manipulation.
    // I imagine an insertion may be shifting the elements 
    // ahead to be retraversed while traversing an array.
    // -Kody
    if (node.visited_createForInLoopValueVariable) {
      return;
    }
    node.visited_createForInLoopValueVariable = true;
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
  var loopIndex, ref1, userIndex;
  if (context.reactive) {
    return;
  }
  if (node.type === 'ForOfStatement') {
    userIndex = (ref1 = node.left.declarations[1]) != null ? ref1.id : void 0;
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
    ensureIonVariable(context);
    return context.replace({
      type: "CallExpression",
      callee: getPathExpression('ion.bind'),
      arguments: [node, thisExpression]
    });
  }
};

nodejsModules = function(node, context) {
  var declarator, j, ref1, results1;
  // convert ImportExpression{name} into require(name)
  if (node.type === 'ImportExpression') {
    node.type = 'CallExpression';
    node.callee = {
      type: 'Identifier',
      name: 'require'
    };
    node.arguments = [node.name];
    return delete node.name;
  } else if (node.type === 'ExportStatement') {
    if (node.value.type === 'VariableDeclaration') {
      // variable export
      context.exports = true;
      // replace this node with the VariableDeclaration
      context.replace(node.value);
      ref1 = node.value.declarations;
      // then make each init also assign to it's export variable.
      results1 = [];
      for (j = ref1.length - 1; j >= 0; j += -1) {
        declarator = ref1[j];
        if (declarator.init == null) {
          throw context.error("Export variables must have an init value", declarator);
        }
        results1.push(declarator.init = {
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
      return results1;
    } else {
      // default export
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

// separateAllVariableDeclarations = (node, context) ->
//     if node.type is 'VariableDeclaration' and context.isParentBlock()
//         while node.declarations.length > 1
//             declaration = node.declarations.pop()
//             context.addStatement
//                 type: node.type
//                 declarations: [declaration]
//                 kind: node.kind
destructuringAssignments = function(node, context) {
  var count, declarator, declaratorIndex, expression, index, j, k, l, len, len1, len2, pattern, ref1, ref2, statement, statements, tempId;
  // function parameters
  if (isFunctionNode(node)) {
    ref1 = node.params;
    for (index = j = 0, len = ref1.length; j < len; index = ++j) {
      pattern = ref1[index];
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
      for (k = 0, len1 = statements.length; k < len1; k++) {
        statement = statements[k];
        context.addStatement(statement);
      }
    }
  }
  // variable assignments
  if (node.type === 'VariableDeclaration' && context.isParentBlock()) {
    count = 0;
    ref2 = node.declarations;
    for (declaratorIndex = l = 0, len2 = ref2.length; l < len2; declaratorIndex = ++l) {
      declarator = ref2[declaratorIndex];
      if (!(isPattern(declarator.id))) {
        continue;
      }
      pattern = declarator.id;
      tempId = context.getNewInternalIdentifier();
      declarator.id = tempId;
      // we must extract the init and add it later, otherwise...
      // it may reference a value which hasn't been destructured yet from a previous declarator
      if ((declarator.init != null) && declaratorIndex > 0) {
        context.addStatement({
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: tempId,
            right: declarator.init
          }
        }, ++count);
        declarator.init = null;
        node.kind = 'let';
      }
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
  // other assignments
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
    // a ?= b --> a = a ? b
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
  var existentialChild, existentialChildObject, getExistentialDescendantObject, ref1;
  if (node.type === 'UnaryExpression' && node.operator === '?') {
    context.replace({
      type: 'BinaryExpression',
      operator: '!=',
      left: node.argument,
      right: nullExpression
    });
  }
  // this could be more efficient by caching the left values
  // especially when the left side involves existential CallExpressions
  // should only apply within an imperative context
  if (node.type === 'MemberExpression' || node.type === 'CallExpression' && !context.reactive) {
    // search descendant objects for deepest existential child
    getExistentialDescendantObject = function(check) {
      var ref1, result;
      result = null;
      if (check.type === 'MemberExpression' || check.type === 'CallExpression') {
        result = getExistentialDescendantObject((ref1 = check.object) != null ? ref1 : check.callee);
        if (check.existential) {
          if (result == null) {
            result = check;
          }
        }
      }
      return result;
    };
    // create temp ref variable
    // a?.b --> a != null ? a.b : undefined
    existentialChild = getExistentialDescendantObject(node);
    if (existentialChild != null) {
      existentialChildObject = (ref1 = existentialChild.object) != null ? ref1 : existentialChild.callee;
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

ensureIonVariable = function(context, required = true) {
  return context.ancestorNodes[0].requiresIon = required;
};

addUseStrictAndRequireIon = {
  enter: function(node, context) {
    var d, j, len, ref1, ref2, results1;
    // see if we are already importing ion at the Program scope
    if (node.type === 'VariableDeclaration' && ((ref1 = context.parentNode()) != null ? ref1.type : void 0) === 'Program') {
      ref2 = node.declarations;
      results1 = [];
      for (j = 0, len = ref2.length; j < len; j++) {
        d = ref2[j];
        if (!(d.id.name === 'ion')) {
          continue;
        }
        // we don't need to import ion because the user already did
        ensureIonVariable(context, false);
        break;
      }
      return results1;
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
    if (context.reactive) {
      // convert it to a typed object expression
      forStatement = node.comprehension;
      forStatement.body = {
        type: 'ExpressionStatement',
        expression: node.value
      };
      return context.replace({
        type: 'ObjectExpression',
        objectType: {
          type: 'ArrayExpression',
          elements: []
        },
        properties: [forStatement]
      });
    } else {
      // add a statement
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
          arguments: [node.value]
        }
      };
      context.addStatement(0, forStatement);
      return context.replace(tempId);
    }
  }
};

functionParameterDefaultValuesToES5 = function(node, context) {
  var defaultValue, index, j, param, ref1, ref2, results1;
  if (context.reactive) {
    return;
  }
  if (isFunctionNode(node) && (node.params != null) && (node.defaults != null)) {
    ref1 = node.params;
    results1 = [];
    for (index = j = ref1.length - 1; j >= 0; index = j += -1) {
      param = ref1[index];
      defaultValue = (ref2 = node.defaults) != null ? ref2[index] : void 0;
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
        results1.push(node.defaults[index] = void 0);
      } else {
        results1.push(void 0);
      }
    }
    return results1;
  }
};

isSimpleObjectExpression = function(node) {
  var isArray, isSimple, j, len, property, ref1, ref2;
  if (node.type !== 'ObjectExpression') {
    return false;
  }
  isArray = ((ref1 = node.objectType) != null ? ref1.type : void 0) === "ArrayExpression";
  isSimple = true;
  if (node.properties != null) {
    ref2 = node.properties;
    for (j = 0, len = ref2.length; j < len; j++) {
      property = ref2[j];
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
  return isSimple;
};

typedObjectExpressions = function(node, context) {
  var addPosition, element, elements, expressionStatement, getExistingObjectIdIfTempVarNotNeeded, grandNode, initialValue, isArray, isSimple, j, k, len, len1, objectId, objectType, parentNode, ref1, ref2, ref3, statements;
  // only for imperative code
  if (context.reactive) {
    return;
  }
  if (node.type === 'ObjectExpression' && node.simple !== true) {
    isArray = ((ref1 = node.objectType) != null ? ref1.type : void 0) === "ArrayExpression";
    isSimple = isSimpleObjectExpression(node);
    // empty object expression without properties {}
    if (isSimple) {
      if (isArray) {
        elements = [];
        if (node.objectType != null) {
          ref2 = node.objectType.elements;
          for (j = 0, len = ref2.length; j < len; j++) {
            element = ref2[j];
            elements.push(element);
          }
        }
        ref3 = node.properties;
        for (k = 0, len1 = ref3.length; k < len1; k++) {
          expressionStatement = ref3[k];
          elements.push(expressionStatement.expression);
        }
        context.replace({
          type: "ArrayExpression",
          elements: elements
        });
        return;
      }
      if ((node.objectType == null) || (node.objectType.type === 'ObjectExpression' && node.objectType.properties.length === 0)) {
        // check that our properties ONLY contain normal Property objects with no computed values
        delete node.objectType;
        // set simple to true, but make it non-enumerable so we don't write it out
        Object.defineProperty(node, 'simple', {
          value: true
        });
        return;
      }
      // convert this simple expression to an ion.patch call
      objectType = node.objectType;
      delete node.objectType;
      // if the objectType is simple as well, then merge them
      if (isSimpleObjectExpression(objectType)) {
        node.properties = objectType.properties.concat(node.properties);
        Object.defineProperty(node, 'simple', {
          value: true
        });
        return;
      } else {
        ensureIonVariable(context);
        context.replace({
          type: 'CallExpression',
          callee: getPathExpression('ion.patch.combine'),
          arguments: [objectType, node]
        });
        return;
      }
    }
    if (node.objectType == null) {
      initialValue = {
        type: 'ObjectExpression',
        properties: []
      };
    } else {
      initialValue = node.objectType;
    }
    parentNode = context.parentNode();
    grandNode = context.ancestorNodes[context.ancestorNodes.length - 2];
    addPosition = 0;
    getExistingObjectIdIfTempVarNotNeeded = function(node, parentNode, grandNode) {
      // don't need a temp variable because nothing can trigger on variable declaration
      if (parentNode.type === 'VariableDeclarator') {
        return parentNode.id;
      }
      // don't need a temp variable because nothing can trigger on variable assignment
      if (parentNode.type === 'AssignmentExpression' && parentNode.left.type === 'Identifier' && (grandNode != null ? grandNode.type : void 0) === 'ExpressionStatement') {
        return parentNode.left;
      }
      // for everything else we must use a temp variable and assign all sub properties
      // before using the final value in an expression, because it may trigger a setter
      // or be a parameter in a function call or constructor
      return null;
    };
    objectId = getExistingObjectIdIfTempVarNotNeeded(node, parentNode, grandNode);
    if (objectId != null) {
      // replace this with the initial value
      context.replace(initialValue);
      addPosition = 1;
    } else {
      // create a temp variable
      objectId = context.addVariable({
        offset: 0,
        init: initialValue
      });
      // replace this with a reference to the variable
      context.replace(objectId);
    }
    statements = [];
    setNodeOutputValues(context, node.properties, objectId, statements, isArray);
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

setNodeOutputValues = function(context, nodes, outputId, statements = [], isArray) {
  var subnodeEnter, subnodeExit;
  // traverse all properties and expression statements
  // add a new property that indicates their output scope
  subnodeEnter = function(subnode, subcontext) {
    if (subcontext.outputStack == null) {
      subcontext.outputStack = [outputId];
    }
    if (subnode.type === 'ObjectExpression' || subnode.type === 'ArrayExpression') {
      return subcontext.skip();
    }
    if (subnode.type === 'Property') { //or subnode.type is 'ExpressionStatement'
      // we convert the node to a Property: ObjectExpression node
      // it will be handled correctly by the later propertyStatements rule
      subnode.output = subcontext.outputStack[subcontext.outputStack.length - 1];
      subcontext.outputStack.push({
        type: 'MemberExpression',
        object: subnode.output,
        property: subnode.key,
        computed: subnode.computed || subnode.key.type !== 'Identifier'
      });
    } else if (isFunctionNode(subnode)) {
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
            object: isArray ? outputId : ionExpression,
            property: {
              type: 'Identifier',
              name: isArray ? 'push' : 'add'
            }
          },
          arguments: isArray ? [subnode.expression] : [outputId, subnode.expression]
        }
      });
      subcontext.skip();
    }
    if (subcontext.parentNode() == null) {
      // add this statement to the current context
      return statements.push(subnode);
    }
  };
  subnodeExit = function(subnode, subcontext) {
    if (subnode.type === 'Property') {
      return subcontext.outputStack.pop();
    }
  };
  traverse(nodes, subnodeEnter, subnodeExit);
  return statements;
};

propertyStatements = function(node, context) {
  var left, parent, right;
  if (context.reactive) {
    return;
  }
  parent = context.parentNode();
  if (node.type === 'Property' && !(parent.type === 'ObjectExpression' || parent.type === 'ObjectPattern')) {
    if (node.output != null) {
      if (node.value.type === 'ObjectExpression') {
        left = {
          type: 'MemberExpression',
          object: node.output,
          property: node.key,
          computed: node.computed
        };
        if (node.value.type === 'ObjectExpression' && (node.value.objectType == null)) {
          ensureIonVariable(context);
          right = {
            type: 'CallExpression',
            callee: getPathExpression('ion.patch.combine'),
            arguments: [ion.clone(left, true), node.value]
          };
        } else {
          right = node.value;
        }
        return context.replace({
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: left,
            right: right
          }
        });
      } else {
        return context.replace({
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              object: node.output,
              property: node.key,
              computed: node.computed
            },
            right: node.value
          }
        });
      }
    } else {
      throw context.error("Property assignment only valid within an object declaration", node);
    }
  }
};

patchAssignmentExpression = function(node, context) {
  if (node.type === 'AssignmentExpression' && node.operator === ':=') {
    ensureIonVariable(context);
    return context.replace({
      type: 'AssignmentExpression',
      operator: '=',
      left: node.left,
      right: {
        type: 'CallExpression',
        callee: getPathExpression('ion.patch.combine'),
        arguments: [ion.clone(node.left, true), node.right]
      }
    });
  }
};

classExpressions = function(node, context) {
  var base, classExpression, hasIdentifierName, j, len, name, properties, property;
  if (node.type === 'ClassExpression') {
    ensureIonVariable(context);
    properties = node.properties;
    hasIdentifierName = (node.name != null) && !node.computed;
    if (node.name != null) {
      name = hasIdentifierName ? {
        type: 'Literal',
        value: node.name.name
      } : node.name;
      // add name to the properties
      properties = [
        {
          type: 'Property',
          key: {
            type: 'Identifier',
            name: 'name'
          },
          value: name
        }
      ].concat(properties);
    }
    // set the class name on the constructor function
    if (hasIdentifierName) {
      for (j = 0, len = properties.length; j < len; j++) {
        property = properties[j];
        if (property.key.name === 'constructor') {
          if ((base = property.value).id == null) {
            base.id = node.name;
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
      arguments: [
        {
          type: 'ObjectExpression',
          properties: properties
        }
      ].concat(node.extends)
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
    var base, variable;
    // check assigning to a constant
    if (node.type === 'AssignmentExpression') {
      if (node.left.type === 'Identifier') {
        variable = context.getVariableInfo(node.left.name);
        if (variable == null) {
          throw context.error(`cannot assign to undeclared variable ${node.left.name}`);
        }
        if (variable.kind === 'const') {
          throw context.error("cannot assign to a const", node.left);
        }
      }
      if (context.reactive) {
        throw context.error("cannot assign within templates", node);
      }
    }
    // track variable usage on a scope
    if (isVariableReference(node, context.parentNode(), context.key())) {
      // then this is a variable usage, so we will track it.
      return ((base = context.scope()).usage != null ? base.usage : base.usage = {})[node.name] = node;
    }
  },
  variable: function(variable, context) {
    var checkScope, existing, j, k, ref1, ref2, ref3, ref4, ref5, results1, scope, shadow, used;
    scope = context.scope();
    // check that we arent redeclaring a variable
    existing = context.getVariableInfo(variable.name);
    if (existing != null) {
      // check to see if shadowing is allowed.
      // walk the scope stack backwards
      shadow = false;
      ref1 = context.scopeStack;
      for (j = ref1.length - 1; j >= 0; j += -1) {
        checkScope = ref1[j];
        // we only check back until we hit the scope
        // where the existing variable was declared
        if (checkScope === (existing != null ? existing.scope : void 0)) {
          break;
        }
        // if we pass a scope that allows shadowing then we are ok
        if ((ref2 = nodes[checkScope.node.type]) != null ? ref2.shadow : void 0) {
          shadow = true;
          break;
        }
      }
      if (!shadow) {
        throw context.error(`Cannot redeclare variable ${variable.name}`, variable.node);
      }
    }
    ref3 = context.scopeStack;
    // make sure we havent used this variable before declaration
    results1 = [];
    for (k = ref3.length - 1; k >= 0; k += -1) {
      checkScope = ref3[k];
      used = (ref4 = checkScope.usage) != null ? ref4[variable.name] : void 0;
      if (used != null) {
        throw context.error(`Cannot use variable '${variable.name}' before declaration`, used);
      }
      // we only check back to a shadow, max
      if ((ref5 = nodes[checkScope.node.type]) != null ? ref5.shadow : void 0) {
        break;
      } else {
        results1.push(void 0);
      }
    }
    return results1;
  }
};

isAncestorObjectExpression = function(context) {
  var ancestor, j, ref1;
  ref1 = context.ancestorNodes;
  for (j = ref1.length - 1; j >= 0; j += -1) {
    ancestor = ref1[j];
    if (ancestor.type === 'ObjectExpression') {
      return true;
    }
    if (isFunctionNode(ancestor)) {
      return false;
    }
  }
  return false;
};

namedFunctionsAndNewArguments = function(node, context) {
  var base, base1, ref1;
  if (context.reactive) {
    return;
  }
  if (node.type === 'NewExpression') {
    if (node.arguments == null) {
      node.arguments = [];
    }
  }
  // these names are used later by the classExpression rule
  // add an internal name to functions declared as variables
  if (node.type === 'VariableDeclarator' && ((ref1 = node.init) != null ? ref1.type : void 0) === 'FunctionExpression') {
    if ((base = node.init).name == null) {
      base.name = node.id;
    }
  }
  // add an internal name to functions declared as properties
  if (node.type === 'Property' && node.value.type === 'FunctionExpression' && node.key.type === 'Identifier') {
    if (node.key.name !== 'constructor') {
      return (base1 = node.value).name != null ? base1.name : base1.name = node.key;
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
          arguments: [
            {
              type: 'Literal',
              value: `Assertion Failed: (${node.text})`
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
  var applyOrCall, args, classNode, functionNode, functionProperty, isConstructor, ref1, ref2, superFunction;
  if (isSuperExpression(node, context)) {
    classNode = context.getAncestor(function(node) {
      return node.type === 'ClassExpression';
    });
    functionNode = context.getAncestor(isFunctionNode);
    functionProperty = context.ancestorNodes[context.ancestorNodes.indexOf(functionNode) - 1];
    isConstructor = (functionProperty != null ? (ref1 = functionProperty.key) != null ? ref1.name : void 0 : void 0) === 'constructor';
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
      args = args.concat(node.arguments);
      applyOrCall = 'call';
    }
    superFunction = getPathExpression(`${classNode.name.name}.super`);
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
        property: (ref2 = functionNode.name) != null ? ref2 : 'constructor'
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
      arguments: args
    });
  }
};

spreadExpressions = function(node, context) {
  var args, finalParameters, getOffsetFromArgumentsLength, index, j, len, param, ref1, spread, spreadIndex;
  // function rest parameters
  if (isFunctionNode(node)) {
    spread = null;
    spreadIndex = null;
    ref1 = node.params;
    for (index = j = 0, len = ref1.length; j < len; index = ++j) {
      param = ref1[index];
      if (param.type === 'SpreadExpression') {
        spread = param;
        spreadIndex = index;
        break;
      }
    }
    if (spread != null) {
      // replace the spread parameter with a placeholder named parameter
      node.params[spreadIndex] = {
        type: 'Identifier',
        name: "___" + spread.expression.name
      };
      // add a variable that extracts the spread
      args = [
        {
          type: 'Identifier',
          name: 'arguments'
        },
        {
          type: 'Literal',
          value: spreadIndex
        }
      ];
      finalParameters = node.params.length - 1 - spreadIndex;
      if (finalParameters > 0) {
        // add a third arg to the slice that removes the final parameters from the end
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
        // extract the correct values for the final variables.
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
          arguments: args
        }
      });
    }
  }
};

validateTemplateNodes = function(node, context) {
  var ref1;
  if (context.reactive) {
    if (((ref1 = nodes[node.type]) != null ? ref1.allowedInReactive : void 0) === false) {
      throw context.error(node.type + " not allowed in templates", node);
    }
  }
};

removeLocationInfo = function(node) {
  return traverse(node, function(node) {
    var ref1;
    if ((node.loc != null) && !((ref1 = nodes[node != null ? node.type : void 0]) != null ? ref1.location : void 0)) {
      delete node.loc;
    }
    return node;
  });
};

isReferenceNode = function(node, context) {
  var parentNode;
  if (node.type !== 'Identifier') {
    return false;
  }
  parentNode = context.parentNode();
  // ignore function names
  if (isFunctionNode(parentNode)) {
    return false;
  }
  // ignore variable declarations
  if ((parentNode != null ? parentNode.type : void 0) === 'VariableDeclarator' && context.key() === 'id') {
    return false;
  }
  // ignore member expression right hand identifiers
  if ((parentNode != null ? parentNode.type : void 0) === 'MemberExpression' && !(parentNode != null ? parentNode.computed : void 0) && context.key() === 'property') {
    return false;
  }
  // ignore object property keys
  if ((parentNode != null ? parentNode.type : void 0) === 'Property' && context.key() === 'key') {
    return false;
  }
  return true;
};

// gets all identifiers, except member access properties
getReferenceIdentifiers = function(node, callback) {
  var results;
  results = {};
  if (callback == null) {
    callback = function(node) {
      return results[node.name] = node;
    };
  }
  traverse(node, function(node, context) {
    var isRef;
    isRef = isReferenceNode(node, context);
    if (isRef) {
      return callback(node, context);
    }
  });
  return results;
};

// gets all identifiers, except member access properties
getExternalIdentifiers = function(node, callback) {
  getReferenceIdentifiers(node, function(node, context) {
    // ignore internally defined variables
    if (context.getVariableInfo(node.name) != null) {
      return;
    }
    return callback(node, context);
  });
};

wrapTemplateInnerFunctions = function(node, context) {
  var contextId, id, name, requiresWrapper, variables;
  if (context.parentReactive()) {
    if (node.type === 'FunctionExpression' && (node.toLiteral == null)) {
      // see if we need to replace any properties in this function or not.
      variables = {};
      getExternalIdentifiers(node, function(id) {
        var ref1, ref2;
        if (id.name === 'ion' || (id.name !== ((ref1 = node.id) != null ? ref1.name : void 0) && (((ref2 = context.scope()) != null ? ref2.variables[id.name] : void 0) != null))) {
          return variables[id.name] = id;
        }
      });
      requiresWrapper = Object.keys(variables).length > 0;
      if (requiresWrapper) {
        // now convert the node to a new wrapped node
        // add a statement extracting each needed variable from the reactive context
        contextId = context.getNewInternalIdentifier('_context');
        node.body.body.unshift({
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: (function() {
            var results1;
            results1 = [];
            for (name in variables) {
              id = variables[name];
              results1.push({
                type: 'VariableDeclarator',
                id: id,
                init: {
                  type: 'CallExpression',
                  callee: getPathExpression(`${contextId.name}.get`),
                  arguments: [
                    {
                      type: 'Literal',
                      value: id.name
                    }
                  ]
                }
              });
            }
            return results1;
          })()
        });
        node = {
          type: 'FunctionExpression',
          params: [contextId],
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ReturnStatement',
                argument: node
              }
            ]
          }
        };
      }
      node.toLiteral = function() {
        return this;
      };
      return context.replace({
        type: 'Function',
        context: requiresWrapper,
        value: node
      });
    }
  }
};

createTemplateFunctionClone = function(node, context) {
  var inner, newNode, scope;
  if (isFunctionNode(node) && node.template === true) {
    delete node.template;
    node.type = 'Template';
    ensureIonVariable(context);
    newNode = {
      type: 'CallExpression',
      callee: getPathExpression('ion.template'),
      arguments: [node],
      toLiteral: function() {
        return this;
      }
    };
    // if this is an inner template we must wrap it to get the parents scoped variables.
    inner = context.parentReactive();
    if (inner) {
      scope = context.getNewInternalIdentifier('_ps');
      node.scope = scope;
      // replace the node with a function that will be called with context
      newNode = {
        type: 'Function',
        context: true,
        value: {
          type: 'FunctionExpression',
          params: [scope],
          toLiteral: function() {
            return this;
          },
          body: block({
            type: 'ReturnStatement',
            argument: newNode
          })
        }
      };
    }
    return context.replace(newNode);
  }
};

createTemplateRuntime = function(node, context) {
  var args, id, j, k, key, len, len1, name, newNode, params, ref1, ref2, ref3, ref4, referenceIds, template, templateId, value, variables;
  if (node.type === 'Template') {
    template = removeLocationInfo(node);
    templateId = node.id;
    // create an arguments object that contains all the parameter values.
    args = {
      type: 'ObjectExpression',
      properties: []
    };
    variables = {
      this: thisExpression
    };
    // get all reference identifiers
    referenceIds = getReferenceIdentifiers(node);
    ref1 = ['require', 'module', 'exports', 'ion'];
    // if nodejs, add built in ids (but only if we use them)
    for (j = 0, len = ref1.length; j < len; j++) {
      name = ref1[j];
      if (referenceIds[name] != null) {
        variables[name] = {
          type: 'Identifier',
          name: name
        };
      }
    }
    ref2 = template.params;
    for (k = 0, len1 = ref2.length; k < len1; k++) {
      id = ref2[k];
      variables[id.name] = id;
    }
    ref3 = context.scope().variables;
    // also add any variables in scope
    for (key in ref3) {
      value = ref3[key];
      id = value.id;
      variables[id.name] = id;
    }
    for (key in variables) {
      id = variables[key];
      args.properties.push({
        key: id,
        value: id,
        kind: 'init'
      });
    }
    params = template.params;
    // remove the extra blockStatement.
    template.body = template.body.body;
    // delete template.id
    delete template.params;
    delete template.defaults;
    newNode = {
      type: 'FunctionExpression',
      params: params,
      body: {
        type: 'BlockStatement',
        body: [
          {
            type: 'ReturnStatement',
            argument: {
              type: 'CallExpression',
              callee: getPathExpression('ion.createRuntime'),
              arguments: [nodeToLiteral(template),
          args,
          (ref4 = node.scope) != null ? ref4 : nullExpression]
            }
          }
        ]
      }
    };
    if (templateId != null) {
      newNode.id = templateId;
    }
    return context.replace(newNode);
  }
};

javascriptExpressions = function(node, context) {
  var e, errorNode, esprima, expression, message, program, ref1, ref2;
  if (node.type === 'JavascriptExpression') {
    try {
      esprima = require('esprima');
    } catch (error) {
      e = error;
      // no esprima, so lets do a raw node.
      node.type = 'VerbatimExpression';
      node.verbatim = node.text;
      return;
    }
    try {
      program = esprima.parse(node.text);
      expression = program.body[0].expression;
      return context.replace(expression);
    } catch (error) {
      e = error;
      errorNode = ion.clone(node, true);
      if ((ref1 = errorNode.loc) != null) {
        ref1.start.line += e.lineNumber - 1;
      }
      if ((ref2 = errorNode.loc) != null) {
        ref2.start.column += e.column - 1 + "`".length;
      }
      message = e.message.substring(e.message.indexOf(':') + 1).trim();
      throw context.error(message, errorNode);
    }
  }
};

functionDeclarations = function(node, context) {
  var func, ref1, ref2;
  if (node.type === 'VariableDeclaration' && node.kind === 'const' && node.declarations.length === 1 && ((ref1 = node.declarations[0].init) != null ? ref1.type : void 0) === 'FunctionExpression' && ((ref2 = node.declarations[0].init.id) != null ? ref2.name : void 0) === node.declarations[0].id.name) {
    // convert to a FunctionDeclaration for conciseness.
    func = node.declarations[0].init;
    func.type = 'FunctionDeclaration';
    context.replace(func);
  }
  // make sure there are no empty function expression statements
  if (node.type === 'ExpressionStatement' && node.expression.type === 'FunctionExpression') {
    throw context.error('Function Expression is a noop', node);
  }
};

letAndConstToVar = function(node, context) {
  if (node.type === 'VariableDeclaration' && node.kind !== 'var') {
    return node.kind = 'var';
  }
};

activateStatements = function(node, context) {
  if (node.type === 'ActivateStatement') {
    return context.replace({
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            type: 'CallExpression',
            callee: node.argument,
            arguments: []
          },
          property: {
            type: 'Identifier',
            name: 'observe'
          }
        },
        arguments: []
      }
    });
  }
};

hoistVariables = function(node, context) {};

// if node.type is 'BlockStatement' and context.reactive
//     # sort all children, put variables to the top.
//     node.body.sort(
//         (a, b) ->
//             aValue = if a.type is 'VariableDeclaration' then 1 else 0
//             bValue = if b.type is 'VariableDeclaration' then 1 else 0
//             return bValue - aValue
//     )

// hoistES6Variables = (node, context) ->
//     if node.type is 'BlockStatement'
//         es6Vars = []
//         for child in node.body
//             if child.type is 'VariableDeclaration' and child.kind isnt 'var'
//                 es6Vars.push child
//         console.dir es6Vars, {depth: null}
variableDeclarationExpressions = function(node, context) {
  if (node.type === 'VariableDeclarationExpression') {
    // extract the variable declaration statement
    context.addStatement(0, {
      type: 'VariableDeclaration',
      declarations: node.declarations,
      kind: node.kind
    });
    // replace this with a reference to the declared variable
    return context.replace(node.declarations[0].id);
  }
};

addPropertyDeclaration = function(node, context) {
  var parentNode, ref1, temp, tempId;
  if (node.type === 'Property' && node.add) {
    parentNode = context.parentNode();
    if (!(parentNode.type === 'ObjectExpression')) {
      throw context.error("property assignment only valid within ObjectExpression", node);
    }
    temp = context.getVariable({
      prefix: "_" + ((ref1 = node.key.name) != null ? ref1 : "value"),
      init: node.value
    });
    tempId = temp.declarations[0].id;
    // replace with variable declaration
    context.replace(temp);
    // then addition of variable to parent
    context.insertAfter({
      type: 'ExpressionStatement',
      expression: tempId
    });
    // then property assignment to variable
    return context.insertAfter({
      type: 'Property',
      key: node.key,
      value: tempId
    });
  }
};

propertyDefinitions = function(node, context) {
  var def, definitions, j, k, len, len1, property, ref1;
  if (node.type === 'ObjectExpression') {
    // get all properties that have a define
    definitions = null;
    ref1 = node.properties;
    for (j = 0, len = ref1.length; j < len; j++) {
      property = ref1[j];
      if (property.define) {
        if (definitions == null) {
          definitions = [];
        }
        definitions.push(property);
      }
    }
    if (definitions != null) {
// remove from properties
      for (k = 0, len1 = definitions.length; k < len1; k++) {
        def = definitions[k];
        node.properties.remove(def);
        def.define = false;
      }
      return context.replace({
        type: 'CallExpression',
        callee: getPathExpression('Object.defineProperties'),
        arguments: [
          node,
          {
            type: 'ObjectExpression',
            properties: definitions
          }
        ]
      });
    }
  }
};

addOrderPropertyToStatements = function(node, context) {
  var index, j, len, order, ref1, ref2, results1, statement;
  if (node.body || node.properties) {
    ref2 = (ref1 = node.body) != null ? ref1 : node.properties;
    results1 = [];
    for (index = j = 0, len = ref2.length; j < len; index = ++j) {
      statement = ref2[index];
      order = String.fromCharCode(48 + index);
      results1.push(statement.order = order);
    }
    return results1;
  }
};

// console.log("---------> " + order)
globalOptions = {};

exports.postprocess = function(program, options) {
  var enter, exit, j, len, previousContext, steps, traversal, variable;
  steps = [[namedFunctionsAndNewArguments, superExpressions, activateStatements, addPropertyDeclaration, propertyDefinitions], [destructuringAssignments, callFunctionBindForFatArrows], [createTemplateFunctionClone], [javascriptExpressions, arrayComprehensionsToES5, variableDeclarationExpressions, checkVariableDeclarations, hoistVariables], [extractForLoopsInnerAndTest, extractForLoopRightVariable], [extractReactiveForPatterns, validateTemplateNodes, classExpressions], [createForInLoopValueVariable, convertForInToForLength, typedObjectExpressions, propertyStatements, defaultAssignmentsToDefaultOperators], [defaultOperatorsToConditionals, destructuringAssignments], [wrapTemplateInnerFunctions, nodejsModules], [addOrderPropertyToStatements], [existentialExpression, createTemplateRuntime, functionParameterDefaultValuesToES5, patchAssignmentExpression], [addUseStrictAndRequireIon], [nodejsModules, spreadExpressions, assertStatements, functionDeclarations]];
  if ((options != null ? options.target : void 0) === 'es5') {
    steps.push([letAndConstToVar]);
  }
  // else
  //     steps.push [hoistES6Variables]
  previousContext = null;
  for (j = 0, len = steps.length; j < len; j++) {
    traversal = steps[j];
    enter = function(node, context) {
      var handler, k, len1, ref1, results1, step;
      previousContext = context;
      if (context.options == null) {
        context.options = options;
      }
      results1 = [];
      for (k = 0, len1 = traversal.length; k < len1; k++) {
        step = traversal[k];
        if (!(node != null)) {
          continue;
        }
        handler = (ref1 = step.enter) != null ? ref1 : (typeof step === 'function' ? step : null);
        if (handler != null) {
          handler(node, context);
          results1.push(node = context.current());
        } else {
          results1.push(void 0);
        }
      }
      return results1;
    };
    exit = function(node, context) {
      var handler, k, ref1, results1, step;
      results1 = [];
      for (k = traversal.length - 1; k >= 0; k += -1) {
        step = traversal[k];
        if (!(node != null)) {
          continue;
        }
        handler = (ref1 = step.exit) != null ? ref1 : null;
        if (handler != null) {
          handler(node, context);
          results1.push(node = context.current());
        } else {
          results1.push(void 0);
        }
      }
      return results1;
    };
    variable = function(node, context, kind, name) {
      var handler, k, len1, ref1, results1, step;
      results1 = [];
      for (k = 0, len1 = traversal.length; k < len1; k++) {
        step = traversal[k];
        if (!(node != null)) {
          continue;
        }
        handler = (ref1 = step.variable) != null ? ref1 : null;
        if (handler != null) {
          handler(node, context, kind, name);
          results1.push(node = context.current());
        } else {
          results1.push(void 0);
        }
      }
      return results1;
    };
    traverse(program, enter, exit, variable, previousContext);
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