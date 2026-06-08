# Step 1: Base build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# Step 2: Production runtime stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app /app

EXPOSE 5000
CMD ["node", "server.js"]