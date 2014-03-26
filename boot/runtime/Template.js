'use strict';
const ion = require('ion');
const BlockStatement = require('./BlockStatement'), DynamicExpression = require('./DynamicExpression');
const Template = ion.defineClass({
        id: 'Template',
        constructor: function Template() {
            Template.super.apply(this, arguments);
            this.context.returnExpression = new DynamicExpression();
        },
        properties: {
            watch: function (watcher) {
                if (!this.isActive) {
                    throw new Error('You must activate a Template before you watch it.');
                }
                this.context.returnExpression.watch(watcher);
            },
            unwatch: function (watcher) {
                this.context.returnExpression.unwatch(watcher);
            }
        }
    }, BlockStatement);
module.exports = exports = Template;