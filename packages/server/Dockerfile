FROM node:14.19.0-slim

COPY dist /app/app/
COPY processes.json /app/
COPY package.json /app/
COPY .yarnrc /app/
COPY yarn.lock /app/
COPY docker-entrypoint.sh /app/
COPY wait-for-it.sh /app/
COPY node_modules /app/node_modules/

#设置变量
ENV DATABASE=""
ENV USERNAME=""
ENV PASSWORD=""
ENV HOST=""
ENV PORT=""

WORKDIR /app

# RUN yarn config set registry https://registry.npmmirror.com
# RUN yarn global add pm2
# RUN yarn

EXPOSE 4000

RUN ["chmod", "+x", "/app/wait-for-it.sh"]
RUN ["chmod", "+x", "/app/docker-entrypoint.sh"]

# 等待数据库初始化完成后运行
CMD ./wait-for-it.sh $HOST:$PORT -- echo "Database is successfully initialized." ; ./docker-entrypoint.sh ; node app/server.js
