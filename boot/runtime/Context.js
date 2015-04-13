void (function(){var _ion_runtime_Context_ = function(module,exports,require){'use strict';
var ion = require('../'), Factory = require('./Factory'), Literal = require('./Literal'), noop = function () {
    };
var Context = ion.defineClass({
        name: 'Context',
        constructor: function Context(parent, output) {
            this.output = output;
            this.parent = parent;
            this.depth = parent != null ? parent.depth + 1 : 0;
            this.variables = {};
            this.root = (this.parent != null ? this.parent.root : void 0) != null ? this.parent.root : this;
            this._runtimes = {};
            this.returnExpression = parent != null ? parent.returnExpression : void 0;
        },
        properties: {
            newContext: function (output) {
                if (output == null)
                    output = this.output;
                return new Context(this, output);
            },
            createRuntime: function (node) {
                return Factory.createRuntime(this, node);
            },
            get: function (name) {
                var variable = this.getVariable(name);
                if (!(variable != null)) {
                    throw new Error('Variable not found: \'' + name + '\'');
                }
                return variable.value;
            },
            getVariable: function (name) {
                var context = this, value;
                while (context != null) {
                    var variable = context.variables[name];
                    if (variable != null) {
                        return variable;
                    }
                    context = context.parent;
                }
                value = global[name];
                if (value === void 0) {
                    throw new Error('Variable not found: \'' + name + '\'');
                }
                var cachedGlobals = this.root.globals = this.root.globals != null ? this.root.globals : {};
                return cachedGlobals[name] = cachedGlobals[name] != null ? cachedGlobals[name] : new Literal({ value: value });
            },
            setVariableFromAst: function (name, node) {
                if (name != null) {
                    return this.setVariableExpression(name, this.createRuntime(node));
                }
            },
            setVariableLiteral: function (name, value) {
                if (name != null) {
                    return this.setVariableExpression(name, new Literal({ value: value }));
                }
            },
            setVariableExpression: function (name, expression) {
                if (name != null) {
                    if (this.variables[name] != null) {
                        throw new Error('Variable ' + name + ' is already defined');
                    }
                    this.variables[name] = expression;
                    return expression;
                }
            }
        }
    });
module.exports = exports = Context;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/runtime/Context',_ion_runtime_Context_);
    else
      _ion_runtime_Context_.call(this, module, exports, require);
  }
  else {
    _ion_runtime_Context_.call(this);
  }
}).call(this)
//# sourceMappingURL=./Context.map