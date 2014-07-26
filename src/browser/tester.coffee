runTest = (name, test, callback) ->
    expectedCallbacks = []
    if typeof test is 'object'
        for key, value of test
            expectedCallbacks = expectedCallbacks.concat runTest name + ' ' + key, value, callback
    else if typeof test is 'function'
        # make sure this is a valid test function
        if /^\s*function\s*[a-zA-Z_0-9]*\s*\(\s*(done)?\s*\)/.test test.toString()
            expectedCallbacks.push name
            try
                if test.length is 1
                    # asynchronous callback
                    test (error, warning) ->
                        callback name, error, warning
                else
                    result = test()
                    callback name, null, result
            catch e
                callback name, e, null
    return expectedCallbacks

exports.spawnTests = spawnTests = (manifestFile) ->
    command = "node#{if process.platform is 'win32' then '.cmd' else ''} #{__filename} #{manifestFile}"
    require('../builder/utility').spawn command
    return

exports.runTests = runTests = (moduleIds, callback) ->
    throw new Error "moduleIds is required" unless moduleIds
    callback ?= exports.createCallback()
    expectedCallbacks = {} # name = false or true if called back
    waitingForFinishTimeout = null
    handler = (name, error, warning) ->
        expectedCallbacks[name] = true
        callback name, error, warning
        # maybe we are waiting for this final callback
        if waitingForFinishTimeout?
            inc = getIncompleteCallbacks()
            if inc.length is 0
                clearTimeout waitingForFinishTimeout
                return callback()
    for key, moduleId of moduleIds
        try
            module = require moduleId
            name = if Array.isArray moduleIds then moduleId else key
            array = runTest name, module.test, handler
            for name in array
                expectedCallbacks[name] ?= false
        catch e
            handler moduleId, e, null

    getIncompleteCallbacks = ->
        return (name for name, value of expectedCallbacks when not value)

    inc = getIncompleteCallbacks();
    if inc.length is 0
        # we're done
        callback()
    else
        # we have to wait for completion, but not too long
        # say... 1 second
        duration = 1000
        error = "Timed out after #{duration} ms"
        warning = undefined
        timeout = =>
            inc = getIncompleteCallbacks()
            # send a timeout error for each incomplete
            for name in inc
                callback name, error, warning
            callback()
        if global.setTimeout?
            waitingForFinishTimeout = setTimeout timeout, duration
        else
            error = undefined
            warning = "Platform missing setTimeout"
            timeout()

exports.createCallback = (options, html = global.window?) ->
    options ?=
        if html
            red:   '<span style="color:red;white-space:pre">'
            green: '<span style="color:green;white-space:pre">'
            blue:  '<span style="color:blue;white-space:pre">'
            plain:  '<span>'
            endColor: '</span>'
            log: (x) -> document.body.innerHTML += x
            beep: ''
            endLine: '<br>'
        else
            {}
    red   = options.red ? '\u001b[31m'
    green = options.green ? '\u001b[32m'
    blue  = options.blue ? '\u001b[36m'
    endColor = options.endColor ? '\u001b[0m'
    plain = options.plain ? ''
    beep  = options.beep ? '\u0007'
    log = options.log ? (x) -> console.log x
    endLine = options.endLine ? ''
    tests = 0
    fails = 0
    start = null
    (name, error, result) ->
        start ?= new Date().getTime()
        if name?
            tests++
            if error?
                fails++
            color =
                if error?
                    red
                else if result?
                    blue
                else
                    plain
            log color + name + ": " + (error?.stack ? error ? result ? "") + endColor + endLine
        else
            finish = new Date().getTime()
            time = finish - start
            passed = tests - fails
            log(endLine)
            color = if passed is tests then green else red + beep
            log color + (title = "#{passed}/#{tests} Passed (#{time} ms).") + endColor + endLine
            if global.document
                document.title = title
            log(endLine)

# unit test ourselves!
exports.test = ->
    assert =
        equal: (a, b) ->
            throw new Error "#{a} != #{b}" unless `a == b`
    tests =
        alpha: -> throw "Failure"
        beta: -> # no value, passes
        charlie: -> "Return value"
    runTest 'fail', (-> throw 'Failure'), (name, error, result) ->
        assert.equal name, 'fail'
        assert.equal error, 'Failure'
        assert.equal result, null
    runTest 'pass', (->), (name, error, result) ->
        assert.equal name, 'pass'
        assert.equal error, null
        assert.equal result, null
    runTest 'warn', (-> 'warning'), (name, error, result) ->
        assert.equal name, 'warn'
        assert.equal error, null
        assert.equal result, 'warning'
    return

if require.main is module
    np = require 'path'
    args = process.argv.slice(2).map (x) -> x.replace /\\/g, '\/'
    if args.length < 1
        console.log "Usage: tester manifestFile"
        return

    manifestFile = args[0]
    utility = require '../builder/utility'
    manifest = JSON.parse utility.read manifestFile

    # create a moduleid to name object
    modules = {}
    for file in manifest.files
        moduleId = np.join process.cwd(), np.dirname(manifestFile), file
        modules[file] = moduleId
    console.log "------------------------------------------------------"
    runTests modules

