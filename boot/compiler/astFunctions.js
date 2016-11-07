void (function(){var _ion_compiler_astFunctions_ = function(module,exports,require){'use strict';
var ion = exports.ion = require('../'), addStatement = exports.addStatement = function (node, statement, index, offset) {
        var body = node.body;
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
                var _ref = pattern.properties;
                for (var _i = 0; _i < _ref.length; _i++) {
                    var _ref3 = _ref[_i];
                    var key = _ref3.key;
                    var value = _ref3.value;
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
                var _ref2 = pattern.elements;
                for (var _i2 = 0; _i2 < _ref2.length; _i2++) {
                    var index = _i2;
                    var value = _ref2[_i2];
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
      require.register('ion/compiler/astFunctions',_ion_compiler_astFunctions_);
    else
      _ion_compiler_astFunctions_.call(this, module, exports, require);
  }
  else {
    _ion_compiler_astFunctions_.call(this);
  }
}).call(this)