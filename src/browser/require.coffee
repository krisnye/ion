
# define global if needed.
@global ?= do -> @

# require already exists.
return if @require?

# This provides the require function in the browser
require = (path) ->
    originalPath = path
    m = modules[path]
    unless m
        if path[path.length-1] isnt '/'
            path += '/'
        path += "index"
        m = modules[path]
    unless m
        steps = path.replace(/\/index$/, "").split(/\//)
        object = this
        i = 0

        while object? and i < steps.length
            object = object[steps[i]]
            i++
        m = modules[originalPath] = exports: object  if object?
    throw new Error("Couldn't find module for: " + path)  unless m
    unless m.exports
        m.exports = {}
        m.id = path
        m.call this, m, m.exports, resolve(path)
    m.exports

modules = {}
normalize = require.normalize = (curr, path) ->
    segs = curr.split("/")
    seg = undefined
    return path  unless path[0] is "."
    segs.pop()
    path = path.split("/")
    i = 0

    while i < path.length
        seg = path[i]
        if seg is ".."
            segs.pop()
        else segs.push seg  unless seg is "."
        ++i
    segs.join "/"

resolve = (path) ->
    (p) ->
        require normalize(path, p)

require.register = (path, fn) ->
    modules[path] = fn

require.loadAll = ->
    for id of modules
        require id

require.getModuleIds = -> Object.keys modules

require.runTests = (callback) ->
    fn = -> require("ion/browser/tester").runTests(require.getModuleIds(), callback)
    if global.setTimeout?
        setTimeout fn, 0
    else
        fn()

require.compileScripts = ->
    ion = require 'ion'
    compiler = require 'ion/compiler'
    for scriptElement in document.querySelectorAll("script[type=ion]")
        # we wrap all ion scripts to avoid global variable leaks
        compiledWrapper = eval("(function(){ #{compiler.compile(scriptElement.innerHTML)} })")
        # 'this' is the scriptElement within the scripts scope instead of the window
        result = compiledWrapper.call(scriptElement)
        if result?
            if typeof result.template
                template = result.call(scriptElement)
                removeLastResult = null
                template.watch (templateResult) ->
                    removeLastResult?()
                    removeLastResult = null
                    if templateResult?
                        removeLastResult = ion.add scriptElement.parentElement, templateResult
            else
                ion.add scriptElement.parentElement, result

if typeof module is "undefined"
    @require = require
else
    module.exports = require

# since this is the only code guaranteed to run on loading, we also try to compile script tags here.
if global.window?
    window.addEventListener 'load', (e) ->
        require.compileScripts()
