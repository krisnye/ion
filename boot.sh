#!/bin/bash

trap "kill 0" SIGINT SIGTERM EXIT

# watch ast
# nodemon -w ionast -w lib -i lib/ast2 -e ion,js -x yarn bootAst &

# guild build && yarn run watchGrammar &
# guild watch &
# nodemon -w lib -w src -w ionast -w external -e js,ts,ion --delay 150ms -x gtest lib &

wait