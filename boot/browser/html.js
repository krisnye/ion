void (function(){var _ion_browser_html_ = function(module,exports,require){var name, _fn, _i, _len, _ref;

_ref = ["div", "span", "input", "a", "br", "button", "caption", "fieldset", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "legend", "menu", "option", "select", "script", "pre", "table", "tbody", "td", "tr", "thead"];
_fn = function(name) {
  return exports[name] = function(properties) {
    var element, key, value;
    element = document.createElement(name);
    if (properties != null) {
      for (key in properties) {
        value = properties[key];
        element[key] = value;
      }
    }
    return element;
  };
};
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  name = _ref[_i];
  _fn(name);
}

  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/browser/html',_ion_browser_html_);
    else
      _ion_browser_html_.call(this, module, exports, require);
  }
  else {
    _ion_browser_html_.call(this);
  }
}).call(this)