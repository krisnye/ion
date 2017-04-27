void (function(){var _ion_es6_CustomEvent_ = function(module,exports,require){

if (global.ActiveXObject || "ActiveXObject" in global) {
    (function(){
        console.warn("Shimming CustomEvent")
        function CustomEvent ( event, params ) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent( 'CustomEvent' );
            evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
            return evt;
        }
        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
    })()
}
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/CustomEvent',_ion_es6_CustomEvent_);
    else
      _ion_es6_CustomEvent_.call(this, module, exports, require);
  }
  else {
    _ion_es6_CustomEvent_.call(this);
  }
}).call(this)