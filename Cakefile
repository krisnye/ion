fs = require 'fs'
cp = require 'child_process'

task 'dev', 'creates development symlinks', ->
    try
        fs.mkdir 'node_modules' if not fs.existsSync 'node_modules'
        # fs.symlinkSync '../../ion/lib', 'node_modules/ionold', 'dir' if not fs.existsSync 'node_modules/ionold'
        fs.symlinkSync '../boot', 'node_modules/ion', 'dir' if not fs.existsSync 'node_modules/ion'
    catch e
        console.log "You need to run as an administrator to create symlinks: #{e}"

task "boot", "builds from the last stable version", ->
    ModuleBuilder = require './boot/builder/ModuleBuilder'
    new ModuleBuilder('src', 'lib').activate()

task 'watch', 'builds from the latest version', ->
	ModuleBuilder = require './lib/builder/ModuleBuilder'
	new ModuleBuilder('src', 'lib').activate()
