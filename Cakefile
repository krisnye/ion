
build = (ionPath) ->
    ModuleBuilder = require "#{ionPath}/builder/ModuleBuilder"
    options =
        build:
            merge: '_browser.js'
    ModuleBuilder.template(options).activate()

task 'boot', "builds from the last stable version", -> build './boot'
task 'watch', 'builds from the latest version', -> build './lib'
