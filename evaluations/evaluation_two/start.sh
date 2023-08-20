#!/bin/bash

#启动三个预言网关
# shellcheck disable=SC2164
cd CCSCCORE1/gateway/
pm2 start bin/www.js
pm2 start bin/oracle.js

cd ../../CCSCCORE2/gateway/
pm2 start bin/www.js
pm2 start bin/oracle.js

cd ../../CCSCCORE3/gateway/
pm2 start bin/www.js
pm2 start bin/oracle.js


