#! /bin/bash

kill -9 `pgrep node`
mkdir -p ../logs
forever -p .. -m 5 server/faye_cluster.js --colors -w -v -l logs/forever.log -o  logs/stdout.log -e  logs/stderr.log  &
