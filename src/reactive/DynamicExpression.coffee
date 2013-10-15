
Expression = require './Expression'

module.exports = class DynamicExpression extends Expression
    constructor: (properties) ->
        super properties
    isActive: false
    activate: ->
        # called when we have watchers
        @isActive = true
    deactivate: ->
        # called when we no longer have watchers
        @isActive = false
    watch: (watcher) ->
        watchers = @_watchers ?= []
        if watchers.length is 0
            @activate()
        watchers.add watcher
        # notify watcher immediately if we have a defined value
        value = @getValue()
        if value isnt undefined
            @_notifyWatcher watcher, value
    unwatch: (watcher) ->
        @_watchers?.remove watcher
        if @_watchers.length is 0
            @deactivate()
        # notify watcher immediately if we have a defined value
        value = @getValue()
        if value isnt undefined
            @_notifyWatcher watcher, undefined
    _notifyWatcher: (watcher, value) -> watcher.call @, value
    notify: ->
        if @_watchers?
            value = @getValue()
            for watcher in @_watchers
                @_notifyWatcher watcher, value
        return
    getValue: -> @_value
    setValue: (value) ->
        if value isnt @_value
            @_value = value
            @notify()
        return

module.exports.test = ->
    d = new DynamicExpression()
    throw "d.getValue() != undefined" unless d.getValue() is undefined
    total = 10
    watcher = (value) ->
        if value isnt undefined
            total += value
    d.watch watcher
    throw "total != 10" unless total is 10
    d.setValue 10
    throw "d.getValue() != 10" unless d.getValue() is 10
    throw "total != 20" unless total is 20
    d.setValue 20
    throw "total != 40" unless total is 40
    d.unwatch watcher
    throw "total != 40" unless total is 40
    d.setValue 50
    throw "total != 40" unless total is 40
