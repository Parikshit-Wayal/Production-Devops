# Step 1: Build React/Vite assets
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve assets using lightweight Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Custom minimal nginx config to handle React SPA routing
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]