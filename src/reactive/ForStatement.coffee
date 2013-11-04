Operation = require './Operation'
Statement = require './Statement'
Context = require './Context'

module.exports = class ForStatement extends Statement
    activate: ->
        super()
        console.log '---activate for ' + @context.input
        for key, value of @context.input
            # not yet fully implemented
            # we really need the object property creation first
            newContext = new Context value, @context.output, @context, @context.additions
            expression = Operation.createRuntime newContext, @args[1]
            expression.activate()
        # iterate each key/value in the input context
        # and create a runtime for it.

        # watch for changes and create/remove runtimes.
    deactivate: ->
        super()
    dispose: ->
        super()

module.exports.test = (done) ->
    object = [1,2,3,4]
    context = new Context object
    a = Operation.createRuntime context,
            {op:'for', args:[
                {op:'ancestor',args:[0]}
                {op:'add', args:[
                    {op:"*", args:[
                        {op:'ancestor',args:[0,]}
                        2
                    ]}
                    1
                ]}
            ]}

    a.activate()

    console.log object


    done()
    return
