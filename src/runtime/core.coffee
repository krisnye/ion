require './sugar'
try
    require './harmony-collections-shim'
catch e
    console.warn e

isElement = (object) -> object?.nodeType is 1

module.exports =
    # property is optional
    observe: (object, observer, property) ->
        # console.log 'observe', object, property
        if object? and observer? and Object.observe? and typeof object is 'object'
            Object.observe object, observer
            # watch change on dom elements
            object.addEventListener?('change', observer)
        object?.onObserved?(observer, property)
    # property is optional
    unobserve: (object, observer, property) ->
        if object? and observer? and Object.unobserve? and typeof object is 'object'
            Object.unobserve object, observer
            # unwatch change on dom elements
            object.removeEventListener?('change', observer)
        object?.unObserved?(observer, property)
    count: (container) -> container.length ? 0
    add: (container, item, index) ->
        if isElement container
            if typeof item is 'string'
                item = document.createTextNode item
            insertBefore = null
            if index?
                insertBefore = container.childNodes[index]
            container.insertBefore item, insertBefore
        else if index? and container.splice?
            container.splice index, 0, item
        else if container.push?
            container.push item
        else
            container.add item

        item.onAdded?(container)

        # returns a function which can be used to remove the item
        return ->
            if container.nodeType is 1
                container.removeChild item
            else if container.lastIndexOf? and container.removeAt?
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
