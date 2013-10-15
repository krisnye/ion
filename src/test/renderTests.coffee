ion = require '../'

# temporarily disabled
return

renderTests = [
    ["12", {}, 12]
]

exports.test =
    parse: ->
        for [source, context, expected] in renderTests
            template = ion.template source
            result = template.render context
            if not Object.equal result, expected
                console.log "-----------------Template--------------"
                console.log source
                console.log "-----------------Result----------------"
                console.log JSON.stringify result
                console.log "-----------------Expected--------------"
                console.log JSON.stringify expected
                console.log "---------------------------------------"
                throw new Error JSON.stringify(result) + " != " + JSON.stringify(expected)
        return
