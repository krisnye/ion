index = require '../'

parseTests =
    "12": {"op":"add","args":[12,1]}
    "{a,b} = c": {"op":"block","args":[{"op":"var","args":["% -1",{"op":"ref","args":["c"]}]},{"op":"var","args":["a",{"op":"member","args":[{"op":"ref","args":["% -1"]},"a"]}]},{"op":"var","args":["b",{"op":"member","args":[{"op":"ref","args":["% -1"]},"b"]}]}]}
    "[a,b] = c": {"op":"block","args":[{"op":"var","args":["% -1",{"op":"ref","args":["c"]}]},{"op":"var","args":["a",{"op":"member","args":[{"op":"ref","args":["% -1"]},0]}]},{"op":"var","args":["b",{"op":"member","args":[{"op":"ref","args":["% -1"]},1]}]}]}
    # "new $MyType().getCount()": null
    "foo bar": {"op":"add","args":[{"op":"call","args":[{"op":"ref","args":["foo"]},null,{"op":"ref","args":["bar"]}]},1]}
    "1\n2\n": {op:"block", args:[{"op":"add","args":[1,1]}, {"op":"add","args":[2,2]}]}
    "if true\n    1\nelse\n    2\n": {
            "op": "if",
            "args": [
                true,
                {
                    "op": "add",
                    "args": [1,1]
                },
                {
                    "op": "add",
                    "args": [2,2]
                }
            ]
        }
    "foo": {"op":"add","args":[{op: 'ref',args: ['foo']}, 1]}
    "Person\n    name: \"Kris\"": {"op":"add","args":[{"op":"object","args":[{"op":"ref","args":["Person"]},{"op":"set","args":["name","Kris"]}]},1]}
    "foo * 2": {"op":"add","args":[{"op":"*","args":[{"op":"ref","args":["foo"]},2]},1]}
    "Person\n    name: \"Kris\"\n    poem: \"\"\n        There once was a doctor from Mactus\n        who liked operating on cactus.\n        He had ants on his pants\n        after doing transplants\n        and finally got sued for malpractice.\n":
            {"op":"add","args":[{"op":"object","args":[{"op":"ref","args":["Person"]},{op:"block",args:[{"op":"set","args":["name","Kris"]},{"op":"set","args":["poem","There once was a doctor from Mactus\nwho liked operating on cactus.\nHe had ants on his pants\nafter doing transplants\nand finally got sued for malpractice."]}]}]},1]}
    ".*": {"op":"add","args":[{"op":"object","args":[{"op":"member","args":[{"op":"global","args":[]},"Array"]},{"op":"for","args":[{"op":"input","args":[0]},{"op":"add","args":[{"op":"input","args":[0]}]}]}]},1]}
    "..*": {"op":"add","args":[{"op":"object","args":[{"op":"member","args":[{"op":"global","args":[]},"Array"]},{"op":"for","args":[{"op":"input","args":[1]},{"op":"add","args":[{"op":"input","args":[0]}]}]}]},1]}
    "...*": {"op":"add","args":[{"op":"object","args":[{"op":"member","args":[{"op":"global","args":[]},"Array"]},{"op":"for","args":[{"op":"input","args":[2]},{"op":"add","args":[{"op":"input","args":[0]}]}]}]},1]}
    """
    []
        for .
            .name
    """: {"op":"add","args":[{"op":"object","args":[{"op":"member","args":[{"op":"global","args":[]},"Array"]},{"op":"for","args":[{"op":"input","args":[0]},{"op":"add","args":[{"op":"member","args":[{"op":"input","args":[0]},"name"]}]},null,null]}]},1]}
    "foo := 5": {"op":"block","args":[{"op":"var","args":["foo",5]},{"op":"set","args":["foo",{"op":"ref","args":["foo"]}]}]}
    "foo.(.x + .y)": {"op":"add","args":[{"op":"local","args":[{"op":"ref","args":["foo"]},{"op":"+","args":[{"op":"member","args":[{"op":"input","args":[0]},"x"]},{"op":"member","args":[{"op":"input","args":[0]},"y"]}]}]},1]}
    """
    subtemplate = ()
        x: 1
        y: 2
    (subtemplate)
    """: {"op":"block","args":[{"op":"var","args":["subtemplate",{"op":"templateDef","args":[{"op":"block","args":[{"op":"set","args":["x",1]},{"op":"set","args":["y",2]}]}]}]},{"op":"templateApply","args":["subtemplate"]}]}

exports.test =
    parse: ->
        for text, expected of parseTests
            result = index.parseStatement text
            if JSON.stringify(result) != JSON.stringify(expected)
                console.log "-----------------Parsing---------------"
                console.log text
                console.log "-----------------Result----------------"
                console.log JSON.stringify result
                console.log "-----------------Expected--------------"
                console.log JSON.stringify expected
                console.log "---------------------------------------"
                throw new Error JSON.stringify(result, null, '  ') + "\n!=\n" + JSON.stringify(expected, null, '  ')
        return
