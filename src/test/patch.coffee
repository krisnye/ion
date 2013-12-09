
# target value should never include reference types from values
apply = (target, values, deleteNull = true) ->
    return Object.clone(values, true) unless values?.constructor is Object
    target = {} unless Object.isObject target
    for key, value of values
        patchedValue = apply target[key], value, deleteNull
        if deleteNull and not value?
            delete target[key]
        else
            target[key] = patchedValue
    return target

# combines two patches to make a single patch
combine = (patch1, patch2) -> apply patch1, patch2, false

canWatch = (object) -> object? and typeof object is 'object'
# watches object for changes and calls the handler with patches
watch = (object, handler, callInitial = true) ->
    throw new Error "Cannot watch: #{object}" unless canWatch object
    # recurse watching and unwatching
    subWatchers = {}
    # pending patch allows several changes at simultaneous levels of the
    # heirarchy to be combined into a single patch call
    pendingPatch = null
    processPatch = (patchValues) ->
        # watch sub objects
        for name of patchValues
            # unwatch any current value being watched
            subWatchers[name]?()
            # now watch sub values if we can
            value = object[name]
            if canWatch value
                do ->
                    saveName = name # so it's not changed by other closures
                    subHandler = (patch) ->
                        basePatch = {}
                        basePatch[saveName] = patch
                        if pendingPatch?
                            pendingPatch = combine pendingPatch, basePatch
                        else
                            handler basePatch
                    subWatchers[saveName] = watch value, subHandler, false
        return
    watcher = (changes) ->
        pendingPatch = {}
        for change in changes
            pendingPatch[change.name] = object[change.name]
        processPatch pendingPatch
        process.nextTick ->
            handler pendingPatch
            pendingPatch = null
    # call process patch on the object to watch children
    processPatch object
    Object.observe object, watcher
    # return an function that lets us unwatch
    return ->
        Object.unobserve object, watcher
        # unwatch subWatchers
        for key, value of subWatchers
            value()

diff = (oldValue, newValue) ->
    # returns a patch which can convert from the oldValue to the newValue
    # returns undefined if there is no difference between them
    # the patch SHOULD be treated as readonly, since it may reference pre-existing objects
    return undefined if oldValue is newValue
    return (newValue ? null) unless oldValue? and newValue? and typeof newValue is 'object' and typeof oldValue is 'object'
    patch = undefined
    for own name of oldValue
        propertyDiff = diff oldValue[name], newValue[name]
        if propertyDiff isnt undefined
            patch ?= {}
            patch[name] = propertyDiff
    for own name of newValue when not oldValue.hasOwnProperty name
        patch ?= {}
        patch[name] = newValue[name]
    return patch

isChange = (oldValue, newValue) ->
    # returns true if a newValue will change the old value
    # returns false if a newValue will not change the old value
    return false if oldValue is newValue
    return true unless oldValue? and newValue? and typeof newValue is 'object' and typeof oldValue is 'object'
    for name of newValue when isChange oldValue[name], newValue[name]
        return true
    return false

isEmpty = (patch) -> patch is undefined or Object.isObject(patch) and Object.isEmpty(patch)

module.exports = exports =
    apply: apply
    combine: combine
    watch: watch
    diff: diff
    isChange: isChange
    isEmpty: isEmpty

assert = (e) -> throw new Error() unless e
exports.test = 
    isChange: ->
        assert isChange {a:1}, null
        assert not isChange null, null
        assert isChange undefined, null
        assert isChange null, undefined
        assert not isChange {a:1}, {a:1}
        assert not isChange {a:{b:2,c:3}}, {a:{b:2}}
        assert isChange {a:{b:2}}, {a:{b:3}}
        return
    diff: ->
        Object.equal {b:2}, diff {a:1}, {a:1,b:2}
        Object.equal {a:{b:3,c:null}}, diff {a:{b:2,c:4}}, {a:{b:3}}
        Object.equal {a:1}, diff null, {a:1}
        Object.equal {c:{d:{f:4}}}, diff {a:1,b:2,c:{d:{e:1,f:2}}}, {a:1,b:2,c:{d:{e:1,f:4}}}
        Object.equal null, diff {a:1}, undefined
        Object.equal null, diff {a:1}, null
        Object.equal undefined, diff {a:{b:2}}, {a:{b:2}}
        return
    observe: (done) ->
        return done null, null unless global.window?
        return done null, "Object.observe missing." unless Object.observe?
        source =
            name: 'Kris'
            age: 41
            children:
                Sadera:
                    grandchildren:
                        One: 1
                        Two: 2
                Orion: {}
        target = Object.clone source
        unwatch = watch source, (patch) ->
            target = apply target, patch
            # test that source and target are equivalent
            assert Object.equal source, target
            done()
            unwatch()
        source.name = 'Fred'
        source.children.Orion = {a:1,b:2}
        source.children.Orion.c = 12
        source.children.Sadera.grandchildren.three = 3
