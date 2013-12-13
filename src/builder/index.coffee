return if global.window

utility = require './utility'
fs = require 'fs'
np = require 'path'

# this doesn't seem to work with Object.observe callbacks
process.on 'uncaughtException', (e) ->
    console.error e.stack ? e

module.exports = exports =
    removeExtension: removeExtension = utility.removeExtension
    changeExtension: changeExtension = utility.changeExtension
    normalizePath: normalizePath = (path) -> path.replace /\\/g,"\/"
    runTests: (manifestFile) ->
        # convert the files to a name, moduleId map
        require('./tester').spawnTests manifestFile

    buildScriptIncludeFile: (files, base = '') ->
        files.map((x) -> "document.writeln(\"<script type='text/javascript' src='#{base}#{normalizePath x}'></script>\");").join('\n')

    getModuleId: getModuleId = (source, packageObject) ->
        normalizePath removeExtension np.join packageObject.name, np.relative packageObject.directories.src, source.path

    # this compiles coffeescript if needed, but does not actually write the result.
    compileCoffeeScript: compileCoffeeScript = (source, packageObject) ->
        moduleId = getModuleId source, packageObject

        input = source.read()
        filename = source.path

        cs = require 'coffee-script'
        try
            console.log "Compile: #{filename}"
            compiled = cs.compile input, {bare: true}
            compiled = addBrowserShim compiled, moduleId
            return compiled
        catch e
            helpers = require 'coffee-script/lib/coffee-script/helpers'
            message = e.message = helpers.prettyErrorMessage e, filename || '[stdin]', input, true
            beep = '\x07'
            console.error message + beep
            return

    # this compiles a pegjs parser and returns the result.  Does not write to the target file.
    compilePegjs: compilePegjs = (source, packageObject) ->
        moduleId = getModuleId source, packageObject
        try
            peg = require 'pegjs'
            input = source.read()
            parser = peg.buildParser input, {cache:true,trackLineAndColumn:true}
            source = "module.exports = " + parser.toSource()
            source = addBrowserShim source, moduleId
            return source
        catch e
            console.error e

    shimJavascript: shimJavascript = (source, packageObject) ->
        moduleId = getModuleId source, packageObject
        return addBrowserShim source.read(), moduleId

    addBrowserShim: addBrowserShim = (sourceText, moduleId) ->
        if moduleId?
            safeId = "_" + moduleId.replace(/\//g, '_') + "_"
            sourceText =
                """
                (function(){var #{safeId} = function(module,exports,require){#{sourceText}
                  }
                  if (typeof require === 'function') {
                    if (require.register)
                      require.register('#{moduleId}',#{safeId});
                    else
                      #{safeId}.call(this, module, exports, require);
                  }
                  else {
                    #{safeId}.call(this);
                  }
                }).call(this)
                """
        return sourceText

    buildTemplate: buildTemplate = (source, templateModuleId, forceBuild = true) ->
        # templateModuleId ?= np.relative np.join(process.cwd(), source), require('../runtime/Template').moduleId
        compiler = require '../compiler'
        sourceModified = utility.getModified(source)
        if sourceModified is 0
            throw new Error "Template file not found: #{source}"
        compiledFile = utility.changeExtension source, ".js"
        if forceBuild or utility.getModified(compiledFile) < sourceModified
            source = utility.read source
            ast = compiler.parseStatement source, source
            compiled = compiler.compileTemplate ast, templateModuleId
            utility.write compiledFile, compiled
        return compiledFile

    runTemplate: runTemplate = (path, input, thenExitImmediately) ->
        # use the main module to require this path
        Directory = require './Directory'
        File = require './File'

        TemplateClass = require.main.require buildTemplate path
        input ?= {}
        output = new Directory '.'
        output.add = (x) -> console.log x
        output.remove = ->
        variables = Object.clone(module.exports)
        instance = new TemplateClass input, output, variables
        instance.activate()
        if thenExitImmediately
            instance.dispose()
