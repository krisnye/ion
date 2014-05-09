void (function(){var _ion_browser_elements_ = function(module,exports,require){'use strict';
var _ref2 = {};
{
    {
        var _ref = [
                'div',
                'span',
                'input',
                'a',
                'br',
                'button',
                'caption',
                'fieldset',
                'form',
                'frame',
                'frameset',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                'hr',
                'legend',
                'menu',
                'option',
                'select',
                'script',
                'pre',
                'table',
                'tbody',
                'td',
                'tr',
                'thead'
            ];
        for (var _i = 0; _i < _ref.length; _i++) {
            var name = _ref[_i];
            _ref2[name] = function (name) {
                return function (attributes) {
                    var element = document.createElement(name);
                    if (attributes != null) {
                        for (var key in attributes) {
                            var value = attributes[key];
                            element.setAttribute(key, value);
                        }
                    }
                    return element;
                };
            }(name);
        }
    }
}
module.exports = exports = _ref2;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/browser/elements',_ion_browser_elements_);
    else
      _ion_browser_elements_.call(this, module, exports, require);
  }
  else {
    _ion_browser_elements_.call(this);
  }
}).call(this)
//@ sourceMappingURL=./elements.map