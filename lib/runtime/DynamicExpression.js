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
            observe: function (observer, options) {
                var originalObserver = observer;
                var removed = false;
                var watchers = this._watchers = this._watchers != null ? this._watchers : [];
                if (watchers.length === 0) {
                    this.activate();
                }
                watchers.push(observer);
                if (this.hasValue()) {
                    var value = this.getValue();
                    this._notifyWatcher(originalObserver, value);
                }
                return ion.bind(function () {
                    if (!removed) {
                        removed = true;
                        this._watchers.remove(observer);
                        if (this._watchers.length === 0) {
                            this.deactivate();
                        }
                    }
                }, this);
            },
            _notifyWatcher: function (observer, value) {
                return observer.call(this, value);
            },
            notify: function () {
                if (this._watchers != null) {
                    var value = this.getValue();
                    {
                        var _ref = this._watchers;
                        for (var _i = 0; _i < _ref.length; _i++) {
                            var observer = _ref[_i];
                            this._notifyWatcher(observer, value);
                        }
                    }
                }
                return;
            },
            hasValue: function () {
                return this.hasOwnProperty('value');
            },
            getValue: function () {
                return this.value;
            },
            setValue: function (value) {
                if (value !== this.value || !this.hasValue()) {
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
            var observer = function (value) {
                if (value !== void 0) {
                    total += value;
                }
            };
            var unobserve = d.observe(observer);
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
            unobserve();
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