void (function(){var _compiler_astFunctions_ = function(module,exports,require){'use strict';
const addStatement = exports.addStatement = function (node, statement, index, offset) {
        let body = node.body;
        if (body.type === 'BlockStatement') {
            body = body.body;
        } else if (!Array.isArray(body)) {
            node.body = {
                type: 'BlockStatement',
                body: body = [node.body]
            };
        }
        if (!(index != null)) {
            index = 0;
        } else if (index.type != null) {
            index = body.indexOf(index) + (offset != null ? offset : 1);
        }
        index = Math.max(0, Math.min(index, body.length));
        body.splice(index, 0, statement);
    }, forEachDestructuringAssignment = exports.forEachDestructuringAssignment = function (pattern, expression, callback) {
        if (pattern.type === 'Identifier') {
            callback(pattern, expression);
        } else if (pattern.properties != null) {
            {
                let _ref = pattern.properties;
                for (let _i = 0; _i < _ref.length; _i++) {
                    let _ref3 = _ref[_i];
                    let key = _ref3.key;
                    let value = _ref3.value;
                    forEachDestructuringAssignment(value, {
                        type: 'MemberExpression',
                        object: expression,
                        property: key,
                        computed: key.type !== 'Identifier'
                    }, callback);
                }
            }
        } else if (pattern.elements != null) {
            {
                let _ref2 = pattern.elements;
                for (let _i2 = 0; _i2 < _ref2.length; _i2++) {
                    let index = _i2;
                    let value = _ref2[_i2];
                    forEachDestructuringAssignment(value, {
                        type: 'MemberExpression',
                        object: expression,
                        property: {
                            type: 'Literal',
                            value: index
                        },
                        computed: true
                    }, callback);
                }
            }
        }
    };
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('compiler/astFunctions',_compiler_astFunctions_);
    else
      _compiler_astFunctions_.call(this, module, exports, require);
  }
  else {
    _compiler_astFunctions_.call(this);
  }
}).call(this)