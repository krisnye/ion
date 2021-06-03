import { strict as assert } from "assert"
import { BinaryExpression, Reference, Id, MemberExpression, UnaryExpression, CallExpression, Property } from "../ast"
import toCodeString from "../toCodeString"

assert.deepEqual(
    toCodeString(
        new BinaryExpression({
            left: new MemberExpression({
                object: new Reference({ name: 'a' }),
                property: new Id({ name: 'foo' })
            }),
            operator: '+',
            right: new CallExpression({
                callee: new Reference({ name: 'bar' }),
                arguments: [
                    new Property({
                        value: new UnaryExpression({
                            operator: '-',
                            argument: new Reference({ name: 'b' })
                        })
                    }),
                    new Property({
                        key: new Id({ name: 'alpha' }),
                        value: new Reference({ name: 'c' })
                    })
                ]
            })
        })
    ),
    '(a.foo + bar(-b, alpha:c))'
)
