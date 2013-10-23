Operation = require './Operation'
Statement = require './Statement'
Context = require './Context'

module.exports = class AssignmentStatement extends Statement
    activate: ->
        super()
        @leftExpression ?= Operation.createRuntime @context, @args[0]
        @rightExpression ?= Operation.createRuntime @context, @args[1]
        @leftExpression.watch @leftWatcher ?= (@leftValue) => @assign()
        @rightExpression.watch @rightWatcher ?= (@rightValue) => @assign()
    deactivate: ->
        super()
        @leftExpression.unwatch @leftWatcher
        @rightExpression.unwatch @rightWatcher
    assign: ->
        if @leftValue? and @rightValue isnt undefined
            @context.this[@leftValue] = @rightValue
    dispose: ->
        super()
        @leftExpression?.dispose()
        @rightExpression?.dispose()

module.exports.test = (done) ->
    object = { x: 1, y: 2}
    context = new Context object
    a = Operation.createRuntime context, {op:':', args:["z", {op:"+", args:[
            {op:'member',args:[{op:'ancestor',args:[0]}, "x"]}
            {op:'member',args:[{op:'ancestor',args:[0]}, "y"]}
        ]}]}

    # activate this statement.
    a.activate()
    throw "result != 3" unless object.z is 3
    # deactivate and change x
    a.deactivate()
    object.x = 10
    # upon reactivation the result should immediately be 12
    a.activate()
    throw "result != 12" unless object.z is 12

    # now we will dynamically wait for the result to be 22
    Object.observe object, (changes) ->
        if object.z is 22
            a.deactivate()
            done()
    object.x = 20
