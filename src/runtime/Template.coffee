
module.exports = class Template
	constructor: (ast, input, output, variables) ->
		throw new Error "ast is required" unless ast?
		@ast = ast
		@input = input if input?
		@output = output if output?
		@variables = variables
	activate: ->
		@runtime ?= require('./').createRuntime @ast, @input, @output, @variables
		@runtime.activate()
	deactivate: ->
		@runtime.deactivate()
	dispose: ->
		@runtime?.dispose()
	# when added / removed from a container in a template.
	onAdded: (container, context) ->
		@output ?= container
		@input ?= context?.input
		@activate()
	onRemoved: (container) ->
		@output = null if @output is container
		@runtime?.dispose()
	toJSON: -> null

Template.moduleId = module.id