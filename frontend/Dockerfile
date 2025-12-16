# Use Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /frontend

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Expose frontend port (change if needed)
EXPOSE 3014

# Start frontend
CMD ["npm", "start"]
