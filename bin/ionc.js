#!/usr/bin/env node
const path = require("path");
const [,,output,...inputs] = process.argv;

if (inputs.length == 0) {
    //  if they don't provide a command then we display usage and available commands
    console.log(
`
    Usage: ionc output input1 input2...

`);
    return 1
} else {
    // always add our local ionsrc directory to the inputs
    inputs.push(path.join(__dirname, "..", "ionsrc"));
    const { default: Compiler, Options } = require("../lib/Compiler");
    let options = new Options(inputs, output);
    // let logger = (names, ast) => { console.log(names) };
    let compiler = new Compiler();
    compiler.compile(options);
    return 0;
}
