Operation = require './Operation'
Expression = require './Expression'
Construct = require './Construct'

module.exports = class Statement extends Construct
    isActive: false
    activate: ->
        @isActive = true
        return
    deactivate: ->
        @isActive = false
        return
    dispose: ->
        super()
        if @isActive
            deactivate()
