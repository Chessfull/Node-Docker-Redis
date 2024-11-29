# Use Node.js base image - my node version 20 in this project
FROM node:20 

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
