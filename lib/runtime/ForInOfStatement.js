void (function(){var _ion_runtime_ForInOfStatement_ = function(module,exports,require){'use strict';
var ion = require('../'), Statement = require('./Statement'), DynamicExpression = require('./DynamicExpression');
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
                if (!(this.statements != null)) {
                    this.statements = {};
                    this.valueName = this.left.declarations[this.type === 'ForOfStatement' ? 0 : 1] != null ? this.left.declarations[this.type === 'ForOfStatement' ? 0 : 1].id.name : void 0;
                    this.keyName = this.left.declarations[this.type === 'ForOfStatement' ? 1 : 0] != null ? this.left.declarations[this.type === 'ForOfStatement' ? 1 : 0].id.name : void 0;
                }
                this.collectionExpression = this.collectionExpression != null ? this.collectionExpression : this.context.createRuntime(this.right);
                this.unobserveExpression = this.collectionExpression.observe(this.collectionWatcher = this.collectionWatcher != null ? this.collectionWatcher : ion.bind(function (collection) {
                    if (this.collection !== collection) {
                        this.unobserveCollection != null ? this.unobserveCollection() : void 0;
                        if (this.collection != null) {
                            for (var key in this.statements) {
                                this.removeItem(key);
                            }
                        }
                        this.unobserveCollection = null;
                        this.collection = collection;
                        if (this.collection != null) {
                            this.forEach(this.collection, ion.bind(function (key, value) {
                                this.addItem(key, value);
                            }, this));
                            if (this.collectionExpression.mutable) {
                                this.unobserveCollection = ion.observe(this.collection, this.collectionObserver = this.collectionObserver != null ? this.collectionObserver : this.applyChanges.bind(this));
                            }
                        }
                    }
                }, this));
            },
            deactivate: function () {
                ForInOfStatement.super.prototype.deactivate.apply(this, arguments);
                this.collectionWatcher != null ? this.collectionWatcher(void 0) : void 0;
                this.unobserveExpression();
                this.unobserveCollection != null ? this.unobserveCollection() : void 0;
            },
            keyToUnicodeChar: function (key) {
                if (typeof key === 'number') {
                    return String.fromCharCode(48 + key);
                } else {
                    this.keyCache = this.keyCache != null ? this.keyCache : {};
                    this.keyCacheCount = this.keyCacheCount != null ? this.keyCacheCount : 0;
                    return this.keyCache[key] = this.keyCache[key] != null ? this.keyCache[key] : String.fromCharCode(48 + this.keyCacheCount++);
                }
            },
            getOrderForKey: function (key) {
                return this.order + this.keyToUnicodeChar(key);
            },
            addItem: function (key, value, activate) {
                if (activate == null)
                    activate = true;
                if (this.statements.hasOwnProperty(key)) {
                    throw new Error('There should not be a current statement for this key: ' + key);
                }
                if (value !== void 0) {
                    var order = this.getOrderForKey(key);
                    var context = this.context.newContext(void 0, order);
                    if (this.valueName != null) {
                        context.setVariableExpression(this.valueName, new DynamicExpression({ value: value }));
                    }
                    if (this.keyName != null) {
                        context.setVariableExpression(this.keyName, new DynamicExpression({ value: key }));
                    }
                    var statement = context.createRuntime(this.body);
                    this.statements[key] = statement;
                    if (activate) {
                        statement.activate();
                    }
                    return statement;
                }
            },
            removeItem: function (key, value) {
                var statement = this.statements[key];
                if (statement != null) {
                    this.disposeStatement(statement);
                }
                delete this.statements[key];
                return statement;
            },
            disposeStatement: function (statement) {
                if (this.remove != null) {
                    var removeStatement = statement.context.createRuntime(this.remove);
                    removeStatement.activate();
                    removeStatement.deactivate();
                }
                statement.deactivate();
            },
            summarize: function (changes) {
                var ignoreProperty = ion.bind(function (name) {
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
                    }, this);
                var map = new Map();
                for (var _i = 0; _i < changes.length; _i++) {
                    var _ref = changes[_i];
                    var type = _ref.type;
                    var object = _ref.object;
                    var name = _ref.name;
                    var oldValue = _ref.oldValue;
                    if (object === this.collection) {
                        if (!ignoreProperty(name)) {
                            if (!map.has(name)) {
                                map.set(name, {
                                    type: type,
                                    object: object,
                                    name: name,
                                    oldValue: oldValue
                                });
                            } else {
                                var change = map.get(name);
                                change.type = type;
                            }
                        }
                    }
                }
                var array = [];
                map.forEach(function (change, name, object) {
                    var newValue = change.object[name];
                    if (newValue !== change.oldValue) {
                        delete change.object;
                        array.push(change);
                    }
                });
                return array;
            },
            applyChanges: function (changes) {
                var originalChanges = changes;
                changes = this.summarize(changes);
                if (changes.length === 0) {
                    return;
                }
                var getRecycleKey = ion.bind(function (key, value) {
                        return this.type === 'ForOfStatement' ? value : key;
                    }, this);
                var canRecycle = true;
                if (!canRecycle) {
                    for (var _i2 = 0; _i2 < changes.length; _i2++) {
                        var _ref2 = changes[_i2];
                        var name = _ref2.name;
                        var type = _ref2.type;
                        var oldValue = _ref2.oldValue;
                        var newValue = this.collection != null ? this.collection[name] : void 0;
                        var key = this.toKey(name);
                        if (oldValue !== void 0) {
                            this.removeItem(key, oldValue);
                        }
                        if (newValue !== void 0) {
                            this.addItem(key, newValue);
                        }
                    }
                } else {
                    var recyclableStatements = new Map();
                    var activateStatements = [];
                    for (var _i3 = 0; _i3 < changes.length; _i3++) {
                        var _ref3 = changes[_i3];
                        var name = _ref3.name;
                        var oldValue = _ref3.oldValue;
                        var key = this.toKey(name);
                        if (oldValue !== void 0) {
                            var rkey = getRecycleKey(key, oldValue);
                            var statement = this.statements[key];
                            if (statement != null) {
                                delete this.statements[key];
                                recyclableStatements.set(rkey, statement);
                            }
                        }
                    }
                    var contextsToUpdateOrder = [];
                    for (var _i4 = 0; _i4 < changes.length; _i4++) {
                        var _ref4 = changes[_i4];
                        var name = _ref4.name;
                        var oldValue = _ref4.oldValue;
                        var newValue = this.collection != null ? this.collection[name] : void 0;
                        var key = this.toKey(name);
                        if (newValue !== void 0) {
                            var rkey = getRecycleKey(key, newValue);
                            var statement = recyclableStatements.get(rkey);
                            if (statement != null) {
                                var context = statement.context;
                                if (this.type === 'ForOfStatement') {
                                    if (this.keyName != null) {
                                        context.variables[this.keyName].setValue(key);
                                    }
                                    contextsToUpdateOrder.push([
                                        key,
                                        context
                                    ]);
                                } else {
                                    if (this.valueName != null) {
                                        context.variables[this.valueName].setValue(newValue);
                                    }
                                }
                                this.statements[key] = statement;
                                recyclableStatements.delete(rkey);
                            } else {
                                statement = this.addItem(key, newValue, false);
                                if (statement != null) {
                                    activateStatements.push(statement);
                                }
                            }
                        }
                    }
                    recyclableStatements.forEach(ion.bind(function (statement) {
                        this.disposeStatement(statement);
                    }, this));
                    for (var _i5 = 0; _i5 < contextsToUpdateOrder.length; _i5++) {
                        var _ref5 = contextsToUpdateOrder[_i5];
                        var key = _ref5[0];
                        var context = _ref5[1];
                        var oldOrder = context.order;
                        var newOrder = this.getOrderForKey(key);
                        context.order = this.getOrderForKey(key);
                    }
                    this.context.inserter != null ? this.context.inserter.update() : void 0;
                    for (var _i6 = 0; _i6 < activateStatements.length; _i6++) {
                        var statement = activateStatements[_i6];
                        statement.activate();
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