
class Token
	constructor: (@symbol, @type, @text = @type, @value) ->
	toJSON: -> if @symbol then @type else @value
	toString: -> @text

unquoted = (text) ->
	if text.match /^\s*null\s*$/ then return null
	if text.match /^\s*(true|false)\s*$/ then return Boolean text.trim()
	if text.match /^\s*[0-9]+(\.[0-9]+)?([eE][-+]?[0-9]+)?\s*$/ then return Number text.trim()
	if text.match /^\s*\d\d\d\d-\d\d-\d\d(T\d\d:\d\d(:\d\d(\.\d{1,3})?)?(Z|([+-]\d\d:\d\d))?)?\s*$/ then return new Date text.trim()
	if text.match /^\s*{}\s*$/ then return {}
	return text.trim()

tokentypes = [
	# [/^\s*\{/, (x) -> new Token true, '{', x]
	# [/^\s*\}/, (x) -> new Token true, '}', x]
	[/^\s*\[/, (x) -> new Token true, '[', x]
	[/^\s*\]/, (x) -> new Token true, ']', x]
	[/^\s*:/,  (x) -> new Token true, ':', x]
	[/^\s*,/,  (x) -> new Token true, ',', x]
	[/^\s*"([^"\\]|(\\([\/'"\\bfnrt]|(u[a-fA-F0-9]{4}))))*"/, (x) -> new Token false, 'quoted', x, JSON.parse x]
	[/^[^,:\[\]]+/, (x) -> new Token false, 'unquoted', x, unquoted x]
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
				tokens.push tokentype[1] text = match[0]
				#	consume the matched token
				line = line.substring text.length
				break
		if not matched
			tokens.push line
			break
	return tokens

class Node
	constructor: (@lineNumber, @line, @indent) ->
		if line?
			@tokens = parseTokens line
			@isText = isText @tokens
			if @tokens?.length >= 2 and not (key = @tokens[0]).symbol and @tokens[1].type is ':'
				@key = key.value
	isEmpty: -> not @tokens?
	hasColon: -> @tokens? and (@tokens[0]?.type is ':' or @tokens[1]?.type is ':')
	error: (message, lineNumber) ->
		error = new Error "#{message}, line:#{@lineNumber}"
		error.lineNumber = @lineNumber
		error.line = @line
		error
	getAllDescendantLines: (node, lines = [], indent = @indent + 1) ->
		if @children?
			for child in @children
				lines.push child.line.substring indent
				child.getAllDescendantLines child, lines, indent
		return lines
	getComplexType: ->
		#	see if we have an explicit type
		explicitType = if @tokens?.length >= 3 then @tokens?.slice(2).join('').trim()
		if explicitType?
			console.log '(' + explicitType + ')'
			return explicitType
		nonEmptyChildCount = 0
		keys = 0
		for child in @children
			if (child.isText and not child.key) or (child.children? and not child.hasColon())
				return '""'
			if not child.isEmpty()
				nonEmptyChildCount++
				keys++ if child.key
		if keys is nonEmptyChildCount
			return '{}'
		if keys is 0
			return '[]'
		throw @error 'Inconsistent child keys'
	getSimpleValue: ->
		tokens = @tokens
		return undefined if tokens.length is 0
		if @key
			tokens = tokens.slice 2
		#	expicit array
		return value if tokens.length >= 2 and tokens[0].type is '[' and tokens[tokens.length - 1].type is ']' and value = getArray tokens.slice 1, -1
		if not @isText
			#	single value
			if tokens.length is 1
				return tokens[0].value
			#	implicit array
			return value if value = getArray tokens
		#	string
		return tokens.join('').trim()
	getComplexValue: ()->
		type = @getComplexType()
		if type is '""'
			value = @getAllDescendantLines().join '\n'
		else if type is '[]'
			value = (child.getValue() for child in @children when not child.isEmpty())
		else
			value = {}
			for child in @children when not child.isEmpty()
				value[child.key] = child.getValue()
		return value
	getValue: ->
		if @children?
			if @isText
				throw @children[0].error 'Children not expected'
			value = @getComplexValue()
		else
			value = @getSimpleValue()
		return value

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
			nodes.push new Node index + 1, line, indent
		#	nest the lines as children of a root node
		root = nest nodes
		#	now get the root value
		root.value = root.getValue()

		console.log JSON.stringify root, null, '    '
	stringify: (object) ->

if typeof module is 'undefined'
	#	global.ion
	do -> this.ion = ion
else
	#	nodejs module
	module.exports = ion


		# 	#	parse and interpret tokens, we should do this AFTER we know if we are expecting object values or array values
		# 	tokens = parseTokens line
		# 	if tokens?
		# 		#	consume key if present
		# 		if tokens[1]?.type is ':'
		# 			node.key = tokens[0].text.trim()
		# 			tokens = tokens.slice 2
		# 		#	remainder is value
		# 		value = getValueFromTokens node, tokens
		# 		if value isnt undefined
		# 			node.value = value
		# 	else
		# 		#	line not parseable so we use the raw value
		# 		node.value = node.line


		# #	if any children are text then merge all children as text.
		# mergeText root


# punctuation = /[^\s\w]/
# isText = (tokens) ->
# 	for token in tokens
# 		if token.type is 'unquoted'
# 			value = token.value
# 			if typeof value is 'string' and punctuation.test value
# 				return true
# 	return false

# #	returns an array of items if they are all comma separated, otherwise null
# getArray = (tokens) ->
# 	for token, index in tokens
# 		if index % 2 is 0
# 			if token.symbol
# 				return null
# 		else
# 			if token.type isnt ','
# 				return null
# 	return (item.value for item in tokens by 2)

# #	returns an object with key:value pairs set or null
# getObject = (tokens) ->
# 	object = {}
# 	index = 0
# 	while index + 3 <= tokens.length
# 		if (kt = tokens[index]).symbol or tokens[index + 1].type isnt ':' or (vt = tokens[index+2]).symbol
# 			return null
# 		object[kt.value] = vt.value
# 		index += 3
# 		if index < tokens.length and tokens[index].type isnt ','
# 			return null
# 		index++
# 	if index < tokens.length
# 		return null
# 	return object

# getValueFromTokens = (node, tokens) ->
# 	#	empty
# 	return undefined if tokens.length is 0
# 	#	expicit array
# 	return value if tokens.length >= 2 and tokens[0].type is '[' and tokens[tokens.length - 1].type is ']' and value = getArray tokens.slice 1, -1
# 	#	expicit object
# 	return value if tokens.length >= 2 and tokens[0].type is '{' and tokens[tokens.length - 1].type is '}' and value = getObject tokens.slice 1, -1
# 	#	text
# 	if not isText tokens
# 		#	single value
# 		if tokens.length is 1
# 			return tokens[0].value
# 		#	implicit array
# 		return value if value = getArray tokens
# 		#	implicit object
# 		return value if value = getObject tokens
# 	node.text = true
# 	return tokens.join('').trim()

# getAllDescendantLines = (node, lines = [], indent = node.indent + 1) ->
# 	if node.children?
# 		for child in node.children
# 			lines.push child.lineSource.substring indent
# 			getAllDescendantLines child, lines, indent
# 	return lines

# mergeText = (node) ->
# 	if node.children?
# 		merge = false
# 		for child in node.children
# 			if child.text
# 				merge = true
# 				break
# 		if merge
# 			node.value = getAllDescendantLines(node).join '\n'
# 			delete node.children
# 		else
# 			for child in node.children
# 				mergeText child
# 	return node.text

# getComplexTypeFromNode = (node) ->
# 	return Object if node.value is '{}'
# 	return Array if node.value is '[]'
# 	return String if node.value is '""'

# 	#	test the children
# 	keys = 0
# 	for child in node.children
# 		#	child text => String
# 		return String if child.text
# 		keys++ if child.key?
# 	#	all keys => Object
# 	return Object if keys == node.children.length
# 	#	no keys => Array
# 	return Array if keys == 0
# 	#	some keys => String
# 	return String

# getValueFromChildren = (node) ->
# 	return unless node.children?

# 	getValueFromChildren child for child in node.children

# 	type = getComplexTypeFromNode node
# 	if type is String
# 		node.value = getAllDescendantLines(node).join '\n'
# 	else if type is Array
# 		array = []
# 		array = child.value for child in node.children

# 	delete node.children
# 	return


# 	array = true
# 	object = false for child in node.children when child.key

# 	#	if any child is text then all children are text
# 	#	if all children have a key then parent is object
# 	#	otherwise parent is an array of child values
