'use strict';
const ion = require('../');
const templates = [
        [
            'array comprehension',
            function _template(properties) {
                if (this != null && this.constructor === _template) {
                    return ion.createRuntime({
                        type: 'Template',
                        body: [{
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'ObjectExpression',
                                    objectType: {
                                        type: 'ArrayExpression',
                                        elements: []
                                    },
                                    properties: [{
                                            type: 'ForInStatement',
                                            left: {
                                                type: 'VariableDeclaration',
                                                declarations: [{
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'key'
                                                        },
                                                        init: null
                                                    }],
                                                kind: 'let'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'properties'
                                            },
                                            body: {
                                                type: 'ExpressionStatement',
                                                expression: {
                                                    type: 'Identifier',
                                                    name: 'key'
                                                }
                                            }
                                        }]
                                }
                            }]
                    }, { properties: properties });
                }
                let _ref = [];
                for (let key in properties)
                    _ref.push(key);
                return _ref;
            },
            {
                a: 1,
                b: 2
            },
            {
                b: null,
                c: 3
            },
            [
                'a',
                'c'
            ]
        ],
        [
            'imperative functions',
            function _template(properties) {
                if (this != null && this.constructor === _template) {
                    return ion.createRuntime({
                        type: 'Template',
                        body: [
                            {
                                type: 'VariableDeclaration',
                                kind: 'const',
                                declarations: [{
                                        type: 'VariableDeclarator',
                                        id: {
                                            type: 'Identifier',
                                            name: 'double'
                                        },
                                        init: function double(a) {
                                            return a * 2;
                                        }
                                    }]
                            },
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'ObjectExpression',
                                    objectType: {
                                        type: 'ObjectExpression',
                                        properties: []
                                    },
                                    properties: [{
                                            type: 'ForInStatement',
                                            left: {
                                                type: 'VariableDeclaration',
                                                declarations: [
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'key'
                                                        },
                                                        init: null
                                                    },
                                                    {
                                                        type: 'VariableDeclarator',
                                                        id: {
                                                            type: 'Identifier',
                                                            name: 'value'
                                                        },
                                                        init: null
                                                    }
                                                ],
                                                kind: 'let'
                                            },
                                            right: {
                                                type: 'Identifier',
                                                name: 'properties'
                                            },
                                            body: {
                                                type: 'BlockStatement',
                                                body: [{
                                                        type: 'Property',
                                                        key: {
                                                            type: 'Identifier',
                                                            name: 'key'
                                                        },
                                                        value: {
                                                            type: 'CallExpression',
                                                            callee: {
                                                                type: 'Identifier',
                                                                name: 'double'
                                                            },
                                                            arguments: [{
                                                                    type: 'Identifier',
                                                                    name: 'value'
                                                                }]
                                                        },
                                                        kind: 'init',
                                                        computed: true
                                                    }]
                                            }
                                        }]
                                }
                            }
                        ]
                    }, { properties: properties });
                }
                function double(a) {
                    return a * 2;
                }
                let _ref = {};
                for (let key in properties) {
                    let value = properties[key];
                    _ref[key] = double(value);
                }
                return _ref;
            },
            {
                x: 1,
                y: 2
            },
            {
                x: 4,
                z: 3
            },
            {
                x: 8,
                y: 4,
                z: 6
            }
        ]
    ];
let _ref = {};
for (let _i = 0; _i < templates.length; _i++) {
    let _ref2 = templates[_i];
    let name = _ref2[0];
    let templateType = _ref2[1];
    let argument = _ref2[2];
    let patch = _ref2[3];
    let expected = _ref2[4];
    if (expected != null) {
        _ref[name] = function (templateType, argument, patch, expected) {
            return function (done) {
                let template = new templateType(argument);
                template.activate();
                template.watch(function (value) {
                    ion.observe(value, function (changes) {
                        console.log(value);
                        if (JSON.stringify(value) === JSON.stringify(expected)) {
                            template.deactivate();
                            done();
                        }
                    });
                });
                ion.patch(argument, patch);
            };
        }(templateType, argument, patch, expected);
    }
}
module.exports = exports = { test: _ref };