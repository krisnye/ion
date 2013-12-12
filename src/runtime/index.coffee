Context = require './Context'
core = require './core'

module.exports =
    observe: core.observe
    unobserve: core.unobserve
    createRuntime: (ast, input, output, variables) ->
        context = new Context input, output
        if variables?
            for name, value of variables
                context.setVariable name, value
        return context.createRuntime ast
    makeReactive: (object, activate) ->
        observeCount = 0
        deactivate = null
        Object.defineProperties object,
            onObserved:
                value: ->
                    observeCount++
                    if observeCount is 1
                        deactivate = activate.call object
            onUnobserved:
                value: ->
                    observeCount--
                    if observeCount is 0
                        deactivate?()
