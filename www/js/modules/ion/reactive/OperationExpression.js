(function(){require.register('ion/reactive/OperationExpression',function(module,exports,require){// Generated by CoffeeScript 1.6.3
(function() {
  var Context, DynamicExpression, Expression, ExpressionList, Operation, OperationExpression,
    __hasProp = {}.hasOwnProperty,
    __extends = function ___extends(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Operation = require('./Operation');

  Expression = require('./Expression');

  DynamicExpression = require('./DynamicExpression');

  ExpressionList = require('./ExpressionList');

  Context = require('./Context');

  module.exports = OperationExpression = (function(_super) {
    __extends(OperationExpression, _super);

    function OperationExpression(properties) {
      OperationExpression.__super__.constructor.call(this, properties);
      this.expressionList = new ExpressionList(this.context, this.args);
    }

    OperationExpression.prototype.args = null;

    OperationExpression.prototype.activate = function _activate() {
      var _this = this;
      OperationExpression.__super__.activate.call(this);
      return this.expressionList.watch(this.watcher != null ? this.watcher : this.watcher = function _watcher(value) {
        _this.argumentValues = value;
        return _this.evaluate();
      });
    };

    OperationExpression.prototype.deactivate = function _deactivate() {
      OperationExpression.__super__.deactivate.call(this);
      return this.expressionList.unwatch(this.watcher);
    };

    OperationExpression.prototype.evaluate = function _evaluate() {
      var value;
      value = this.operation.evaluate.apply(this.context, this.argumentValues);
      return this.setValue(value);
    };

    return OperationExpression;

  })(DynamicExpression);

  module.exports.test = function _test() {
    var ast, context, e, result, watcher;
    context = new Context;
    e = Operation.createRuntime(context, ast = require('../').parseExpression("1 + 2"));
    result = void 0;
    watcher = function _watcher(value) {
      return result = value;
    };
    e.watch(watcher);
    if (result !== 3) {
      throw "result != 3";
    }
  };

}).call(this);

})})()