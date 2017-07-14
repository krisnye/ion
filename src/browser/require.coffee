#!browser

do ->

    # define global if needed.
    @global ?= do -> @

    # require already exists.
    return if @require?

    used = {}

    # This provides the require function in the browser
    require = (path) ->
        if path is 'ion/browser/require'
            return require

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
        throw new Error("Couldn't find module for: " + path) unless m
        unless m.exports
            m.exports = {}
            m.id = path
            m.call this, m, m.exports, resolve(path)
        used[path] = true # mark as used
        m.exports

    modules = {}

    require.getUnusedIds = ->
        results = []
        for key of modules
            if not used[key]
                results.push(key)
        return results

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

    # this may cache compiled files in session for performance.
    getCompiledCode = (scriptElement) ->
        source = scriptElement.innerHTML
        # check session storage if we've already compiled this script.
        compiledCode = sessionStorage.getItem(source)
        if not compiledCode?
            console.log('checking source code, didnt find it, so compiling')
            compiler = require 'ion/compiler'
            compiledCode = compiler.compile(source)
            sessionStorage.setItem(source, compiledCode)
        return compiledCode

    require.compileScripts = ->
        ion = require 'ion'
        for scriptElement in document.querySelectorAll("script[type=ion]")
            # we wrap all ion scripts to avoid global variable leaks
            compiledCode = getCompiledCode(scriptElement)
            compiledWrapper = eval("(function(){ #{compiledCode} })")
            # 'this' is the scriptElement within the scripts scope instead of the window
            result = compiledWrapper.call(scriptElement)
            if result?
                if typeof result.template
                    template = result.call(scriptElement)
                    removeLastResult = null
                    template.observe (templateResult) ->
                        removeLastResult?()
                        removeLastResult = null
                        if templateResult?
                            container = scriptElement.parentElement
                            if global.Polymer
                                container = Polymer.dom(container)
                            container.appendChild(templateResult)
                            removeLastResult = -> scriptElement.parentElement.removeChild(templateResult)
                else
                    scriptElement.parentElement.appendChild(document.createTextNode(result))
        ion.sync()

    if typeof module is "undefined"
        @require = require
    else
        module.exports = require

    # since this is the only code guaranteed to run on loading, we also try to compile script tags here.
    if global.window?
        loaded = false
        ensureLoaded = ->
            if not loaded
                loaded = true
                require.compileScripts()
        window.addEventListener 'load', ensureLoaded
        window.addEventListener 'WebComponentsReady', ensureLoaded
