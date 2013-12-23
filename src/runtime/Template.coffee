
module.exports = class Template
	constructor: (_ast, _input, _output, _variables) ->
		throw new Error "ast is required" unless _ast?
		@_ast = _ast
		# figure out what we use for nested template _input.
		# do we use the implied _input, or the templates official _input properties?
		@_input = _input if _input?
		@_output = _output if _output?
		@_variables = _variables
	activate: ->
		@runtime ?= require('./').createRuntime @_ast, @_input, @_output, @_variables
		@runtime.activate()
	deactivate: ->
		@runtime.deactivate()
	dispose: ->
		@runtime?.dispose()
	# when added / removed from a container in a template.
	onAdded: (container) ->
		@_input ?= @
		@_output ?= container
		@activate()
	onRemoved: (container) ->
		@_output = null if @_output is container
		@runtime?.dispose()
	toJSON: -> null

Template.moduleId = module.id