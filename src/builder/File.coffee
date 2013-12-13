return if global.window?

fs = require 'fs'
np = require 'path'
utility = require './utility'
runtime = require '../runtime/'

module.exports = class File
	constructor: (path) ->
		throw new Error "path string is required" unless typeof path is 'string'
		Object.defineProperties @,
			path:
				value: path
				enumerable: true
				writable: false
		# set modified immediately
		@modified = utility.getModified path
		# make us reactive to observers.  Specifically we will just update our modified value as needed.
		runtime.makeReactive @, =>
			if fs.existsSync @path
				watcher = fs.watch @path, => @modified = utility.getModified @path
			return -> watcher?.close()
	read: ->
		if fs.existsSync @path
			utility.read @path
		else
			null
	write: (content) -> utility.write @path, content
	toString: -> @path
