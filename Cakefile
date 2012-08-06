ion = require './ion'
fs = require 'fs'
{exec} = require 'child_process'

print = (args = arguments) ->
	for arg in args when arg?
		arg = arg.toString()
		if arg?.length > 0
			console.log arg

task 'test', 'tests the ion parser', ->
	text = fs.readFileSync 'sample.ion', 'utf8'
	object = ion.parse text
	JSON.stringify object
task 'build', 'builds the ion parser', ->
	exec 'coffee -c ion.coffee', ->
		print arguments
		exec 'uglifyjs ion.js > ion-min.js', ->
			print arguments
			fs.unlinkSync 'ion.js'