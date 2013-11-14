ion = require '../'

parseTests =
    "12": {"op":"add","args":[12,1]}
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
exports.test =
    parse: ->
        for text, expected of parseTests
            result = ion.parseStatement text
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
