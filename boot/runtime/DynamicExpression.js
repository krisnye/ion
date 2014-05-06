void (function(){var _ion_runtime_DynamicExpression_ = function(module,exports,require){'use strict';
var ion = require('../');
var DynamicExpression = ion.defineClass({
        name: 'DynamicExpression',
        properties: {
            isActive: false,
            activate: function () {
                this.isActive = true;
            },
            deactivate: function () {
                this.isActive = false;
            },
            watch: function (watcher) {
                var watchers = this._watchers = this._watchers != null ? this._watchers : [];
                if (watchers.length === 0) {
                    this.activate();
                }
                watchers.push(watcher);
                var value = this.getValue();
                if (value !== void 0) {
                    this._notifyWatcher(watcher, value);
                }
            },
            unwatch: function (watcher) {
                this._watchers.splice(this._watchers.lastIndexOf(watcher), 1);
                var value = this.getValue();
                if (value !== void 0) {
                    this._notifyWatcher(watcher, void 0);
                }
                if (this._watchers.length === 0) {
                    this.deactivate();
                }
            },
            _notifyWatcher: function (watcher, value) {
                return watcher.call(this, value);
            },
            notify: function () {
                if (this._watchers != null) {
                    var value = this.getValue();
                    {
                        var _ref = this._watchers;
                        for (var _i = 0; _i < _ref.length; _i++) {
                            var watcher = _ref[_i];
                            this._notifyWatcher(watcher, value);
                        }
                    }
                }
                return;
            },
            getValue: function () {
                return this.value;
            },
            setValue: function (value) {
                if (value !== this.value) {
                    this.value = value;
                    this.notify();
                }
                return;
            }
        },
        test: function () {
            var d = new DynamicExpression();
            if (d.getValue() !== void 0) {
                throw 'd.getValue() != undefined';
            }
            var total = 10;
            var watcher = function (value) {
                if (value !== void 0) {
                    total += value;
                }
            };
            d.watch(watcher);
            if (!(total === 10))
                throw new Error('Assertion Failed: (total is 10)');
            d.setValue(10);
            if (!(d.getValue() === 10))
                throw new Error('Assertion Failed: (d.getValue() is 10)');
            if (!(total === 20))
                throw new Error('Assertion Failed: (total is 20)');
            d.setValue(20);
            if (!(total === 40))
                throw new Error('Assertion Failed: (total is 40)');
            d.unwatch(watcher);
            if (!(total === 40))
                throw new Error('Assertion Failed: (total is 40)');
            d.setValue(50);
            if (!(total === 40))
                throw new Error('Assertion Failed: (total is 40)');
        }
    }, require('./Expression'));
module.exports = exports = DynamicExpression;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/DynamicExpression',_ion_runtime_DynamicExpression_);
    else
      _ion_runtime_DynamicExpression_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_DynamicExpression_.call(this);
  }
}).call(this)