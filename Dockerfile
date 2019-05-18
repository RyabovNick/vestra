FROM node:10-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# RUN mkdir -p /home/node/vestra && chown -R node:node /home/node/vestra

WORKDIR /home/node/vestra

# USER node

ADD . /home/node/vestra

RUN mkdir /home/node/vestra/logs
RUN chmod 755 /home/node/vestra/logs

EXPOSE 3000

# CMD [ "pm2-runtime", "index.js" ]