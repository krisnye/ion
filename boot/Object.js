void (function(){var _ion_Object_ = function(module,exports,require){'use strict';
const ion = require('./');
const Object = ion.defineClass({
        name: 'Object',
        constructor: function Object(properties) {
            if (properties != null) {
                for (let key in properties) {
                    let value = properties[key];
                    this[key] = value;
                }
            }
        },
        toString: function () {
            return this.name;
        },
        typeKey: '$',
        properties: {
            toJSON: function () {
                const properties = {};
                if (this.constructor.id != null) {
                    properties[this.constructor.typeKey] = this.constructor.id;
                }
                {
                    let _ref = this;
                    for (let key in _ref) {
                        let value = _ref[key];
                        if (this.hasOwnProperty(key)) {
                            properties[key] = value;
                        }
                    }
                }
                return properties;
            }
        }
    }, null);
module.exports = exports = Object;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/Object',_ion_Object_);
    else
      _ion_Object_.call(this, module, exports, require);
  }
  else {
    _ion_Object_.call(this);
  }
}).call(this)