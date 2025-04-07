# Stage 1: Build backend
FROM node:18-alpine AS backend-builder

WORKDIR /app

COPY backend/package*.json ./
RUN npm install --production

COPY backend .


# Stage 2: Run backend
FROM node:18-alpine

WORKDIR /app

COPY --from=backend-builder /app .

EXPOSE 3333

CMD ["node", "server.js", "--dev"]
