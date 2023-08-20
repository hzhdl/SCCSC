#!/bin/bash

pm2 stop all
pm2 del all

#
#cd CCSCCORE0/MMR_Monitor/
#pm2 start bin/MMRMonitor --name mmr0
#cd ../../
for ((i=0;i<50;i+=1))
 do
   cd CCSCCORE${i}/MMR_Monitor/
#   pwd
   pm2 start bin/MMRMonitor --name mmr${i} -i 3
   cd ../../
 done

#cd CCSCCORE0/gateway/
##   pwd
#pm2 start bin/oracle.js --name oracle0
#cd ../../
#cd CCSCCORE1/gateway/
##   pwd
#pm2 start bin/oracle.js --name oracle1
#cd ../../

