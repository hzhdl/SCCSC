#!/bin/bash
#
##生成多个节点
#for ((i=2;i<50;i+=1))
#do
#  cp -r CCSCCORE/ CCSCCORE${i}/
#  # shellcheck disable=SC2078
##  if [ i!=1 ]; then
#      sed -i.bak -e 's/8640/8645/g' CCSCCORE${i}/gateway/config/ethconfig.js
#      sed -i.bak -e 's/8641/8646/g' CCSCCORE${i}/gateway/config/ethconfig.js
#      sed -i.bak -e 's/3000/300'${i}'/g' CCSCCORE${i}/gateway/config/gateconfig.js
#      sed -i.bak -e 's/oraclegate0/oraclegate'${i}'/g' CCSCCORE${i}/gateway/config/gateconfig.js
##      更新PBR和MMR的设置
#      sed -i.bak -e 's/6000/600'${i}'/g' CCSCCORE${i}/MMR_Monitor/config/mmrconfig.js
#      sed -i.bak -e 's/4000/400'${i}'/g' CCSCCORE${i}/PBR/config/pbr.js
##  fi
#done

#部署节点的配置文件

 for ((i=1;i<50;i+=1))
 do
   rm  CCSCCORE${i}/MMR_Monitor/routes/index.js
   rm  CCSCCORE${i}/MMR_Monitor/service/index.js
   # shellcheck disable=SC2078
   cp  CCSCCORE0/MMR_Monitor/routes/index.js     CCSCCORE${i}//MMR_Monitor/routes/index.js
   cp  CCSCCORE0/MMR_Monitor/service/index.js    CCSCCORE${i}/MMR_Monitor/service/index.js

 done
