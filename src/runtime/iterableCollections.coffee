
require './core'

exports.Map = class ForEachMap
	constructor: ->
		@clear()
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
		@map = new Map
		@keys = []
	getKeys: -> @keys
	forEach: (callback) ->
		for key in @keys by -1
			callback key, @get key
		return

exports.Set = class ForEachSet extends ForEachMap
	add: (value) -> @set value, value

# add size property to Map
Object.defineProperty ForEachMap.prototype, "size",
	get: -> @keys.length

# add size property to Set
Object.defineProperty ForEachSet.prototype, "size",
	get: -> @keys.length

module.exports.test =
	map: ->
		map = new ForEachMap
		map.set "x", 1
		result = map.get "x"
		throw new Error "#{result} isnt 1" unless result is 1
		map.clear()
		result = map.get "x"
		throw new Error "#{result} isnt undefined" unless result is undefined
		result = map.size
		throw new Error "#{result} isnt 0" unless result is 0
	set: ->
		set = new ForEachSet
		set.add 1
		set.add 2
		result = set.has 1
		throw new Error "#{result} isnt true" unless result is true
		result = set.has 3
		throw new Error "#{result} isnt false" unless result is false
		set.clear()
		result = set.has 1
		throw new Error "#{result} isnt false" unless result is false


