# Use an official Node.js image from the Docker Hub
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY Server/package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY Server/ ./

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["node", "server.js"]