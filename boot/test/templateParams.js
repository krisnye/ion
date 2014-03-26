'use strict';
const ion = require('ion');
const firstTemplate = function _template(a, b) {
    if (this != null && this.constructor === _template) {
        return ion.createRuntime({
            type: 'Template',
            body: [{
                    type: 'ReturnStatement',
                    argument: {
                        type: 'BinaryExpression',
                        operator: '+',
                        left: {
                            type: 'Identifier',
                            name: 'a'
                        },
                        right: {
                            type: 'Identifier',
                            name: 'b'
                        }
                    }
                }],
            name: {
                type: 'Identifier',
                name: 'firstTemplate'
            }
        }, {
            a: a,
            b: b
        });
    }
    return a + b;
};
const test = exports.test = function () {
        let template = new firstTemplate(1, 2);
        template.activate();
        let result = null;
        template.watch(function (value) {
            return result = value;
        });
        if (!(result === 3))
            throw new Error('Assertion Failed: (result is 3)');
        template.deactivate();
        if (!(result === void 0))
            throw new Error('Assertion Failed: (result is undefined)');
    };