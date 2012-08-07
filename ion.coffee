
class Token
	constructor: (@symbol, @type, @text = @type, @value) ->
	toJSON: -> if @symbol then @type else @value
	toString: -> @text

tokentypes = [
	[/^\s*#.*/, (x) -> null]
	[/^\s*\[/, (x) -> new Token true, '[', x]
	[/^\s*\]/, (x) -> new Token true, ']', x]
	[/^\s*:/,  (x) -> new Token true, ':', x]
	[/^\s*,/,  (x) -> new Token true, ',', x]
	[/^\s*"([^"\\]|(\\([\/'"\\bfnrt]|(u[a-fA-F0-9]{4}))))*"/, (x) -> new Token false, 'quoted', x, JSON.parse x]
	[/^[^,:\[\]#]+/, (x) -> new Token false, 'unquoted', x, x.trim()]
]

parseTokens = (line) ->
	if line.trim().length is 0
		return null
	tokens = []
	while line.trim().length > 0
		matched = false
		for tokentype in tokentypes
			match = line.match tokentype[0]
			if match?
				matched = true
				#	parse and add the token to our list
				token = tokentype[1] text = match[0]
				tokens.push token if token?
				#	consume the matched token
				line = line.substring text.length
				break
		if not matched
			# this shouldn't ever happen
			throw new Error line
	return tokens

class Node
	constructor: (@line, @lineNumber, @indent) ->
		if line?
			@tokens = parseTokens line
			@isText = isText @tokens
			if @tokens?.length >= 2 and not (key = @tokens[0]).symbol and @tokens[1].type is ':'
				@key = key.value
			@hasColon = @key? or @tokens?[0]?.type is ':'
	error: (message, lineNumber) ->
		error = new Error "#{message}, line:#{@lineNumber}"
		error.lineNumber = @lineNumber
		error.line = @line
		error
	getAllDescendantLines: (lines = [], indent = @indent + 1) ->
		if @children?
			for child in @children
				lines.push child.line.substring indent
				child.getAllDescendantLines lines, indent
		return lines
	getComplexType: (options) ->
		#	see if we have an explicit type
		explicitType = if @tokens?.length >= 3 then @tokens?.slice(2).join('').trim()
		if explicitType?
			options.explicit = true
			return explicitType
		nonEmptyChildCount = 0
		keyCount = 0
		keys = {}
		duplicateKeys = false
		for child in @children
			if (child.isText and not child.key) or (child.children? and not child.hasColon)
				return '""'
			if child.tokens
				nonEmptyChildCount++
				if child.key
					keyCount++
					if keys[child.key]
						duplicateKeys = true
					keys[child.key] = true
		if duplicateKeys or nonEmptyChildCount > 0 and keyCount is 0
			return '[]'
		if keyCount is nonEmptyChildCount
			return '{}'
		throw @error 'Inconsistent child keyCount'
	getSimpleValue: (options) ->
		tokens = @tokens
		return undefined if tokens.length is 0
		if @key
			tokens = tokens.slice 2
		else if @hasColon
			tokens = tokens.slice 1
		#	empty is implied null
		if tokens.length is 0
			return null
		#	expicit array
		return value if tokens.length >= 2 and tokens[0].type is '[' and tokens[tokens.length - 1].type is ']' and value = getArray tokens.slice 1, -1
		if not @isText
			#	single value
			if tokens.length is 1
				token = tokens[0]
				if token.type is 'quoted'
					options.explicit = true
				return token.value
			#	implicit array
			return value if value = getArray tokens
		#	string
		return tokens.join('').trim()
	doChildrenHaveKeys: ->
		for child in @children when child.key?
			return true
		return false
	getComplexValue: (options) ->
		type = @getComplexType options
		if type is '""'
			value = @getAllDescendantLines().join '\n'
		else if type is '[]'
			# if the children have keys, then this is a different animal
			if @doChildrenHaveKeys()
				value = []
				current = null
				#	read in the objects skipping to the next one whenever we have a new key
				for child in @children when child.tokens
					key = child.key
					if current == null or current.hasOwnProperty key
						value.push current = {}
					current[key] = child.getValue()
			else
				value = (child.getValue() for child in @children when child.tokens)
		else
			value = {}
			for child in @children when child.tokens
				value[child.key] = child.getValue()
		return value
	getValue: ->
		options = {}
		if @children?
			if @isText
				throw @children[0].error 'Children not expected'
			value = @getComplexValue options
		else
			value = @getSimpleValue options

		if typeof value is 'string' and not options.explicit
			value = processUnquoted value

		return value

processUnquoted = (text) ->
	for processor in ion.processors
		result = processor text
		if result isnt undefined
			return result
	return text

isText = (tokens) ->
	if tokens
		punctuation = /[^\s\w]/
		for token in tokens
			if token.type is 'unquoted'
				value = token.value
				if typeof value is 'string' and punctuation.test value
					return true
	return false

#	returns an array of items if they are all comma separated, otherwise null
getArray = (tokens) ->
	for token, index in tokens
		if index % 2 is 0
			if token.symbol
				return null
		else
			if token.type isnt ','
				return null
	return (item.value for item in tokens by 2)

nest = (nodes) ->
	root = new Node(null, null, -1)
	stack = [root]
	for node in nodes
		while node.indent <= (parent = stack[stack.length-1]).indent
			stack.pop()
		(parent.children ?= []).push node
		stack.push node
	root

ion =
	parse: (text, options) ->
		#	trim the text
		text = text.trim()
		#	split text into lines
		nodes = []
		for line, index in text.split '\r\n' when line.trim()[0] isnt '#'
			indent = (if line.trim().length is 0 then indent else indent = line.match(/^\s*/)?[0]?.length) ? 0
			nodes.push new Node line, index + 1, indent
		#	nest the lines as children of a root node
		root = nest nodes
		#	now get the root value
		value = root.getValue()
		return value
	#	extensible ion processors for converting unquoted text to other values
	processors: [
		(text) -> if text.match /^\s*null\s*$/ then return null
		(text) -> if text.match /^\s*(true|false)\s*$/ then return Boolean text.trim()
		(text) -> if text.match /^\s*[0-9]+(\.[0-9]+)?([eE][-+]?[0-9]+)?\s*$/ then return Number text.trim()
		(text) -> if text.match /^\s*\d\d\d\d-\d\d-\d\d(T\d\d:\d\d(:\d\d(\.\d{1,3})?)?(Z|([+-]\d\d:\d\d))?)?\s*$/ then return new Date text.trim()
		(text) -> if text.match /^\s*{}\s*$/ then return {}
		(text) ->
			#	this attempts to match a table format and convert it to an array of objects
			#	header:     values:    separated:    space:
			lines = text.split '\n'
			if lines.length > 3
				if lines[0].match /^([^: ]+( [^: ]+)*:( +|$)){2,}$/
					headers = []
					regex = /[^: ]+( [^: ]+)*/g
					while match = regex.exec lines[0]
						headers.push [new Node(match[0]).getValue(), match.index]
					if headers.length >= 2
						array = []
						for i in [1...lines.length]
							line = lines[i]
							array.push item = {}
							for header, index in headers
								key = header[0]
								start = header[1]
								end = headers[index+1]?[1]
								cell = line.substring start, end
								if cell.trim().length
									value = new Node(cell).getValue()
									item[key] = value
						return array
			return
	]

if typeof module is 'undefined'
	#	global.ion
	do -> this.ion = ion
else
	#	nodejs module
	module.exports = ion

	if require.main is module
		fs = require 'fs'
		args = process.argv.slice 2
		if args.length is 0
			return console.log 'Usage: ion file.ion'
		content = fs.readFileSync args[0], 'utf8'
		object = ion.parse content
		console.log JSON.stringify object, null, '    '
