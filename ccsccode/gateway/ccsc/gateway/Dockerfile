# from 构建镜像的基础源镜像 该image镜像文件继承官方的node image
FROM node:16.0 AS www

# 在容器中创建一个目录
RUN mkdir -p /usr/src/app/

# 定位到容器的工作目录
WORKDIR /usr/src/app/

# RUN/COPY是分层的，package.json 提前，只要没修改就不会重新安装包
COPY package.json /usr/src/app/package.json
RUN cd /usr/src/app/
RUN npm install -g npm@9.7.1
RUN npm i

# 把当前目录下所有的文件拷贝到 Image 的 /usr/src/app/目录下
COPY . /usr/src/app/

EXPOSE 3000
CMD npm run start

FROM node:16.0 AS oracle

# 在容器中创建一个目录
RUN mkdir -p /usr/src/app/

# 定位到容器的工作目录
WORKDIR /usr/src/app/

# RUN/COPY是分层的，package.json 提前，只要没修改就不会重新安装包
COPY package.json /usr/src/app/package.json
RUN cd /usr/src/app/
RUN npm install -g npm@9.7.1
RUN npm i

# 把当前目录下所有的文件拷贝到 Image 的 /usr/src/app/目录下
COPY . /usr/src/app/

CMD npm run starto



FROM node:16.0 AS MMR_gate

# 在容器中创建一个目录
RUN mkdir -p /usr/src/app/

# 定位到容器的工作目录
WORKDIR /usr/src/app/

# RUN/COPY是分层的，package.json 提前，只要没修改就不会重新安装包
COPY package.json /usr/src/app/package.json
RUN cd /usr/src/app/
RUN npm install -g npm@9.7.1
RUN npm i

# 把当前目录下所有的文件拷贝到 Image 的 /usr/src/app/目录下
COPY . /usr/src/app/

CMD npm run startm
