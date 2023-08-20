#  ！！！请先修改配置，修改每个网关的配置和跨链合约组件的配置，包含以下文件
# 网关下的config文件夹下，
# ccscconfig.js    跨链合约组件相关配置，注意使用公开的IP
# gateconfig.js    预言网关的相关配置，注意使用公开IP，不要使用127.0.0.1
# ethconfig.js     链配置，可根据网关具体的链来配置
# chain文件夹是链注册以后的数据存储
# contractstate文件夹存储注册的合约函数接口的数据。
# shellcheck disable=SC2034
ogatepath1="../gateway/ethgateway/oraclegate1/ethgateway/bin/"
ogatepath2="../gateway/ethgateway/oraclegate2/ethgateway/bin/"
ogatepath3="../gateway/fiscogateway/oraclegate1/ethgateway/bin/"
ogatepath4="../gateway/fiscogateway/oraclegate2/ethgateway/bin/"

basepath="../gateway/ccsc/ethgateway"

##清理数据
#echo "============数据清理============"
## shellcheck disable=SC2034
#gatepath1="../gateway/ethgateway/oraclegate1/ethgateway/config/"
## shellcheck disable=SC1083
#rm -rf ${gatepath1}chain/*
## shellcheck disable=SC1083
#rm -rf ${gatepath1}contractstate/*
## shellcheck disable=SC1083
#rm -f ${gatepath1}contractstate.json
#
## shellcheck disable=SC1007
#gatepath2="../gateway/ethgateway/oraclegate2/ethgateway/config/"
## shellcheck disable=SC2154
## shellcheck disable=SC1083
#rm -rf ${gatepath2}chain/*
## shellcheck disable=SC1083
#rm -rf ${gatepath2}contractstate/*
## shellcheck disable=SC1083
#rm -f ${gatepath2}contractstate.json
#echo "============数据清理完成============"

echo "============启动链================="
nohup pm2 start ${basepath}0/bin/www.js -i 5
nohup pm2 start ${basepath}0/bin/oracle.js >> ${basepath}0/bin/oracle.log 2>&1 &

#for ((i=1;i<=1;i+=1))
#do
#  nohup pm2 start ${basepath}${i}/bin/www.js
#  nohup pm2 start ${basepath}${i}/bin/oracle.js >> ${basepath}${i}/bin/oracle.log 2>&1 &
#done

#nohup pm2 start ${ogatepath1}www.js -i 10
#nohup pm2 start ${ogatepath1}oracle.js >> ${ogatepath1}oracle.log 2>&1 &
#nohup pm2 start ${ogatepath2}www.js -i 10
##nohup pm2 start ${ogatepath2}oracle.js >> ${ogatepath2}oracle.log 2>&1 &
#nohup pm2 start ${ogatepath3}www.js -i 8
#nohup pm2 start ${ogatepath3}oracle.js >> ${ogatepath3}oracle.log 2>&1 &
#nohup pm2 start ${ogatepath4}www.js -i 8
#nohup pm2 start ${ogatepath4}oracle.js >> ${ogatepath4}oracle.log 2>&1 &



#nohup pm2 start ${ogatepath1}www.js >> ${ogatepath1}www.log 2>&1 &
#nohup pm2 start ${ogatepath1}oracle.js >> ${ogatepath1}oracle.log 2>&1 &
#nohup pm2 start ${ogatepath2}www.js >> ${ogatepath2}www.log 2>&1 &
#nohup pm2 start ${ogatepath2}oracle.js >> ${ogatepath2}oracle.log 2>&1 &
#nohup pm2 start ${ogatepath3}www.js >> ${ogatepath3}www.log 2>&1 &
#nohup pm2 start ${ogatepath3}oracle.js >> ${ogatepath3}oracle.log 2>&1 &
#nohup pm2 start ${ogatepath4}www.js >> ${ogatepath4}www.log 2>&1 &
#nohup pm2 start ${ogatepath4}oracle.js >> ${ogatepath4}oracle.log 2>&1 &
echo "============启动链结束，使用 pm2 monit进行查看================="

##启动
#echo "============链注册============"
##注册链
#node ./test/init.js
#echo "============链注册完成============"
#
#echo "============合约注册&订阅============"
##注册链  默认注册两条链
##订阅    默认由链一订阅第二条链的某个合约
#npx hardhat test test/deploy.js
#echo "============合约注册&订阅完成============"

#echo "============合约订阅============"
##注册链
#node ./test/init.js
#echo "============合约订阅完成============"

