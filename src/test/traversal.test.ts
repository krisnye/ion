import { strict as assert } from "assert"
import * as t from "../Traversal";

class MyNode {
    value: number
    children: MyNode[]
    constructor({value, children = []}: { value: number, children?: MyNode[] }) {
        this.value = value
        this.children = children
    }
}

(function testEnterLeaveOrderAndFilteringOutOfArray() {
    let root = [
        new MyNode({ value: 1 }),
        new MyNode({ value: 2 }),
        new MyNode({ value: 3 })
    ]
    let order: number[] = []
    let result = t.traverse(root, {
        enter(node) {
            order.push(node.value)
        },
        leave(node) {
            order.push(-node.value)
        }
    })
    assert.deepEqual(order, [1, -1, 2, -2, 3, -3])
})();

(function testChildrenPreOrder() {
    let root = [
        new MyNode({ value: 1, children: [new MyNode({ value: 11 }), new MyNode({ value: 12 }) ]}),
        new MyNode({ value: 2, children: [new MyNode({ value: 21 }), new MyNode({ value: 22 }) ]}),
        new MyNode({ value: 3, children: [new MyNode({ value: 31 }), new MyNode({ value: 32 }) ]}),
    ]

    let order: number[] = []
    let result = t.traverse(root, {
        enter(node) {
            order.push(node.value)
        },
        leave(node) {
            order.push(-node.value)
        }
    })
    assert.deepEqual(order, [
        1, 11, -11, 12, -12, -1,
        2, 21, -21, 22, -22, -2,
        3, 31, -31, 32, -32, -3
    ])
})();

(function testSkippingChildren() {
    let root = [
        new MyNode({ value: 1, children: [new MyNode({ value: 11 }), new MyNode({ value: 12 }) ]}),
        new MyNode({ value: 2, children: [new MyNode({ value: 21 }), new MyNode({ value: 22 }) ]}),
        new MyNode({ value: 3, children: [new MyNode({ value: 31 }), new MyNode({ value: 32 }) ]}),
    ]

    let order: number[] = []
    let result = t.traverse(root, {
        enter(node) {
            order.push(node.value)
            if (node.value === 2) {
                return t.skip
            }
        },
        leave(node) {
            order.push(-node.value)
        }
    })
    assert.deepEqual(order, [
        1, 11, -11, 12, -12, -1,
        2, -2,
        3, 31, -31, 32, -32, -3
    ])
})();

(function testArrayRemoval() {
    let root = [
        new MyNode({ value: 1, children: [new MyNode({ value: 11 }), new MyNode({ value: 12 }) ]}),
        new MyNode({ value: 2, children: [new MyNode({ value: 21 }), new MyNode({ value: 22 }) ]}),
        new MyNode({ value: 3, children: [new MyNode({ value: 31 }), new MyNode({ value: 32 }) ]}),
    ]

    let result = t.traverse(root, {
        leave(node) {
            if (node.value.toString().indexOf("1") >= 0) {
                return t.remove
            }
        }
    })
    assert.deepEqual(
        result,
        [
            new MyNode({ value: 2, children: [new MyNode({ value: 22 }) ]}),
            new MyNode({ value: 3, children: [new MyNode({ value: 32 }) ]}),
        ]
    )
})();

(function testArrayInsertion() {
    let root = [
        new MyNode({ value: 1, children: [new MyNode({ value: 11 }), new MyNode({ value: 12 }) ]}),
        new MyNode({ value: 2, children: [new MyNode({ value: 21 }), new MyNode({ value: 22 }) ]}),
        new MyNode({ value: 3, children: [new MyNode({ value: 31 }), new MyNode({ value: 32 }) ]}),
    ]

    let result = t.traverse(root, {
        leave(node) {
            if (node.value === 2) {
                return t.replace(new MyNode({ value: 201 }), new MyNode({ value: 202 }))
            }
        },
        skip(node) {
            // have to tell it not to skip objects since it does by default
            return false
        }
    })
    // we stringify to make sure the order is as specified as well
    assert.deepEqual(
        result,
        [
            new MyNode({ value: 1, children: [new MyNode({ value: 11 }), new MyNode({ value: 12 }) ]}),
            new MyNode({ value: 201 }),
            new MyNode({ value: 202 }),
            new MyNode({ value: 3, children: [new MyNode({ value: 31 }), new MyNode({ value: 32 }) ]}),
        ]
    )
})();

(function testObjectRemoval() {
    let root = {
        a: new MyNode({ value: 1, children: [new MyNode({ value: 11 }), new MyNode({ value: 12 }) ]}),
        b: new MyNode({ value: 2, children: [new MyNode({ value: 21 }), new MyNode({ value: 22 }) ]}),
        c: new MyNode({ value: 3, children: [new MyNode({ value: 31 }), new MyNode({ value: 32 }) ]}),
    }

    let result = t.traverse(root, {
        leave(node) {
            if (node.value === 2) {
                return t.remove
            }
        },
        skip(node) {
            // have to tell it not to skip objects since it does by default
            return false
        }
    })
    assert.deepEqual(
        result,
        {
            a: new MyNode({ value: 1, children: [new MyNode({ value: 11 }), new MyNode({ value: 12 }) ]}),
            c: new MyNode({ value: 3, children: [new MyNode({ value: 31 }), new MyNode({ value: 32 }) ]}),
        }
    )
})();

(function testObjectInsertion() {
    let root = {
        a: new MyNode({ value: 1, children: [new MyNode({ value: 11 }), new MyNode({ value: 12 }) ]}),
        b: new MyNode({ value: 2, children: [new MyNode({ value: 21 }), new MyNode({ value: 22 }) ]}),
        c: new MyNode({ value: 3, children: [new MyNode({ value: 31 }), new MyNode({ value: 32 }) ]}),
    }

    let result = t.traverse(root, {
        leave(node) {
            if (node.value === 2) {
                return t.replace(
                    t.pair("b1", new MyNode({ value: 201 })),
                    t.pair("b2", new MyNode({ value: 202 }))
                )
            }
        },
        skip(node) {
            // have to tell it not to skip objects since it does by default
            return false
        }
    })
    // we stringify to make sure the order is as specified as well
    assert.deepEqual(
        JSON.stringify(result),
        JSON.stringify({
            a: new MyNode({ value: 1, children: [new MyNode({ value: 11 }), new MyNode({ value: 12 }) ]}),
            b1: new MyNode({ value: 201 }),
            b2: new MyNode({ value: 202 }),
            c: new MyNode({ value: 3, children: [new MyNode({ value: 31 }), new MyNode({ value: 32 }) ]}),
        })
    )
})();

(function testMapRemoval() {
    let root = new Map([
        ["a", new MyNode({ value: 1, children: [new MyNode({ value: 11 }), new MyNode({ value: 12 }) ]})],
        ["b", new MyNode({ value: 2, children: [new MyNode({ value: 21 }), new MyNode({ value: 22 }) ]})],
        ["c", new MyNode({ value: 3, children: [new MyNode({ value: 31 }), new MyNode({ value: 32 }) ]})],
    ])

    let result = t.traverse(root, {
        leave(node) {
            if (node.value === 2) {
                return t.remove
            }
        }
    })
    assert.deepEqual(
        result,
        new Map([
            ["a", new MyNode({ value: 1, children: [new MyNode({ value: 11 }), new MyNode({ value: 12 }) ]})],
            ["c", new MyNode({ value: 3, children: [new MyNode({ value: 31 }), new MyNode({ value: 32 }) ]})],
        ])
    )
})();

(function testMapInsertion() {
    let root = new Map([
        ["a", new MyNode({ value: 1, children: [new MyNode({ value: 11 }), new MyNode({ value: 12 }) ]})],
        ["b", new MyNode({ value: 2, children: [new MyNode({ value: 21 }), new MyNode({ value: 22 }) ]})],
        ["c", new MyNode({ value: 3, children: [new MyNode({ value: 31 }), new MyNode({ value: 32 }) ]})],
    ])

    let result = t.traverse(root, {
        leave(node) {
            if (node.value === 2) {
                return t.replace(
                    t.pair("b1", new MyNode({ value: 201 })),
                    t.pair("b2", new MyNode({ value: 202 }))
                )
            }
        }
    })
    // we stringify to make sure the order is as specified as well
    assert.deepEqual(
        result,
        new Map([
            ["a", new MyNode({ value: 1, children: [new MyNode({ value: 11 }), new MyNode({ value: 12 }) ]})],
            ["b1", new MyNode({ value: 201 })],
            ["b2", new MyNode({ value: 202 })],
            ["c", new MyNode({ value: 3, children: [new MyNode({ value: 31 }), new MyNode({ value: 32 }) ]})],
        ])
    )
})();
