utility = require './utility'
fs = require 'fs'
np = require 'path'

# this doesn't seem to work with Object.observe callbacks
process.on 'uncaughtException', (e) ->
    console.error e

module.exports = exports =
    removeExtension: utility.removeExtension
    changeExtension: utility.changeExtension

    runTests: (manifestFile) ->
        # convert the files to a name, moduleId map
        require('./tester').spawnTests manifestFile

    # this compiles a pegjs parser and returns the result.  Does not write to the target file.
    compilePegjs: (source, target) ->
        return undefined if source.modified < target.modified

        peg = require 'pegjs'
        input = source.read()
        parser = peg.buildParser input, {cache:true,trackLineAndColumn:true}
        source = "module.exports = " + parser.toSource()
        return source

    # this compiles coffeescript if needed, but does not actually write the result.
    compileCoffeeScript: (source, target) ->
        return undefined if source.modified < target.modified

        input = source.read()
        filename = source.path

        cs = require 'coffee-script'
        try
            return cs.compile input
        catch e
            helpers = require 'coffee-script/lib/coffee-script/helpers'
            message = e.message = helpers.prettyErrorMessage e, filename || '[stdin]', input, true
            beep = '\x07'
            console.error message + beep
            return undefined

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
