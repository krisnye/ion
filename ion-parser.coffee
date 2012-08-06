fs = require 'fs'
ion = require './ion'

args = process.argv.slice 2
if args.length is 0
	console.log 'Usage: ion-parser file.ion'
	return 1

content = fs.readFileSync args[0], 'utf8'
object = ion.parse content
console.log JSON.stringify object, null, '    '
