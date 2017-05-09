
'use strict';
(function () {
    if (!(global.window != null)) {
        return;
    }
    var defaultNS = 'http://www.w3.org/1999/xhtml';
    var capitalize = function (x) {
        return x[0].toUpperCase() + x.substring(1);
    };
    var registerElements = function (elements, ns) {
        if (ns == null)
            ns = defaultNS;
        for (var _i = 0; _i < elements.length; _i++) {
            var name = elements[_i];
            var jsName = name.split('-').map(capitalize).join('');
            window[jsName] = function (ns, name) {
                return function (attributes) {
                    var ion = require('ion');
                    var isValue = void 0;
                    for (var _i2 = 0; _i2 < arguments.length; _i2++) {
                        var arg = arguments[_i2];
                        if ((arg != null ? arg.is : void 0) != null) {
                            isValue = arg.is;
                        }
                    }
                    var element = document.createElementNS(ns, name, isValue);
                    for (var _i3 = 0; _i3 < arguments.length; _i3++) {
                        var arg = arguments[_i3];
                        if (arg != null) {
                            for (var key in arg) {
                                var value = arg[key];
                                if (value != null) {
                                    element.setAttribute(key, value);
                                }
                            }
                        }
                    }
                    return element;
                };
            }(ns, name);
        }
    };
    global.registerElements = registerElements;
    var syncOnRefresh = function (e) {
        var ion = require('ion');
        requestAnimationFrame(ion.sync);
    };
    window.addEventListener('hashchange', syncOnRefresh);
    window.addEventListener('transitionstart', syncOnRefresh);
    window.addEventListener('transitionend', syncOnRefresh);
    window.document.addEventListener('keypress', syncOnRefresh);
    window.document.addEventListener('keydown', syncOnRefresh);
    window.document.addEventListener('keyup', syncOnRefresh);
    var nsElements = {
            'http://www.w3.org/1999/xhtml': [
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
                'strong',
                'datalist'
            ],
            'http://www.w3.org/2000/svg': [
                'svg',
                'path',
                'circle',
                'text'
            ]
        };
    for (var ns in nsElements) {
        var elements = nsElements[ns];
        registerElements(elements, ns);
    }
}());