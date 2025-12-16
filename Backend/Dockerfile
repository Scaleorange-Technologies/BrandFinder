# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /Backend

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the application
COPY . .

# Expose the port your app runs on
EXPOSE 3013

# Start the server
CMD ["node", "index.js"]
