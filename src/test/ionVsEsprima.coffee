
tests = [
    "x"
    "x.y"
    "1 + 2 + 3"
    "1 + 2 * 3"
    "new foo.Bar()[3].x * 3"
    "a ? b : c ? d : e"
    "[]"
    "[1,2,null,foo]"
    "({})"
    "({ })"
    "({foo:bar})"
    "({'foo':'bar'})"
    "({a:1,b:{c:3}})"
    "const x = 2"
    """
    const x = 2
    log(x)
    """
    """
    if (true)
        x
    """
    """
    if (true)
        x()
    else
        y()
    """
    """
    if (true)
        x()
    else if (a)
        y()
    """
    """
    if (true)
        x()
    else if (a)
        y()
    else
        z()
    """
    "({x:1,y:2})"
]

exports.test = ->
    esprima = require 'esprima'
    ion = require '../compiler'

    for test, index in tests
        # we don't compare location information on multiline
        options = {loc:test.indexOf('\n') < 0,raw:false,postprocess:false}
        esprimaResult = esprima.parse(test, options)
        ionResult = ion.parse test, options
        if JSON.stringify(esprimaResult) isnt JSON.stringify(ionResult)
            console.log '-Esprima---------------------------------------------'
            console.log JSON.stringify esprimaResult, null, '  '
            console.log '-Ion-------------------------------------------------'
            console.log JSON.stringify ionResult, null, '  '
            throw new Error "ion.parse(#{test}) was different from esprima.parse(#{})"
        # # if this is the last one, print it out for development
        # if index + 1 is tests.length
        #     console.log '-Ion-------------------------------------------------'
        #     console.log JSON.stringify ionResult, null, '  '
    return
