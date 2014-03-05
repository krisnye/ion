'use strict';
const makePrettyError = function (e, source, id) {
    if (typeof e.line === 'number' && typeof e.column === 'number' && e.line > 0 && e.column > 0) {
        let line = source.split('\n')[e.line - 1];
        let caret = '^';
        for (let i = 1; i < e.column; i++) {
            caret = ' ' + caret;
        }
        let newMessage = '' + (id != null ? id : '(anonymous)') + ':' + e.line + ':' + e.column + ': ' + e.message + '\n' + line + '\n' + caret;
        e.originalMessage = e.message;
        e.message = newMessage;
        e.stack = newMessage;
    }
};
const parse = exports.parse = function (content, options) {
        if (options == null)
            options = {};
        options.generate = false;
        return compile(content, options);
    };
const compile = exports.compile = function (content, options) {
        if (options == null)
            options = {};
        options.loc = options.loc != null ? options.loc : true;
        const preprocessor = require('./preprocessor');
        const parser = require('./parser');
        const postprocessor = require('./postprocessor');
        const escodegen = require('escodegen');
        let sourceMapping = {};
        let result = preprocessor.preprocess(content, sourceMapping);
        let preprocessed = result;
        let sourceLocationsFixed = false;
        try {
            result = parser.parse(result, options != null ? options : {});
            result = preprocessor.fixSourceLocations(result, sourceMapping);
            sourceLocationsFixed = true;
            if (options.postprocess !== false) {
                result = postprocessor.postprocess(result, options);
                if ((options != null ? options.generate : void 0) !== false) {
                    result = escodegen.generate(result);
                }
            }
        } catch (e) {
            if (!sourceLocationsFixed) {
                preprocessor.fixSourceLocation(e, sourceMapping);
            }
            makePrettyError(e, content, options.id);
            throw e;
        }
        return result;
    };