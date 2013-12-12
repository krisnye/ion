return if global.window

fs = require 'fs'
np = require 'path'
utility = require './utility'
watcher = require './watcher'
File = require './File'
runtime = require '../runtime/'

module.exports = class Directory
	constructor: (path) ->
		@path = path if path?
	path: '.'
	toString: -> @path
	get: (path) ->
		# allow us to get our own properties
		return @[path] if @hasOwnProperty(path) or @[path]?

		path = @getAbsoluteName path
		if fs.existsSync path
			return utility.read path
		else
			return undefined
	set: (path, content) ->
		return @[path] = content if @hasOwnProperty(path) or @[path]?

		path = @getAbsoluteName path
		if content?
			console.log "Writing: " + path
		else
			console.log "Deleting: " + path
		utility.write path, content
	getFile: (path) -> return new File @getAbsoluteName path
	getDirectory: (path) -> return new Directory @getAbsoluteName path
	getRelativeName: (path) -> return np.relative @path, path
	getAbsoluteName: (path) -> return np.join @path, path
	search: (include, exclude) ->
		options =
			initial: false
		options.include = include if include?
		options.exclude = exclude if exclude?
		unwatch = null
		results = {}
		runtime.makeReactive results, =>
			unwatch = watcher.watchDirectory @path, options, (filename) =>
				path = @getRelativeName filename
				if fs.existsSync filename
					if not results[path]?
						# console.log 'creating--------------- ' + filename
						results[path] = new File filename
				else
					# console.log 'deleting--------------- ' + filename
					delete results[path]
			return unwatch
		files = utility.list @path, options
		for path in files
			results[@getRelativeName path] = new File path
		return results



