FROM node:10-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# RUN mkdir -p /home/node/vestra && chown -R node:node /home/node/vestra
RUN mkdir -p /home/node/vestra/dist
RUN mkdir -p /usr/share/nginx/html

WORKDIR /home/node/vestra

# USER node
ADD ./dist/ /home/node/vestra
EXPOSE 3000

CMD cp -r /home/node/vestra/* /usr/share/nginx/html