#!/usr/bin/env node
const child_process = require('child_process')
function exec(cmd) {
    let proc = child_process.exec(cmd)
    proc.stdout.on('data', (x) => process.stdout.write(x))
    proc.stderr.on('data', (x) => process.stderr.write(x))
}
exec('nodemon -w src/parser.pegs -x pegs src/parser.pegs lib/parser.js')
exec('tsc -p . --watch')
exec('nodemon -w lib -w test -e js,ion lib/command.js test')