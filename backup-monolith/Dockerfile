# ============================================================
# Dockerfile for Monolithic Node.js Express Application
# Purpose:
# This application follows a MONOLITHIC architecture where
# Authentication, Products, Cart, Orders, and User modules
# all run inside a SINGLE Node.js application and container.
#
# Benefits:
# - Easy development
# - Simple deployment
# - Lower infrastructure cost
# - Suitable for small/medium applications
# ============================================================

# Use lightweight official Node.js image
# Alpine reduces image size and improves security
FROM node:18-alpine

# Set working directory inside container
# All subsequent commands will execute from /app
WORKDIR /app

# Copy dependency files first
# This allows Docker layer caching
# If source code changes but dependencies don't,
# npm install layer will be reused
COPY package*.json ./

# Install only production dependencies
# Excludes devDependencies like nodemon, eslint etc.
# Reduces image size and attack surface
RUN npm install --production

# ------------------------------------------------------------
# Copy application source code
# ------------------------------------------------------------

# Main application entry point
COPY server.js ./

# Configuration files
# Example: Database connection, environment configs
COPY config/ ./config/

# Middleware components
# Example: Authentication, Logging, Error Handling
COPY middleware/ ./middleware/

# Database schemas/models
# Example: User, Product, Cart, Order models
COPY models/ ./models/

# API routes
# Example:
# /api/auth
# /api/products
# /api/cart
# /api/orders
COPY routes/ ./routes/

# Application listens internally on port 5000
# Note:
# EXPOSE is documentation only.
# Actual port publishing happens through:
# docker run -p 5000:5000
# or docker-compose ports section
EXPOSE 5000

# Start Node.js application
# Equivalent to running:
# node server.js
CMD ["node", "server.js"]
