
task 'rebuild', 'builds the project with external compilers', ->
    cp = require 'child_process'
    fs = require 'fs'
    packageObject = JSON.parse fs.readFileSync "package.json", "utf8"
    input = packageObject.directories.src
    output = packageObject.directories.lib
    # build the coffee files
    cp.exec "coffee -c -o #{output} #{input}", (error, stdout, stderr) ->
        console.error error if error?
        console.log stdout if stdout?
        console.error stderr if stderr?
        # copy the sugar.js file
        for file in ["sugar.js", "harmony-collections-shim.js"]
            fs.writeFileSync(output + "/runtime/#{file}", fs.readFileSync(input + "/runtime/#{file}"))
        # now build the parser
        File = require './lib/builder/File'
        parserInput = new File(input + "/compiler/parser.pegjs")
        parserOutput = new File(output + "/compiler/parser.js")
        parserOutput.write require('./lib/builder').compilePegjs parserInput
        # now build the ModuleBuilder template
        templateInput = new File(input + "/builder/ModuleBuilder.ion")
        templateOutput = new File(output + "/builder/ModuleBuilder.js")
        templateOutput.write require('./lib/builder').compileTemplate templateInput, null, "../runtime/Template"

build = (exitImmediately) ->
    try
        builder = require './lib/builder'
    catch e
        console.error "builder module not found, try using 'cake rebuild'"
        return
    builder.runTemplate './build.ion', {}, exitImmediately
    # there is probably a watch leak in the file/directory, otherwise this shouldn't be necessary
    # TODO: fix it.
    if exitImmediately
        process.exit()

task 'build', 'builds the project with itself', -> build true
task 'watch', 'builds the project reactively', -> build false
