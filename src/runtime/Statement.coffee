Operation = require './Operation'
Expression = require './Expression'
Construct = require './Construct'

module.exports = class Statement extends Construct
    constructor: (properties) ->
        super properties
        if not @context?
            throw new Error "#{@.constructor.name}.context is required"
        @
    isActive: false
    activate: ->
        @isActive = true
        return
    deactivate: ->
        @isActive = false
        return
