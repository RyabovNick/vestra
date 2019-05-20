FROM node:10-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# RUN mkdir -p /home/node/vestra && chown -R node:node /home/node/vestra
RUN mkdir -p /home/node/vestra/dist
RUN mkdir -p /usr/share/nginx/html

WORKDIR /home/node/vestra

# USER node

ADD ./dist/ /home/node/vestra

RUN ls

RUN ls ./dist

RUN ls /usr/share/nginx/html

RUN cp -r /home/node/vestra/dist/* /usr/share/nginx/html

RUN ls /usr/share/nginx/html

EXPOSE 3000

# CMD [ "pm2-runtime", "index.js" ]