ion = require '../'
index = require '../compiler'

tests =
    """
    let x = 10
    """: """
    'use strict';
    var x = 10;
    """
    """
    let x = 10
    if foo
        let y = 20
    if bar
        const y = 30
    """: """
    'use strict';
    var x = 10;
    if (foo) {
        var y = 20;
    }
    if (bar) {
        var y = 30;
    }
    """

if global.window?
    return

exports.test = ->
    for input, expected of tests
        options = {target:'es5'}
        if expected is null
            console.log '---------------------------------------------------'
            console.log JSON.stringify index.compile(input, ion.patch({postprocess:false}, options)), null, '  '
            console.log '-Postprocessed-------------------------------------'
            console.log JSON.stringify index.compile(input, ion.patch({generate:false}, options)), null, '  '
            console.log '---------------------------------------------------'
            console.log index.compile input, ion.patch({loc:false}, options)
        else if typeof expected is 'object'
            # expected to throw an error
            error = null
            try
                index.compile input, options
            catch e
                error = e
                # check equivalent fields
                for key, value of expected
                    if value isnt e[key]
                        throw new Error "\n#{JSON.stringify e}\n!=\n#{JSON.stringify expected}"
            if not error?
                throw new Error "Expected an error: #{JSON.stringify expected}"
        else
            output = index.compile input, options
            if output.trim() isnt expected.trim()
                console.log '-Output---------------------------------------------'
                console.log output
                throw new Error "\n#{output}\n!=\n#{expected}"
    return
