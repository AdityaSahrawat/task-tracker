# Use Node.js Alpine base image with AMD64 architecture
FROM --platform=linux/amd64 node:20-alpine

# Set working directory
WORKDIR /app

# Copy package definition files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy backend source files
COPY . .

# Expose the API port
EXPOSE 5000

# Run the Node.js application
CMD ["npm", "start"]
