#!/bin/bash

trap "kill 0" SIGINT SIGTERM EXIT

# watch ast
nodemon -w ionast -w ../ion/lib -e ion,js -x yarn buildAst &

guild build && yarn run watchGrammar &
guild watch &
nodemon -w lib -w src -w ionsrc -w ionast -w external -e js,ts,ion --delay 150ms -x gtest lib &

wait