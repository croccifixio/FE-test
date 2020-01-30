FROM node:12
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package*.json ./
RUN npm i
COPY . .
CMD ["npm", "run", "dev"]

# docker build -t malta-front .
# docker run --init --rm -p 3000:3000 malta-front
