ogatepath1="../gateway/ethgateway/oraclegate1/ethgateway/bin/"
ogatepath2="../gateway/ethgateway/oraclegate2/ethgateway/bin/"
ogatepath3="../gateway/fiscogateway/oraclegate1/ethgateway/bin/"
ogatepath4="../gateway/fiscogateway/oraclegate2/ethgateway/bin/"

echo "============停止链================="
#pm2 stop ${ogatepath1}www.js
#pm2 stop ${ogatepath1}oracle.js
#pm2 stop ${ogatepath2}www.js
#pm2 stop ${ogatepath2}oracle.js
#pm2 stop ${ogatepath3}www.js
#pm2 stop ${ogatepath3}oracle.js
#pm2 stop ${ogatepath4}www.js
#pm2 stop ${ogatepath4}oracle.js

pm2 stop all

pm2 del all
echo "============停止链完成================="
