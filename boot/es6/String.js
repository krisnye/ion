void (function(){var _ion_es6_String_ = function(module,exports,require){// if (!String.prototype.endsWith) {
//     Object.defineProperty(String.prototype, 'endsWith', {
//         value: function (searchString, position) {
//             position = position || this.length;
//             position = position - searchString.length;
//             var lastIndex = this.lastIndexOf(searchString);
//             return lastIndex !== -1 && lastIndex === position;
//         }
//     });
// }

// if (!String.prototype.startsWith) {
//   Object.defineProperty(String.prototype, 'startsWith', {
//     value: function (searchString, position) {
//       position = position || 0;
//       return this.indexOf(searchString, position) === position;
//     }
//   });
// }

// deprecated in favor of includes
if (!String.prototype.contains ) {
    String.prototype.contains = function() {
        return this.indexOf(arguments) !== -1;
    };
}

if (!String.prototype.includes ) {
    String.prototype.includes = function() {
        return this.indexOf(arguments) !== -1;
    };
}
  }
  if (typeof require === 'function') {
    if (require.register)
      require.register('ion/es6/String',_ion_es6_String_);
    else
      _ion_es6_String_.call(this, module, exports, require);
  }
  else {
    _ion_es6_String_.call(this);
  }
}).call(this)