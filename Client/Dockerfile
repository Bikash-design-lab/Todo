# Build stage
FROM node:20-alpine AS build

# Working directory
WORKDIR /app

# Install dependencies and build the application
COPY package*.json ./

# install dependencies
RUN npm install 

# Copy all files
COPY . .

# Build the application with VITE_BASE_API
ARG VITE_BASE_API
ENV VITE_BASE_API=$VITE_BASE_API
RUN npm run build

# Production stage(srver with nginx)
FROM nginx:stable-alpine

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose Frontend port 80
EXPOSE 80


