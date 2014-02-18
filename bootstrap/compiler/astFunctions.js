(function(){var _ion_compiler_astFunctions_ = function(module,exports,require){var forEachDestructuringAssignment;

exports.addStatement = function(node, statement, index, offset) {
  var body;
  body = node.body;
  if (body.type === "BlockStatement") {
    body = body.body;
  }
  if (!Array.isArray(body)) {
    node.body = {
      type: "BlockStatement",
      body: body = [node.body]
    };
  }
  if (index == null) {
    index = 0;
  } else if (index.type != null) {
    index = body.indexOf(index) + (offset != null ? offset : 1);
  }
  index = Math.max(0, Math.min(index, body.length));
  return body.splice(index, 0, statement);
};

exports.forEachDestructuringAssignment = forEachDestructuringAssignment = function(pattern, expression, callback) {
  var index, key, value, _i, _j, _ref, _ref1, _ref2, _results, _results1;
  if (pattern.type === 'Identifier') {
    return callback(pattern, expression);
  } else if (pattern.properties != null) {
    _ref = pattern.properties;
    _results = [];
    for (_i = _ref.length - 1; _i >= 0; _i += -1) {
      _ref1 = _ref[_i], key = _ref1.key, value = _ref1.value;
      _results.push(forEachDestructuringAssignment(value, {
        type: 'MemberExpression',
        object: expression,
        property: key,
        computed: key.type !== 'Identifier'
      }, callback));
    }
    return _results;
  } else if (pattern.elements != null) {
    _ref2 = pattern.elements;
    _results1 = [];
    for (index = _j = _ref2.length - 1; _j >= 0; index = _j += -1) {
      value = _ref2[index];
      _results1.push(forEachDestructuringAssignment(value, {
        type: 'MemberExpression',
        object: expression,
        property: {
          type: 'Literal',
          value: index
        },
        computed: true
      }, callback));
    }
    return _results1;
  }
};

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/compiler/astFunctions',_ion_compiler_astFunctions_);
    else
      _ion_compiler_astFunctions_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_astFunctions_.call(this);
  }
}).call(this)