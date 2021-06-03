#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const yargs = require("yargs");
const clean = (dir) => dir.endsWith("/") ? dir.slice(0, -1) : dir

yargs
    .command({
        command: "* <input> <output> [namespace]",
        description: "compile input directory to output directory",
        handler({ input, output, namespace, watch }) {
            input = clean(input)
            output = clean(output)
            const { default: Compiler, Options } = require("../lib/compiler/Compiler");
            let options = new Options([input], output, namespace);
            options.commandLine = true
            let compiler = new Compiler();
            compiler[watch ? "watch" : "compile"](options);
        }
    })
    .option('watch', {
        alias: 'w',
        description: 'Watch and incrementally recompile',
        type: 'boolean',
    })
    .help()
    .parse()