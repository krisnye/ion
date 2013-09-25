fs = require 'fs'
peg = require 'pegjs'
require 'sugar'

config =
    node:
        directory: lib = 'lib'
    source:
        directory: 'src'
    browser:
        input:
            "ion": lib
        output:
            directory: 'www/js'
            webroot: 'www'
            test: 'glass-test'

builder = require 'glass-build'

task 'build', 'rebuilds the entire project', ->
    builder.build config
task 'watch', 'builds the project, runs the server and watches for changes', ->
    builder.watch config
task 'test', 'runs the command line unit tests', ->
    builder.test config
