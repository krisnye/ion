return if global.window

require '../sugar'
fs = require 'fs'
np = require 'path'
cp = require 'child_process'

isWindows = process.platform is 'win32'
fixCommand = (command) ->
    if not isWindows
        command = command.replace /\.cmd\b/, ""
    command

module.exports = exports =
    spawn: spawn = (command, options, callback) ->
        originalCommand = command
        return callback?() unless command?
        command = fixCommand command
        if typeof options is 'function'
            callback = options
            options = null
        options ?= {}
        options.stdio ?= 'inherit'
        args = command.split /\s+/
        command = args.shift()
        try
            child = cp.spawn command, args, options
            child.on 'exit', callback if callback?
            child.on 'error', (error) ->
                console.log "Error running #{originalCommand}\n#{error}"
                callback?()
        catch e
            console.log originalCommand
            throw e
        return child
    exec: exec = (command, options, callback) ->
        originalCommand = command
        return callback?() unless command?
        command = fixCommand command
        if typeof options is 'function'
            callback = options
            options = null
        options ?= {}
        try
            cp.exec command, options, (err, stdout, stderr) ->
                console.log err if err?
                console.log stdout.toString() if stdout?
                console.log stderr.toString() if stderr?
                callback?()
        catch e
            console.log originalCommand
            throw e
    copyMetadata: copyMetadata = (source, target) ->
        for file in ["package.json", "README.md"]
            from = np.join source, file
            to = np.join target, file
            if fs.existsSync from
                copy from, to
    buildCoffee: buildCoffee = (input, output, callback) ->
        spawn "coffee.cmd -c -o #{output} #{input}", callback
    watchCoffee: watchCoffee = (input, output) ->
        spawn "coffee.cmd -w -c -o #{output} #{input}"
    isMatch: isMatch = (value, match, defaultValue=false) ->
        value = value.split(/[\/\\]/g).pop()
        return defaultValue unless match?
        return match value if 'function' is typeof match
        if Array.isArray match
            # see if it matches any subitem in the array
            for item in match
                if isMatch value, item
                    return true
            return false
        return value.substring(value.length-match.length) is match if typeof match is 'string'
        return match.test value
    defaultFileExclude: ["node_modules","www"]
    removeExtension: removeExtension = (file) ->
        dot = file.lastIndexOf '.'
        if dot > 0
            return file.substring 0, dot
        else
            return file
    changeExtension: changeExtension = (file, ext) -> removeExtension(file) + ext
    touch: touch = (file) ->
        now = new Date()
        fs.utimesSync file, now, now
    getModified: getModified = (path) ->
        try
            if fs.existsSync path
                stats = fs.statSync path
                return stats.mtime?.getTime() ? 0
        catch e
            console.warn e
        return 0
    isFile: isFile = (file) -> fs.statSync(file)?.isFile?() is true
    isDirectory: isDirectory = (file) -> fs.statSync(file)?.isDirectory?() is true
    list: list = (dir, options={}, files=[]) ->
        exclude = options.exclude ? exports.defaultFileExclude
        recursive = options.recursive ? true
        if fs.existsSync dir
            for file in fs.readdirSync(dir)
                file = np.join dir, file
                if not isMatch file, exclude, false
                    if isFile file
                        files.push file if isMatch file, options.include, true
                    else if recursive
                        list file, options, files
        files
    makeDirectories: makeDirectories = (dir) ->
        if not Object.isString dir
            throw new Error "dir is not a string: #{JSON.stringify dir}"
        if not fs.existsSync dir
            # make parent first
            makeDirectories np.dirname dir
            # make self
            fs.mkdirSync dir
    makeParentDirectories: makeParentDirectories = (file) ->
        makeDirectories np.dirname file
    read: read = (file, encoding) ->
        if encoding == undefined
            encoding = 'utf8'
        fs.readFileSync(file, encoding)
    write: write = (file, content, encoding) ->
        makeParentDirectories file
        if content?
            if encoding == undefined
                encoding = 'utf8'
            fs.writeFileSync(file, content, encoding)
        else
            fs.unlinkSync(file)
    # copies files or folders
    copy: copy = (source, target, include) ->
        target = np.normalize target
        if isFile(source)
            if isMatch(source, include, true)
                content = read source
                write target, content
                console.log "Copied: #{np.normalize target}"
        else if isDirectory source
            files = fs.readdirSync source
            for file in files
                copy np.join(source, file), np.join(target, file), include
    watchCopy: (input, output, include) ->
        watcher = require './watcher'
        watcher.watchDirectory input, {include:include}, (inputFile) ->
            outputFile = np.join(output, np.relative(input, inputFile))
            copy inputFile, outputFile
    getMatches: (s, regex, group) ->
        if not regex.global
            throw 'regex must be declared with global modifier /trailing/g'
        results = []
        while match = regex.exec s
            results.push if group > 0 then match[group] else match
        results

    startWebServer: (config) ->
        throw new Error "config.root string is required #{JSON.stringify config.root}" unless Object.isString config.root
        throw new Error "config.port number is required #{JSON.stringify config.port}" unless Object.isNumber config.port
        root = config.root
        port = config.port
        express = require 'express'
        app = express()
        http = require 'http'
        app.disable 'etag'
        app.configure ->
            app.use (req, res, next) ->
                # console.log req.url
                next()
            app.use express.static root
            app.use app.router
        server = http.createServer app
        server.listen port
        console.log "Starting web server on port #{port}."

if typeof describe is 'function'
    assert = require 'assert'
    describe 'glass.build.utility', ->
        describe 'isMatch', ->
            it "should work", ->
                assert isMatch "foo.js", ".js"
                assert isMatch "foo.js", ["foo.bar","foo.js"]
                assert isMatch "foo.js", /\.js$/
                assert isMatch "foo.js", (x) -> x is "foo.js"
                assert not isMatch "foo.jsp", ".js"
                assert not isMatch "foo.jsp", ["foo.bar","foo.js"]
                assert not isMatch "foo.jsp", /\.js$/
                assert not isMatch "foo.jsp", (x) -> x is "foo.js"
