void (function(){var _ion_es6_Map_ = function(module,exports,require){'use strict';
if (!(global.Map != null)) {
    function MapShim(pairs) {
        if (pairs != null) {
            for (var _i = 0; _i < pairs.length; _i++) {
                var _ref = pairs[_i];
                var key = _ref[0];
                var value = _ref[1];
                this.set(key, value);
            }
        }
        this.get = function (key) {
        };
        this.set = function (key, value) {
        };
        this.has = function (key) {
        };
        this.delete = function (key) {
        };
        this.clear = function () {
        };
    }
    global.Map = MapShim;
}
var test = exports.test = function () {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>> MAP HERE: ' + global.Map);
    };
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/Map',_ion_es6_Map_);
    else
      _ion_es6_Map_.call(this, module, exports, require);
  }
  else {
    _ion_es6_Map_.call(this);
  }
}).call(this)