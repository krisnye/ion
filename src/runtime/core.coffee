require '../sugar'

module.exports =
    # property is optional
    observe: (object, observer, property) ->
        if object? and Object.observe? and typeof object is 'object'
            Object.observe object, observer
        object?.onObserved?(observer, property)
    # property is optional
    unobserve: (object, observer, property) ->
        if object? and Object.unobserve? and typeof object is 'object'
            Object.unobserve object, observer
        object?.onUnobserved?(observer, property)
    count: (container) -> container.length ? 0
    add: (container, item, index, context) ->
        if index? and container.splice?
            container.splice index, 0, item
        else if container.push?
            container.push item
        else
            container.add item
        item.onAdded?(container, context)
    remove: (container, item) ->
        if container.lastIndexOf? and container.removeAt?
            index = container.lastIndexOf item
            if index >= 0
                container.removeAt index
        else
            container.remove item
        item.onRemoved?(container)
    get: (object, property) ->
        return undefined unless object? and property?
        if typeof object.get is 'function'
            return object.get property
        else
            return object[property]
    set: (object, property, value) ->
        # console.log 'core.set', property, value
        if object? and property?
            if typeof object.set is 'function'
                object.set property, value
            else if value is undefined
                delete object[property]
            else
                object[property] = value
            # we will notify an object when it is set on another object
            # if the object has an onSet 
            value?.onSet?(object, property)
        return value
    is: (instance, type) ->
        return false unless instance?
        return true unless type?
        if typeof type is 'function'
            if typeof instance.is is 'function'
                return instance.is type
            return instance instanceof type
        else
            return instance is type
