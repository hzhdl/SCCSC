#!/bin/bash
#
##生成多个节点
#for ((i=0;i<=40;i+=1))
#do
#  cp -r ethgateway/ ethgateway${i}/
#  # shellcheck disable=SC2078
##  if [ i!=1 ]; then
#      sed -i.bak -e 's/8640/8645/g' ethgateway${i}/config/ethconfig.js
#      sed -i.bak -e 's/8641/8646/g' ethgateway${i}/config/ethconfig.js
#      sed -i.bak -e 's/3001/300'${i}'/g' ethgateway${i}/config/gateconfig.js
#      sed -i.bak -e 's/oraclegate2/oraclegate'${i}'/g' ethgateway${i}/config/gateconfig.js
##  fi
#done

#部署节点的配置文件

 for ((i=1;i<=5;i+=1))
 do
   rm -r CCSCCORE${i}/gateway/config/
   # shellcheck disable=SC2078
   cp -r ../deploy/config${i}/ CCSCCORE${i}/gateway/
   mv CCSCCORE${i}/gateway/config${i}/ CCSCCORE${i}/gateway/config/
 done
