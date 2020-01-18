FROM node:12-alpine
USER node
RUN mkdir -p /home/node/code
WORKDIR /home/node/code
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci
COPY --chown=node:node . .
CMD ["npm", "start"]

# docker build -t malta-api .
# docker run --init --rm -p 3001:3001 malta-api
