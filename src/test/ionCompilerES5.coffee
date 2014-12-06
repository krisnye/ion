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
    """
    export class StampFilter
        stamp: (key, object) ->
            for name, property of key.type.properties if property.stamp
                log(name)
    """: """
    'use strict';
    var ion = require('ion');
    var StampFilter = ion.defineClass({
            name: 'StampFilter',
            stamp: function (key, object) {
                {
                    var _ref = key.type.properties;
                    for (var name in _ref) {
                        var property = _ref[name];
                        if (property.stamp) {
                            log(name);
                        }
                    }
                }
            }
        });
    module.exports = exports = StampFilter;
    """
    """
    let element =
        (body: 2)
    """: """
    'use strict';
    var ion = require('ion');
    var element = {};
    {
        var _body = 2;
        element.body = _body;
        ion.add(element, _body);
    }
    """
    """
    (foo: bar)
        x: 1
    """: {line:1, column:2}
    """
    let foo = bar(
        1
        2
    )
    .toString(
        "12"
    )
    .split(' ')
    """: """
    'use strict';
    var foo = bar(1, 2).toString('12').split(' ');
    """

if global.window?
    return

exports.test = ->
    for input, expected of tests
        options = {target:'es5'}
        if expected is null
            console.log '---------------------------------------------------'
            console.log JSON.stringify index.compile(input, ion.patch({postprocess:false,loc:true}, options)), null, '  '
            console.log '-Postprocessed-------------------------------------'
            console.log JSON.stringify index.compile(input, ion.patch({generate:false,loc:true}, options)), null, '  '
            console.log '---------------------------------------------------'
            console.log index.compile input, ion.patch({loc:true,source:'ionCompilerES5.js'}, options)
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
