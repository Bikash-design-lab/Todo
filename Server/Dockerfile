# Use official Node.js image
FROM node:20-alpine

# Set working directory 
WORKDIR /app

# Copy pakage.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Start the application
CMD ["node", "server.js"]