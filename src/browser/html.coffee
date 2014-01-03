
for name in ["div","span","input","a","br","button","caption","fieldset","frame","frameset","h1","h2","h3","h4","h5","h6","hr","legend","menu","option","select","script","pre","table","tbody","td","tr","thead"]
    do (name) ->
        exports[name] = (properties) ->
            element = document.createElement name
            if properties?
                for key, value of properties
                    element[key] = value
            return element

return unless global.window?
exports.test = ->
    compiler = require '../compiler'
    Context = require '../runtime/Context'
    output = document.createElement "div"
    context = new Context exports, output

    s = context.createRuntime ast = compiler.parseStatement """
        $span
            style:
                color: "red"
            "Hello Ion"
        """
    s.activate()

    if (result = output.innerHTML) isnt (expected = '<span style="color: red;">Hello Ion</span>')
        throw new Error "#{result} != #{expected}"

    s.deactivate()
    s.dispose()

    # deactivate should have removed the template content.
    if (result = output.innerHTML) isnt (expected = '')
        throw new Error "#{result} != #{expected}"

    return
