void (function(){var _ion_runtime_ForInOfStatement_ = function(module,exports,require){'use strict';
var ion = require('../'), Statement = require('./Statement');
var ForInOfStatement = ion.defineClass({
        name: 'ForInOfStatement',
        properties: {
            toKey: function (name) {
                if (this.type === 'ForOfStatement') {
                    return parseInt(name);
                } else {
                    return name;
                }
            },
            forEach: function (collection, callback) {
                if (this.type === 'ForOfStatement') {
                    for (var key = 0; key < collection.length; key++) {
                        var value = collection[key];
                        callback(key, value);
                    }
                } else {
                    for (var key in collection) {
                        var value = collection[key];
                        callback(key, value);
                    }
                }
            },
            activate: function () {
                ForInOfStatement.super.prototype.activate.apply(this, arguments);
                this.statements = this.statements != null ? this.statements : {};
                this.collectionExpression = this.collectionExpression != null ? this.collectionExpression : this.context.createRuntime(this.right);
                this.collectionExpression.watch(this.collectionWatcher = this.collectionWatcher != null ? this.collectionWatcher : function (collection) {
                    if (this.collection !== collection) {
                        if (this.collection != null) {
                            this.forEach(this.collection, this.removeItem.bind(this));
                            ion.unobserve(this.collection, this.collectionObserver);
                        }
                        this.collection = collection;
                        if (this.collection != null) {
                            this.forEach(this.collection, this.addItem.bind(this));
                            ion.observe(this.collection, this.collectionObserver = this.collectionObserver != null ? this.collectionObserver : this.applyChanges.bind(this));
                        }
                    }
                }.bind(this));
            },
            deactivate: function () {
                ForInOfStatement.super.prototype.deactivate.apply(this, arguments);
                this.collectionExpression.unwatch(this.collectionWatcher);
            },
            addItem: function (key, value) {
                if (value !== void 0) {
                    var newContext = this.context.newContext();
                    newContext.setVariable(this.left.declarations[this.type === 'ForOfStatement' ? 0 : 1] != null ? this.left.declarations[this.type === 'ForOfStatement' ? 0 : 1].id.name : void 0, value);
                    newContext.setVariable(this.left.declarations[this.type === 'ForOfStatement' ? 1 : 0] != null ? this.left.declarations[this.type === 'ForOfStatement' ? 1 : 0].id.name : void 0, key);
                    var statement = this.statements[key] = newContext.createRuntime(this.body);
                    statement.activate();
                }
            },
            removeItem: function (key, value) {
                var statement = this.statements[key];
                statement != null ? statement.deactivate() : void 0;
                delete this.statements[key];
            },
            applyChanges: function (changes) {
                function ignoreProperty(name) {
                    if (!(name != null)) {
                        return true;
                    }
                    if (name[0] === '_') {
                        return true;
                    }
                    if (name === 'length' && this.type === 'ForOfStatement') {
                        return true;
                    }
                    return false;
                }
                for (var _i = 0; _i < changes.length; _i++) {
                    var _ref = changes[_i];
                    var name = _ref.name;
                    var oldValue = _ref.oldValue;
                    var ignore = ignoreProperty(name);
                    if (!ignore) {
                        var newValue = this.collection[name];
                        var key = this.toKey(name);
                        if (oldValue !== void 0) {
                            this.removeItem(key, oldValue);
                        }
                        if (newValue !== void 0) {
                            this.addItem(key, newValue);
                        }
                    }
                }
            }
        }
    }, Statement);
module.exports = exports = ForInOfStatement;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/ForInOfStatement',_ion_runtime_ForInOfStatement_);
    else
      _ion_runtime_ForInOfStatement_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_ForInOfStatement_.call(this);
  }
}).call(this)