
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
            'strong',
            'svg',
            'path',
            'datalist'
        ];
    for (var _i = 0; _i < elements.length; _i++) {
        var name = elements[_i];
        var jsName = name[0].toUpperCase() + name.substring(1);
        window[jsName] = function (name) {
            var ion = require('ion');
            return function (attributes) {
                var element = document.createElement(jsName);
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
        }(name);
    }
}());