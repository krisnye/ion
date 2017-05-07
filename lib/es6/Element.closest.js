void (function(){var _ion_es6_Element_closest_ = function(module,exports,require){if (global.window && window.Element && !Element.prototype.closest) {
    Element.prototype.closest = 
    function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while ((i < 0) && (el = el.parentElement)); 
        return el;
    };
}
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/Element.closest',_ion_es6_Element_closest_);
    else
      _ion_es6_Element_closest_.call(this, module, exports, require);
  }
  else {
    _ion_es6_Element_closest_.call(this);
  }
}).call(this)