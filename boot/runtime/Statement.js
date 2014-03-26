'use strict';
const ion = require('ion');
const Statement = ion.defineClass({
        id: 'Statement',
        properties: {
            isActive: false,
            activate: function () {
                this.isActive = true;
            },
            deactivate: function () {
                this.isActive = false;
            }
        }
    }, require('./Node'));
module.exports = exports = Statement;