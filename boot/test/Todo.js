void (function(){var _ion_test_Todo_ = function(module,exports,require){'use strict';
const ion = require('ion');
const _ref = require('ion/browser/html');
let div = _ref.div;
let span = _ref.span;
let input = _ref.input;
let a = _ref.a;
let form = _ref.form;
let table = _ref.table;
let tbody = _ref.tbody;
let thead = _ref.thead;
let tr = _ref.tr;
let td = _ref.td;
let button = _ref.button;
let br = _ref.br;
global.data = {
    name: 'Kris',
    offset: 0,
    kids: {
        Sadera: 18,
        Orion: 15,
        Galileo: 4
    }
};
module.exports = exports = function _template() {
    if (this != null && this.constructor === _template) {
        return ion.createRuntime({
            type: 'Template',
            body: [{
                    type: 'ReturnStatement',
                    argument: {
                        type: 'ObjectExpression',
                        objectType: {
                            type: 'Identifier',
                            name: 'div'
                        },
                        properties: [
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'ObjectExpression',
                                    objectType: {
                                        type: 'Identifier',
                                        name: 'div'
                                    },
                                    properties: [{
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'BinaryExpression',
                                                operator: '+',
                                                left: {
                                                    type: 'Literal',
                                                    value: 'Hello '
                                                },
                                                right: {
                                                    type: 'MemberExpression',
                                                    computed: false,
                                                    object: {
                                                        type: 'Identifier',
                                                        name: 'data'
                                                    },
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'name'
                                                    }
                                                }
                                            }
                                        }]
                                }
                            },
                            {
                                type: 'ExpressionStatement',
                                expression: {
                                    type: 'ObjectExpression',
                                    objectType: {
                                        type: 'Identifier',
                                        name: 'div'
                                    },
                                    properties: [
                                        {
                                            type: 'Property',
                                            key: {
                                                type: 'Identifier',
                                                name: 'style'
                                            },
                                            value: {
                                                type: 'ObjectExpression',
                                                objectType: null,
                                                properties: [{
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'color'
                                                        },
                                                        value: {
                                                            type: 'Literal',
                                                            value: 'red'
                                                        },
                                                        kind: 'init'
                                                    }]
                                            },
                                            kind: 'init'
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'Literal',
                                                value: 'red'
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                type: 'ForInStatement',
                                left: {
                                    type: 'VariableDeclaration',
                                    declarations: [
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'name'
                                            },
                                            init: null
                                        },
                                        {
                                            type: 'VariableDeclarator',
                                            id: {
                                                type: 'Identifier',
                                                name: 'age'
                                            },
                                            init: null
                                        }
                                    ],
                                    kind: 'let'
                                },
                                right: {
                                    type: 'MemberExpression',
                                    computed: false,
                                    object: {
                                        type: 'Identifier',
                                        name: 'data'
                                    },
                                    property: {
                                        type: 'Identifier',
                                        name: 'kids'
                                    }
                                },
                                body: {
                                    type: 'BlockStatement',
                                    body: [{
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'ObjectExpression',
                                                objectType: {
                                                    type: 'Identifier',
                                                    name: 'div'
                                                },
                                                properties: [
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'style'
                                                        },
                                                        value: {
                                                            type: 'ObjectExpression',
                                                            objectType: null,
                                                            properties: [
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'textDecoration'
                                                                    },
                                                                    value: {
                                                                        type: 'Literal',
                                                                        value: 'underline'
                                                                    },
                                                                    kind: 'init'
                                                                },
                                                                {
                                                                    type: 'Property',
                                                                    key: {
                                                                        type: 'Identifier',
                                                                        name: 'cursor'
                                                                    },
                                                                    value: {
                                                                        type: 'Literal',
                                                                        value: 'pointer'
                                                                    },
                                                                    kind: 'init'
                                                                }
                                                            ]
                                                        },
                                                        kind: 'init'
                                                    },
                                                    {
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'onclick'
                                                        },
                                                        value: {
                                                            type: 'Function',
                                                            context: true,
                                                            value: function (_context) {
                                                                return function () {
                                                                    const name = _context.get('name');
                                                                    alert('hello ' + name);
                                                                };
                                                            }
                                                        },
                                                        kind: 'init'
                                                    },
                                                    {
                                                        type: 'ExpressionStatement',
                                                        expression: {
                                                            type: 'BinaryExpression',
                                                            operator: '+',
                                                            left: {
                                                                type: 'BinaryExpression',
                                                                operator: '+',
                                                                left: {
                                                                    type: 'Identifier',
                                                                    name: 'name'
                                                                },
                                                                right: {
                                                                    type: 'Literal',
                                                                    value: ' '
                                                                }
                                                            },
                                                            right: {
                                                                type: 'BinaryExpression',
                                                                operator: '+',
                                                                left: {
                                                                    type: 'Identifier',
                                                                    name: 'age'
                                                                },
                                                                right: {
                                                                    type: 'MemberExpression',
                                                                    computed: false,
                                                                    object: {
                                                                        type: 'Identifier',
                                                                        name: 'data'
                                                                    },
                                                                    property: {
                                                                        type: 'Identifier',
                                                                        name: 'offset'
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        }]
                                }
                            }
                        ]
                    }
                }]
        }, {
            require: require,
            module: module,
            exports: exports,
            _ref: _ref,
            div: div,
            span: span,
            input: input,
            a: a,
            form: form,
            table: table,
            tbody: tbody,
            thead: thead,
            tr: tr,
            td: td,
            button: button,
            br: br
        });
    }
    let _ref3 = new div();
    {
        let _ref4 = new div();
        {
            ion.add(_ref4, 'Hello ' + data.name);
        }
        ion.add(_ref3, _ref4);
        let _ref5 = new div();
        {
            _ref5.style = ion.patch(_ref5.style, { color: 'red' });
            ion.add(_ref5, 'red');
        }
        ion.add(_ref3, _ref5);
        {
            let _ref2 = data.kids;
            for (let name in _ref2) {
                let age = _ref2[name];
                let _ref6 = new div();
                {
                    _ref6.style = ion.patch(_ref6.style, {
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    });
                    _ref6.onclick = function () {
                        alert('hello ' + name);
                    };
                    ion.add(_ref6, name + ' ' + (age + data.offset));
                }
                ion.add(_ref3, _ref6);
            }
        }
    }
    return _ref3;
};
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/test/Todo',_ion_test_Todo_);
    else
      _ion_test_Todo_.call(this, module, exports, require);
  }
  else {
    _ion_test_Todo_.call(this);
  }
}).call(this)