
FROM node:18-alpine AS backend-builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

RUN npm run build


FROM node:18-alpine

WORKDIR /app

COPY --from=backend-builder /app .

EXPOSE 3333

CMD ["node", "server.js", "--dev"]
