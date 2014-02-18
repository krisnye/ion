fs = require 'fs'
cp = require 'child_process'

task 'dev', 'creates development symlinks', ->
    try
        fs.mkdir 'node_modules' if not fs.existsSync 'node_modules'
        fs.symlinkSync '../../ion/lib', 'node_modules/ionold', 'dir' if not fs.existsSync 'node_modules/ionold'
        fs.symlinkSync '../lib', 'node_modules/ion', 'dir' if not fs.existsSync 'node_modules/ion'
    catch e
        console.log "You need to run as an administrator to create symlinks: #{e}"

task "watch", "builds and watches the debug website", ->
    builder = require 'ionold/builder'
    builder.runTemplate 'build.ion', {output:"lib"}
