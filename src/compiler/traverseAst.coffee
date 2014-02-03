basicTraverse = require('./traverse')

exports.traverse = (program, callback) ->
    basicTraverse.traverse program, (node, context) ->
        context.scopeStack ?= []
        context.currentScope ?= -> @scopeStack[@scopeStack.length - 1]
        if node.type?
            callback node, context

exports.test = ->
    index = require './index'
    ast = index.parse """
        var a = 1
        var b = 2
        if a is b
            var c = 3
            log(c)
        else
            var d = 4
            log(d)
        """
    exports.traverse ast, (node, context) ->
        return unless node.type?
        # console.log node.type, context.scopeStack.length
    return
