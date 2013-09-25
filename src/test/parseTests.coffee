ion = require '../'

parseTests =
    "12": [12]
    "foo": [op: 'ref',args: ['foo']]
    "foo.bar": [{"op": "get","args": [{"op": "ref","args": ["foo"]},"bar"]}]
    "": []
    """

    """: []
    "\"foo\"": ["foo"]
    """
    ""
        indented string
            here.
    """: ["indented string\n    here."]
    """
    Person
        name: "Kris"
    """: [{"op":"object","args":[{"op":"ref","args":["Person"]},[{"op":":","args":["name","Kris"]}]]}]
    """
    Person
        name: "Kris"
        poem: ""
            There once was a doctor from Mactus
            who liked operating on cactus.
            He had ants on his pants
            after doing transplants
            and finally got sued for malpractice.
    """: [{"op":"object","args":[{"op":"ref","args":["Person"]},[{"op":":","args":["name","Kris"]},{"op":":","args":["poem","There once was a doctor from Mactus\nwho liked operating on cactus.\nHe had ants on his pants\nafter doing transplants\nand finally got sued for malpractice."]}]]}]
    "foo * 2": [{"op":"*","args":[{"op":"ref","args":["foo"]},2]}]
exports.test =
    parse: ->
        for text, expected of parseTests
            result = ion._parse text
            if JSON.stringify(result) != JSON.stringify(expected)
                console.log "-----------------Parsing---------------"
                console.log text
                console.log "-----------------Result----------------"
                console.log JSON.stringify result
                console.log "-----------------Expected--------------"
                console.log JSON.stringify expected
                console.log "---------------------------------------"
                throw new Error JSON.stringify(result) + " != " + JSON.stringify(expected)
        return
