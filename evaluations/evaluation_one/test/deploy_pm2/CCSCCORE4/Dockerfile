# from 构建镜像的基础源镜像 该image镜像文件继承官方的node image
FROM node:16.0 AS ccscfisco

# 在容器中创建一个目录
RUN mkdir -p /usr/src/app/

# 定位到容器的工作目录
WORKDIR /usr/src/app/

# RUN/COPY是分层的，package.json 提前，只要没修改就不会重新安装包
#COPY gateway/package.json /usr/src/app/gateway/package.json
#COPY nodejs-sdk/ /usr/src/app/nodejs-sdk/
#RUN #npm install -g npm@9.7.1

# 把当前目录下所有的文件拷贝到 Image 的 /usr/src/app/目录下
COPY gateway/ /usr/src/app/gateway/
COPY nodejs-sdk/ /usr/src/app/nodejs-sdk/
COPY start.sh /usr/src/app/start.sh
RUN cd /usr/src/app/gateway/ && npm i

#EXPOSE 3000
#CMD cd /usr/src/app/gateway/
#CMD cat /usr/src/app/gateway/package.json
#CMD cd /usr/src/app/gateway/ && npm run start
CMD cd /usr/src/app/gateway/ && npm run starto
#CMD  echo "***************"
#CMD  cd /usr/src/app/gateway/ && nohup npm run start >> wwwlog.txt &
#CMD  cd /usr/src/app/gateway/ && nohup npm run starto >> oraclelog.txt &
#CMD  echo "----------------"
#CMD  cat /usr/src/app/gateway/wwwlog.txt
#CMD  cat /usr/src/app/gateway/oraclelog.txt
