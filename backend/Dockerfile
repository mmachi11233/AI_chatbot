# Use a Node.js image as the builder
FROM node:18-alpine AS backend-builder

WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the entire application code to the image
COPY . . 

# Set the environment variable for production
ENV NODE_ENV=production

# Install any missing dependencies like @adonisjs/shield
RUN npm install @adonisjs/shield --production

# Use another Node.js image for the final container
FROM node:18-alpine

WORKDIR /app

# Copy everything from the builder stage to the final image
COPY --from=backend-builder /app . 

# Ensure the .env file is included (remove any previous .dockerignore block for it)
COPY --from=backend-builder /app/.env .env

EXPOSE 3333

# Command to run the app using AdonisJS (for v4)
CMD ["node", "server.js"]
