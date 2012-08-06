ion = require './ion'
fs = require 'fs'
cp = require 'child_process'

exec = (command, handler) ->
	cp.exec command, ->
		print arguments
		handler?()

print = (args = arguments) ->
	for arg in args when arg?
		arg = arg.toString()
		if arg?.length > 0
			console.log arg

task 'test', 'tests the ion parser', ->
	text = fs.readFileSync 'package.ion', 'utf8'
	object = ion.parse text
	console.log JSON.stringify object, null, '   '

task 'build', 'builds the ion parser', ->
	exec 'coffee -c ion-parser.coffee', ->
		exec 'coffee -c ion.coffee', ->
			exec 'node ion-parser package.ion > package.json', ->
				exec 'uglifyjs ion.js > ion-min.js', ->
