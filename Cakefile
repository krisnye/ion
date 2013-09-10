ion = require './ion'
fs = require 'fs'
cp = require 'child_process'
_ = require 'underscore'

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

input = "index.coffee"
out = "lib/ion.js"
min = "lib/ion-min.js"
lineParserIn = "lineParser.pegjs"
lineParserOut = "lineParser.js"

buildParser = (input, output) ->
	peg = require 'pegjs'
	content = fs.readFileSync input, 'utf8'
	parser = peg.buildParser content
	source = "module.exports = #{parser.toSource()}"
	fs.writeFileSync output, source , 'utf8'
	parser

sample = "sample.ion"
task 'build', 'builds the ion parser', build = ->
	buildParser lineParserIn, lineParserOut

	ion = require './index'
	sample = fs.readFileSync sample, "utf8"
	ion.parse sample

	# exec "coffee -p -c ion.coffee > #{out}", ->
	# 	exec "coffee ion package.ion > package.json", ->
	# 		exec "uglifyjs #{out} > #{min}"

task 'watch', 'watches and rebuilds files when source changes', ->
	fs.watch lineParserIn, rebuild = _.debounce -> exec 'cake build'
	fs.watch input, rebuild
	fs.watch sample, rebuild
