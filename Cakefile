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
	text = fs.readFileSync 'sample.ion', 'utf8'
	object = ion.parse text
	console.log JSON.stringify object, null, '    '

out = "lib/ion.js"
min = "lib/ion-min.js"

task 'build', 'builds the ion parser', ->
	exec "coffee -p -c ion.coffee > #{out}", ->
		exec "coffee ion package.ion > package.json", ->
			exec "uglifyjs #{out} > #{min}"
