#!/bin/bash
# shellcheck disable=SC2164
cd /usr/src/app/gateway/
nohup npm run start >> wwwlog.txt &
nohup npm run starto >> oraclelog.txt &
