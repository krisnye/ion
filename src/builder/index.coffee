return if global.window

_ = require 'underscore' # imported for debounce/throttle methods
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
    runIonFile: (file) ->
        src = fs.readFileSync(file, 'utf8')
        js = require('../compiler').compile(src)
        eval(js)
    runTests: do ->
        fn = (manifestFile) ->
            # convert the files to a name, moduleId map
            require('../browser/tester').spawnTests manifestFile
        return _.debounce(_.throttle(fn, 100), 2000)

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
        filename = source.path
        try
            peg = require 'pegjs'
            console.log "Building: #{filename}"
            input = source.read()
            parser = peg.buildParser input, {cache:true,output:"source"}
            source = "module.exports = " + parser
            source = addBrowserShim source, moduleId
            return source
        catch e
            console.error e

    compileIon: compileIon = (source, packageObject) -> compileIonWithSourceMap(source, packageObject)?[0]

    # this compiles ion and returns the result.  Does not write to the target file.
    compileIonWithSourceMap: compileIonWithSourceMap = (source, packageObject) ->
        if source.modified is 0
            return
        moduleId = if typeof  packageObject is 'string' then packageObject else getModuleId source, packageObject
        filename = source.path
        try
            console.log "Compile: #{filename}"
            ionCompiler = require '../compiler'
            input = source.read()
            [source,map] = ionCompiler.compileWithSourceMap(input, {id:filename,sourceMap:filename.split(/[\/\\]/).pop()})
            source = addBrowserShim source, moduleId
            return [source,map]
        catch e
            console.error(String(e))

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
                void (function(){var #{safeId} = function(module,exports,require){#{sourceText}
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
