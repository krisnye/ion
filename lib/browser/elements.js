
'use strict';
(function () {
    if (!(global.window != null)) {
        return;
    }
    if (global.window != null) {
        window.addEventListener('hashchange', function (e) {
            var ion = require('ion');
            requestAnimationFrame(ion.sync);
        });
    }
    var changeElements = {
            input: true,
            select: true,
            textarea: true
        };
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
        for (var _i = 0; _i < elements.length; _i++) {
            var name = elements[_i];
            var jsName = name[0].toUpperCase() + name.substring(1);
            window[jsName] = function (ns, name) {
                return function (attributes) {
                    var ion = require('ion');
                    var element = document.createElementNS(ns, name);
                    if (changeElements[name]) {
                        element.addEventListener('change', ion.sync);
                    }
                    for (var _i2 = 0; _i2 < arguments.length; _i2++) {
                        var arg = arguments[_i2];
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
    }
}());