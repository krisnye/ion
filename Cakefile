
task 'dev', 'creates development symlinks', ->
    fs = require 'fs'
    try
        fs.mkdir 'node_modules' if not fs.existsSync 'node_modules'
        fs.symlinkSync '../boot', 'node_modules/ion', 'dir' if not fs.existsSync 'node_modules/ion'
    catch e
        console.log "You need to run as an administrator to create symlinks: #{e}"

build = (ionPath) ->
    ModuleBuilder = require "#{ionPath}/builder/ModuleBuilder"
    new ModuleBuilder('src', 'lib').activate()

task "boot", "builds from the last stable version", -> build './boot'
task 'watch', 'builds from the latest version', -> -> build './lib'
