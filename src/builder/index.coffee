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
    normalizePath: normalizePath = utility.normalizePath
    minify: minify = (root, files, options) ->
        # we change cwd so uglify maps file names to sources correctly.
        cwd = process.cwd()
        process.chdir root
        try
            return require('uglify-js').minify files, options
        catch e
            throw e
        finally
            process.chdir cwd
    isPrivate: isPrivate = (path) ->
        return false unless path?
        path = normalizePath path
        result = path[0] is '_' or path.indexOf('/_') >= 0
        return result
    link: (object) ->
        # EXISTING_FILE : SYMBOLIC_LINK
        for key, value of object
            if not fs.existsSync key
                console.error "link source not found: #{key}"
                continue
            isDirectory = utility.isDirectory key
            # existing file path needs to be relative to the link path
            existingPath = np.relative value, key
            console.log "link EXISTING: #{existing}  LINK: #{value}"
    compileIonExpressions: compileIonExpressions = (source, id = source) ->
        find = /\bion\((("([^"\\]|\\["\\bnfrt\/]|\\u[0-9a-zA-Z]{4})*")|('([^'\\]|\\['\\bnfrt\/]|\\u[0-9a-zA-Z]{4})*'))\)/g
        return source.replace find, (match, stringLiteral) ->
            string = eval stringLiteral
            compiler = require '../compiler'
            ast = compiler.parseExpression string, id
            return JSON.stringify ast
    runTests: (manifestFile) ->
        # convert the files to a name, moduleId map
        require('../browser/tester').spawnTests manifestFile

    buildScriptIncludeFile: (files, base = '') ->
        files.map((x) -> "document.writeln(\"<script type='text/javascript' src='#{base}#{normalizePath x}'></script>\");").join('\n')

    getModuleId: getModuleId = (source, packageObject) ->
        # new getModuleId behavior
        if typeof source is 'string'
            root = source
            path = packageObject
            return normalizePath removeExtension np.join root, path
        # old getModuleId behavior
        if packageObject?
            return normalizePath removeExtension np.join packageObject.name, np.relative packageObject.directories.src, source.path
        else
            return null

    showPrettyError: showPrettyError = (e, filename, input) ->
        message = e.message = syntaxErrorToString e, filename, input
        beep = '\x07'
        console.error message + beep

    syntaxErrorToString: syntaxErrorToString = (e, filename, code) ->
        return e.toString() unless e.location?
        # lifted from https://github.com/jashkenas/coffee-script/blob/master/src/helpers.coffee
        repeat = (str, n) ->
            # Use clever algorithm to have O(log(n)) string concatenation operations.
            res = ''
            while n > 0
                res += str if n & 1
                n >>>= 1
                str += str
            res
        {first_line, first_column, last_line, last_column} = e.location
        last_line ?= first_line
        last_column ?= first_column

        codeLine = code.split('\n')[first_line]

        start    = first_column
        end      = if first_line is last_line then last_column + 1 else codeLine.length
        marker   = repeat(' ', start) + repeat('^', end - start)

        colorize = (str) -> "\x1B[1;31m#{str}\x1B[0m"
        codeLine = codeLine[...start] + colorize(codeLine[start...end]) + codeLine[end..]
        marker   = colorize marker

        """
        #{filename}:#{first_line + 1}:#{first_column + 1}: error: #{e.originalMessage ? e.message}

        #{codeLine}
        #{marker}
        """

    # this compiles coffeescript if needed, but does not actually write the result.
    compileCoffeeScript: compileCoffeeScript = (source, packageObject) ->
        return if source.modified is 0
        moduleId = if typeof packageObject is 'string' then packageObject else getModuleId source, packageObject

        input = source.read()
        filename = source.path

        cs = require 'coffee-script'
        try
            console.log "Compile: #{filename}"
            compiled = cs.compile input, options = {bare: true}
            # now compile inline ion expressions
            compiled = compileIonExpressions compiled, source.path
            # console.log 'sourceMap: ' + typeof options.sourceMap
            compiled = addBrowserShim compiled, moduleId
            return compiled
        catch e
            showPrettyError e, filename, input
            return

    # this compiles a pegjs parser and returns the result.  Does not write to the target file.
    compilePegjs: compilePegjs = (source, packageObject) ->
        return if source.modified is 0
        moduleId = if typeof  packageObject is 'string' then packageObject else getModuleId source, packageObject
        try
            peg = require 'pegjs'
            input = source.read()
            parser = peg.buildParser input, {cache:true,output:"source"}
            source = "module.exports = " + parser
            source = addBrowserShim source, moduleId
            return source
        catch e
            console.error e

    shimJavascript: shimJavascript = (source, packageObject) ->
        return if source.modified is 0
        moduleId = if typeof  packageObject is 'string' then packageObject else getModuleId source, packageObject
        return addBrowserShim source.read(), moduleId

    addBrowserShim: addBrowserShim = (sourceText, moduleId) ->
        # make sure the javascript isn't already shimmed, so we don't shim it twice.
        if moduleId?
            safeId = "_" + moduleId.replace(/[^a-zA-Z0-9]/g, '_') + "_"
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

    # this compiles a pegjs parser and returns the result.  Does not write to the target file.
    compileTemplate: compileTemplate = (source, packageObject, templateModuleId = "ion/runtime/Template") ->
        return if source.modified is 0
        moduleId = if typeof  packageObject is 'string' then packageObject else getModuleId source, packageObject
        compiler = require '../compiler'
        input = source.read()
        try
            ast = compiler.parseStatement input, source.path
            template = compiler.compileTemplate ast, templateModuleId
            template = addBrowserShim template, moduleId
            return template
        catch e
            showPrettyError e, source.path, input
            return

    runTemplate: runTemplate = (path, input, thenExitImmediately) ->
        # use the main module to require this path
        Directory = require './Directory'
        File = require './File'

        # build the template and write to file
        compiled = compileTemplate new File(path), null, require('../runtime/Template').moduleId
        compiledFile = utility.changeExtension path, ".js"
        utility.write compiledFile, compiled
        templatePath = if compiledFile[0] isnt '.' then './' + compiledFile else compiledFile
        # load template
        TemplateClass = require.main.require templatePath
        # after loading immediately delete the generated .js
        fs.unlinkSync templatePath
        input ?= {}
        output = new Directory '.'
        output.add = ->
        output.remove = ->
        variables = Object.clone(module.exports)
        instance = new TemplateClass input, output, variables
        instance.activate()
        if thenExitImmediately
            instance.dispose()

module.exports.test = ->
    # we break up the expression to prevent it from being replaced by our own compiler.
    result = compileIonExpressions "do(ion" + "('$foo'));"
    if result != expected = 'do({"op":"member","args":[{"op":"output","args":[0]},"foo"]});'
        throw new Error "#{result} != #{expected}"
