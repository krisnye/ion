index = require '../'

MyTypeCount = 0
MyType = ->
    @count = ++MyTypeCount
    return @
MyType.prototype.getCount = -> @count
MyType.prototype.getTotalCount = -> MyTypeCount

expressionTests = [
    ["12", {}, 12]
    ["12 + 5", {}, 17]
    ["[x * 2 for x in [1,2,3] if x >= 2]", {}, [4,6]]
    ["@ == 2", {}, false]
    ["@ == 2", 2, true]
    ["@foo.bar", {foo:{bar:3}}, 3]
    ["!(1 == 2)", {}, true]
    ["null ? 2", {}, 2]
    ["2 ? null", {}, 2]
    ["false ? 2", {}, false]
    ["[1,2,2+2]", {}, [1,2,4]]
    ["[x * y for x in [1,2,3] for y in [1,2,3]]", {}, [1,2,3,2,4,6,3,6,9]]
    ["/foo/g", {}, /foo/g]
    ["""
    {}
        a['b'].c.d: 1
        ['e']['f']: 2
    """, {}, {a:{b:{c:{d:1}}},e:{f:2}}]
    ["""
    {}
        {a,b:{c:[,,d]},e:[f]} = @
        c: a
        d: d
        e: f
    """, {a:1,b:{c:[1,2,5]},e:[6]}, {c:1,d:5,e:6}]
    ["""
    {}
        [a,,{b}] = @
        c: a
        d: b
    """, [1,2,{b:3}], {c:1,d:3}]
    ["""
    {}
        foo: 1
        bar: 2
        baz: @x + @y
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
        even: [n for n in @numbers if (n & 1) == 0]
        odd: [n for n in @numbers if (n & 1) == 1]
    """, {numbers:[1,2,3,4,5,6]}, {even:[2,4,6],odd:[1,3,5]}]
    ["""
    {}
        even: [n for n in @numbers if (n & 1) == 0]
        odd: [n for n in @numbers if (n & 1) == 1]
    """, {numbers:[1,2,3,4,5,6]}, {even:[2,4,6],odd:[1,3,5]}]
    ["""
    {}
        a: [n for n in @numbers if n < 4]
        b: $a.*
    """, {numbers:[1,2,3,4,5,6]}, {a:[1,2,3],b:[1,2,3]}]
    ["""
    {}
        c: @b.sum(@a, 2)
    """, {a:1,b:{sum:((a, b) -> a + b + @c),c:10}}, {c:13}]
    ["Math.min(2,1)", null, 1]
    ["""
    {}
        name: @order.name
        items: []
            for [name,quantity] in @order.items
                {}
                    name: name
                    quantity: quantity
                    unitPrice: @store.items[$name].price
                    extendedPrice: $unitPrice * $quantity
                    tax: @store.items[$name].taxable ? @store.tax.rate * $extendedPrice : 0
        subtotal: ($items.*.extendedPrice).sum()
        tax: ($items.*.tax).sum()
        total: $subtotal + $tax
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
    # # test subtemplates
    # ["""
    # {}
    #     double = ()
    #         . * 2
    #     a: []
    #         for @numbers
    #             (double .)
    # """, {numbers:[1,2,3,4,5,6]}, {a:[2,4,6,8,10,12]}]
    # # recursive subtemplates
    # ["""
    # {}
    #     age = ()
    #         name: .name
    #         age: .age + 1
    #         if .kids
    #             kids: []
    #                 for .kids
    #                     {}
    #                         (age .)
    #     (age .)
    # """, {name:"Kris",age:41,kids:[{name:"Sadera",age:17,kids:[{name:"Nope",age:0}]},{name:"Orion",age:15}]}, {"name":"Kris","age":42,"kids":[{"name":"Sadera","age":18,"kids":[{"name":"Nope","age":1}]},{"name":"Orion","age":16}]}]
    # # recursive subtemplates with unknown keys
    # ["""
    # {}
    #     double = ()
    #         for .
    #             if .constructor == Object
    #                 (key): {}
    #                     (double .)
    #             else
    #                 (key): . * 2
    #     (double .)
    # """, {a:1,b:{c:2,d:{e:3,f:4}}}, {a:2,b:{c:4,d:{e:6,f:8}}}]
    ["'alphabet'.replace('a','b')", {}, "blphabet"]
    ["@.*.name.replace('a','b')", {one:{name:"andy"},two:{name:"dan"}}, ["bndy","dbn"]]
    ["new @MyType().getCount()", {MyType:MyType}, 1]
    ["""
    {}
        mine = new @MyType()
        count: mine.getCount()

    """, {MyType:MyType}, {count:2}]
]

# # we don't test function definitions on the client side because we ususally don't have a coffescript compiler there.
# if not global.window?
#     expressionTests.push ["""
#         {}
#             double = (x) -> x * 2
#             foo: double .x
#             bar: double .y
#         """, {x:10,y:20}, {foo:20,bar:40}]

# we test result expressions when the template is executed immmediately.
exports.test =
    parse: ->
        for [source, input, expected] in expressionTests
            ast = index.parseExpression source
            e = index.createRuntime ast, input
            result = null
            watcher = (value) -> result = value
            e.watch watcher
            # console.log source, " -> ", input, " = ", result
            if not Object.equal result, expected
                console.log "-----------------Template--------------"
                console.log source
                console.log "-----------------Result----------------"
                console.log JSON.stringify result
                console.log "-----------------Expected--------------"
                console.log JSON.stringify expected
                console.log "-----------------AST-------------------"
                console.log JSON.stringify ast, null, "    "
                console.log "---------------------------------------"
                throw new Error JSON.stringify(result) + " != " + JSON.stringify(expected)
            e.unwatch watcher
        return
