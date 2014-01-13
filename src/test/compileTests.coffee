return if global.window

index = require '../'
np = require 'path'
fs = require 'fs'

templates =
    "Hello": [
        """
            "Hello " + @name
        """
        {name: "Alpha"}
        ["Hello Alpha"]
    ]
    "new": [
        """
            new Array(3,2,1)
        """
        {name: "Alpha"}
        [[3,2,1]]
    ]
    "UsesHello": [
        """
            Hello = require('./Hello.module')
            for child in @children
                Hello
                    name: child.name
        """
        {children:[{name: "Alpha"},{name:"Beta"}]}
        [null,"Hello Alpha",null,"Hello Beta"]
    ]

exports.test =
    parse: ->
        for file, [text,input,expected] of templates
            ast = index.parseStatement text
            compiled = index.compileTemplate ast, "../runtime/Template"
            path = np.join(__dirname, file) + ".module"
            fs.writeFileSync path, compiled
            # now load the module.
            Template = require path

            template = new Template input, output = [], {require:require}
            template.activate()
            template.dispose()

            if JSON.stringify(output) != JSON.stringify(expected)
                console.log "-----------------Parsing---------------"
                console.log text
                console.log "-----------------Result----------------"
                console.log JSON.stringify output
                console.log "-----------------Expected--------------"
                console.log JSON.stringify expected
                console.log "---------------------------------------"
                throw new Error JSON.stringify(output, null, '  ') + "\n!=\n" + JSON.stringify(expected, null, '  ')
        return
