require 'sugar'

# base class for reactive language statements and expressions
module.exports = class Construct
    constructor: (properties) ->
        Object.merge @, properties
    toJSON: ->
        json =
            "$": @constructor.name
        for own key, value of @
            json[key] = value
        return json
    dispose: ->
