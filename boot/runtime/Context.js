void (function(){var _ion_runtime_Context_ = function(module,exports,require){'use strict';
const ion = require('../'), Factory = require('./Factory'), Literal = require('./Literal');
const Context = ion.defineClass({
        name: 'Context',
        constructor: function Context(parent, output) {
            this.output = output;
            this.parent = parent;
            this.variables = {};
            this.root = (this.parent != null ? this.parent.root : void 0) != null ? this.parent.root : this;
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
                let variable = this.getVariable(name);
                if (!(variable != null)) {
                    throw new Error('Variable not found: \'' + name + '\'');
                }
                let value = variable.value;
                if (value === void 0) {
                    let watcher = function (a) {
                        if (a !== void 0) {
                            value = a;
                        }
                    };
                    variable.watch(watcher);
                    variable.unwatch(watcher);
                }
                return value;
            },
            getVariable: function (name) {
                return this.variables[name] != null ? this.variables[name] : this.parent != null ? this.parent.getVariable(name) : void 0;
            },
            setVariable: function (name, node) {
                if (name != null) {
                    let variable = this.variables[name] = this.createRuntime(node);
                    return variable;
                }
            },
            getVariableExpression: function (name) {
                let context = this, value;
                while (context != null) {
                    let variable = context.variables[name];
                    if (variable != null) {
                        return variable;
                    }
                    context = context.parent;
                }
                value = global[name];
                if (value === void 0) {
                    throw new Error('Variable not found: \'' + name + '\'');
                }
                let cachedGlobals = this.root.globals = this.root.globals != null ? this.root.globals : {};
                return cachedGlobals[name] = cachedGlobals[name] != null ? cachedGlobals[name] : new Literal({ value: value });
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