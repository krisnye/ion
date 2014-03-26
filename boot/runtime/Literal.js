'use strict';
const ion = require('ion');
const Literal = ion.defineClass({
        id: 'Literal',
        properties: {
            watch: function (watcher) {
                watcher(this.value);
            },
            unwatch: function (watcher) {
                watcher(void 0);
            }
        }
    }, require('./Expression'));
module.exports = exports = Literal;