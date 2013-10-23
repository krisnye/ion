Operation = require './Operation'
Construct = require './Construct'

module.exports = class Expression extends Construct
    watch: (watcher) -> throw new Error "not implemented"
    unwatch: (watcher) -> throw new Error "not implemented"
