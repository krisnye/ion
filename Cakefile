
build = (ionPath) ->
    ModuleBuilder = require "#{ionPath}/builder/ModuleBuilder"
    new ModuleBuilder().activate()

task 'boot', "builds from the last stable version", -> build './boot'
task 'watch', 'builds from the latest version', -> build './lib'
