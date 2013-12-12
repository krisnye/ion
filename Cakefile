config =
    input: 'src'
    output: 'lib'

task 'rebuild', 'builds the project with external compilers', ->
    cp = require 'child_process'
    fs = require 'fs'
    # build the coffee files
    cp.exec "coffee -c -o #{config.output} #{config.input}", (error, stdout, stderr) ->
        console.error error if error?
        console.log stdout if stdout?
        console.error stderr if stderr?
        # copy the sugar.js file
        fs.writeFileSync(config.output + "/sugar.js", fs.readFileSync(config.input + "/sugar.js"))
        # now build the parser
        File = require './lib/builder/File'
        parserInput = new File(config.input + "/compiler/parser.pegjs")
        parserOutput = new File(config.output + "/compiler/parser.js")
        parserOutput.write require('./lib/builder').compilePegjs parserInput, parserOutput

build = (exitImmediately) ->
    try
        builder = require './lib/builder'
    catch e
        console.error "builder module not found, try using 'cake rebuild'"
        return
    builder.runTemplate './build.ion', config, exitImmediately
    # there is probably a watch leak in the file/directory, otherwise this shouldn't be necessary
    # TODO: fix it.
    if exitImmediately
        process.exit()

task 'build', 'builds the project with itself', -> build true
task 'watch', 'builds the project reactively', -> build false
