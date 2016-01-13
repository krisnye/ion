void (function(){var _ion_Object_ = function(module,exports,require){'use strict';
var ion = require('./');
var typeKey = '$';
var _ref2 = {};
{
    _ref2[typeKey] = ion.patch(_ref2[typeKey], {
        visible: false,
        type: 'string',
        get: function () {
            return this.constructor.id;
        },
        set: function () {
        }
    });
    _ref2.toJSON = function () {
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
    };
}
var Object = ion.defineClass({
        name: 'Object',
        constructor: function Object(properties) {
            for (var _i = 0; _i < arguments.length; _i++) {
                var arg = arguments[_i];
                if (arg != null) {
                    for (var key in arg) {
                        var value = arg[key];
                        var value = arg[key];
                        this[key] = value;
                    }
                }
            }
        },
        typeKey: typeKey,
        is: function (object) {
            return object != null ? object.constructor.types != null ? object.constructor.types.has != null ? object.constructor.types.has(this) : void 0 : void 0 : void 0;
        },
        properties: _ref2,
        test: function () {
            var object = new Object();
            if (!Object.is(object))
                throw new Error('Assertion Failed: (Object.is(object))');
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