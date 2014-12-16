void (function(){var _ion_browser_element_ = function(module,exports,require){'use strict';
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
        'p',
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
var elementFactory = function (name, attributes, change) {
    var element = document.createElement(name);
    if (change) {
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
var _ref = elementFactory;
for (var _i = 0; _i < elements.length; _i++) {
    var name = elements[_i];
    _ref[name] = function (name) {
        return function (attributes) {
            return elementFactory(name, attributes, changeElements[name]);
        };
    }(name);
}
module.exports = exports = _ref;
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/browser/element',_ion_browser_element_);
    else
      _ion_browser_element_.call(this, module, exports, require);
  }
  else {
    _ion_browser_element_.call(this);
  }
}).call(this)
//# sourceMappingURL=./element.map