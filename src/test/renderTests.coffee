ion = require '../'

expressionTests = [
    ["12", {}, 12]
    ["12 + 5", {}, 17]
    [". == 2", {}, false]
    [". == 2", 2, true]
    [".foo.bar", {foo:{bar:3}}, 3]
    ["""
    {}
        foo: 1
        bar: 2
        baz: .x + .y
    """, {x:10,y:20}, {foo:1,bar:2,baz:30}]
    ["""
    {}
        name: "Alpha"
        children:
            Beta: 1
            Charlie: 2
    """, {x:10,y:20}, {name:"Alpha", children: {Beta: 1, Charlie: 2}}]
    ["""
    {}
        even: []
            for .numbers
                if (. & 1) == 0
                    .
        odd: []
            for .numbers
                if (. & 1) == 1
                    .
    """, {numbers:[1,2,3,4,5,6]}, {even:[2,4,6],odd:[1,3,5]}]
    ["""
    {}
        even: .numbers.*{(. & 1) == 0}
        odd: .numbers.*{(. & 1) == 1}
    """, {numbers:[1,2,3,4,5,6]}, {even:[2,4,6],odd:[1,3,5]}]
    ["""
    {}
        alpha:= 1
        beta: alpha
    """, {}, {alpha:1,beta:1}]
    ["""
    {}
        a: $numbers.*{. < 4}
        b: @a.*
    """, {numbers:[1,2,3,4,5,6]}, {a:[1,2,3],b:[1,2,3]}]
    ["""
    {}
        c: $b.sum($a, 2)
    """, {a:1,b:{sum:((a, b) -> a + b + @c),c:10}}, {c:13}]
    ["Math.min(2,1)", null, 1]
    ["""
    {}
        name: $order.name
        items: []
            for $order.items
                {}
                    name: .[0]
                    quantity: .[1]
                    unitPrice: $store.items[@name].price
                    extendedPrice: @unitPrice * @quantity
                    tax: $store.items[@name].taxable ? $store.tax.rate * @extendedPrice : 0
        subtotal: (@items.*.extendedPrice).sum()
        tax: (@items.*.tax).sum()
        total: @subtotal + @tax
    """, {
            store:
                items:
                    apples: { price: 1.00, taxable: true }
                    bananas: { price: 0.50, taxable: true }
                    oranges: { price: 0.75, taxable: false }
                tax:
                    rate: 0.08
            order:
                name: "Joe Shopper"
                items: [
                    ["apples", 4]
                    ["bananas", 3]
                    ["oranges", 1]
                ]
        }, {
            "name": "Joe Shopper",
            "items": [
                {
                    "name": "apples",
                    "quantity": 4,
                    "unitPrice": 1,
                    "extendedPrice": 4,
                    "tax": 0.32
                },
                {
                    "name": "bananas",
                    "quantity": 3,
                    "unitPrice": 0.5,
                    "extendedPrice": 1.5,
                    "tax": 0.12
                },
                {
                    "name": "oranges",
                    "quantity": 1,
                    "unitPrice": 0.75,
                    "extendedPrice": 0.75,
                    "tax": 0
                }
            ],
            "subtotal": 6.25,
            "tax": 0.44,
            "total": 6.69
        }
    ]
]

# we test result expressions when the template is executed immmediately.
exports.test =
    parse: ->
        for [source, input, expected] in expressionTests
            ast = ion.parseExpression source
            e = ion.createRuntime ast, input
            result = null
            watcher = (value) -> result = value
            e.watch watcher
            # console.log source, " -> ", input, " = ", result
            if not Object.equal result, expected
                console.log "-----------------Template--------------"
                console.log source
                console.log "-----------------Result----------------"
                console.log JSON.stringify result, null, '  '
                console.log "-----------------Expected--------------"
                console.log JSON.stringify expected
                # console.log "-----------------AST-------------------"
                # console.log JSON.stringify ast, null, "    "
                console.log "---------------------------------------"
                throw new Error JSON.stringify(result) + " != " + JSON.stringify(expected)
            e.unwatch watcher
        return
