void (function(){var _ion_Object_ = function(module,exports,require){'use strict';
var ion = require('./');
var Object = ion.defineClass({
        name: 'Object',
        constructor: function Object(properties) {
            if (properties != null) {
                for (var key in properties) {
                    var value = properties[key];
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
                var properties = {};
                if (this.constructor.id != null) {
                    properties[this.constructor.typeKey] = this.constructor.id;
                }
                {
                    var _ref = this;
                    for (var key in _ref) {
                        var value = _ref[key];
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