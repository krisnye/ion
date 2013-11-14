ion = require '../'

expressionTests = [
    ["12", {}, 12]
    ["12 + 5", {}, 17]
    [". == 2", {}, false]
    [". == 2", 2, true]
    ["@foo.bar", {foo:{bar:3}}, 3]
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
        even: []
            for .numbers
                if (. & 1) == 0
                    .
        odd: []
            for .numbers
                if (. & 1) == 1
                    .
    """, {numbers:[1,2,3,4,5,6]}, {even:[2,4,6],odd:[1,3,5]}]
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
            console.log source, " -> ", input, " = ", result
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
