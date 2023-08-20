#!/bin/bash
#
pm2 stop all
pm2 del all

for ((i=0;i<50;i+=1))
 do
   cd CCSCCORE${i}/PBR/
#   pwd
   pm2 start bin/index.js --name pbr${i} -i 3
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

#
# for ((i=1;i<50;i+=1))
# do
#   rm  CCSCCORE${i}/PBR/routes/index.js
#   rm  CCSCCORE${i}/PBR/config/pbrconfig.js
#   # shellcheck disable=SC2078
#   cp  CCSCCORE0/PBR/routes/index.js     CCSCCORE${i}/PBR/routes/index.js
#   cp  CCSCCORE0/PBR/config/pbrconfig.js   CCSCCORE${i}/PBR/config/pbrconfig.js
#
# done
