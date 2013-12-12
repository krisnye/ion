return if global.window

utility = require './utility'
fs = require 'fs'
np = require 'path'

# this doesn't seem to work with Object.observe callbacks
process.on 'uncaughtException', (e) ->
    console.error e

module.exports = exports =
    removeExtension: utility.removeExtension
    changeExtension: utility.changeExtension
    normalizePath: normalizePath = (path) -> path.replace /\\/g,"\/"
    runTests: (manifestFile) ->
        # convert the files to a name, moduleId map
        require('./tester').spawnTests manifestFile

    buildScriptIncludeFile: (files, base = '') ->
        files.map((x) -> "document.writeln(\"<script type='text/javascript' src='#{base}#{normalizePath x}'></script>\");").join('\n')

    # this compiles a pegjs parser and returns the result.  Does not write to the target file.
    compilePegjs: compilePegjs = (source, target, moduleId, packageFile) ->
        try
            # return undefined if source.modified < target.modified and (packageFile?.modified ? 0) <= target.modified

            peg = require 'pegjs'
            input = source.read()
            parser = peg.buildParser input, {cache:true,trackLineAndColumn:true}
            source = "module.exports = " + parser.toSource()
            source = addBrowserShim source, moduleId

            return source
        catch e
            console.error e

    copyJavascript: copyJavascript = (source, target, moduleId, packageFile) ->
        return undefined if source.modified < target.modified and (packageFile?.modified ? 0) < target.modified
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

    # this compiles coffeescript if needed, but does not actually write the result.
    compileCoffeeScript: compileCoffeeScript = (sourceFile, targetFile, moduleId, packageFile) ->
        return undefined if sourceFile.modified < targetFile.modified and (packageFile?.modified ? 0) < targetFile.modified

        input = sourceFile.read()
        filename = sourceFile.path

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

    buildTemplate: buildTemplate = (sourceFile, templateModuleId, forceBuild = true) ->
        # templateModuleId ?= np.relative np.join(process.cwd(), sourceFile), require('../runtime/Template').moduleId
        compiler = require '../compiler'
        sourceModified = utility.getModified(sourceFile)
        if sourceModified is 0
            throw new Error "Template file not found: #{sourceFile}"
        compiledFile = utility.changeExtension sourceFile, ".js"
        if forceBuild or utility.getModified(compiledFile) < sourceModified
            source = utility.read sourceFile
            ast = compiler.parseStatement source, sourceFile
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
