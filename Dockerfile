FROM node:12.13.0-alpine AS builder

# Define working directory and copy source
WORKDIR /home/node/app

COPY . .

RUN npm install
RUN npm run build

FROM node:12.13.0-alpine
ENV NODE_ENV=production
WORKDIR /home/node/app

COPY ./package* ./
RUN npm install && \
  npm cache clean --force

COPY --from=builder /home/node/app/dist ./dist

EXPOSE 80

# Start the app
CMD npm run serve
