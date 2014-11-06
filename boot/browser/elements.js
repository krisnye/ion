void (function(){var _ion_browser_elements_ = function(module,exports,require){'use strict';
var ion = require('../');
var changeHandler = function change() {
    ion.checkForChanges();
};
var changeElements = {
        input: true,
        select: true,
        textarea: true
    };
var elements = [
        'div',
        'span',
        'input',
        'textarea',
        'a',
        'br',
        'img',
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
        'thead',
        'canvas',
        'head',
        'meta',
        'body',
        'script',
        'section',
        'header',
        'footer',
        'article',
        'ul',
        'ol',
        'li',
        'label',
        'strong'
    ];
var _ref = {};
for (var _i = 0; _i < elements.length; _i++) {
    var name = elements[_i];
    _ref[name] = function (name) {
        return function (attributes) {
            var element = document.createElement(name);
            if (changeElements[name]) {
                ion.add(element, changeHandler);
            }
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
module.exports = exports = _ref;
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