#!/bin/bash

for ((i=1;i<=5;i+=1))
 do
   cd CCSCCORE${i}/gateway/
   pwd
   pm2 start bin/process.json
   cd ../../
 done
