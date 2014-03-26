'use strict';
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
                    let _ref2 = _ref[_i];
                    let key = _ref2.key;
                    let value = _ref2.value;
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
                let _ref = pattern.elements;
                for (let _i = 0; _i < _ref.length; _i++) {
                    let index = _i;
                    let value = _ref[_i];
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