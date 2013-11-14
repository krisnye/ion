
require 'sugar'

module.exports = class ForEachMap
		constructor: ->
			@map = new Map
			@keys = []
		get: (key) -> @map.get key
		set: (key, value) ->
			if not @has key
				@keys.add key
			@map.set key, value
		has: (key) -> @map.has key
		delete: (key) ->
			if @has key
				@keys.remove key
			@map.delete key
		clear: ->
			@map.clear()
			@keys.length = 0
		getKeys: -> @keys
		forEach: (callback) ->
			for key in @keys by -1
				callback key, @get key
			return

Object.defineProperty ForEachMap.prototype, "size",
	get: -> @map.size

module.exports.test = ->
	map = new ForEachMap
	map.set "x", 1
	result = map.get "x"
	throw new Error "#{result} isnt 1" unless result is 1
	map.clear()
	result = map.get "x"
	throw new Error "#{result} isnt undefined" unless result is undefined
	result = map.size
	throw new Error "#{result} isnt 0" unless result is 0
	return


