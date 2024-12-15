# Use a lightweight Node.js base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the production version of the app
RUN npm run build

# Install a simple static file server
RUN npm install -g serve

# Expose the port the frontend will run on
EXPOSE 3000

# Run the static file server to serve the React app
CMD ["serve", "-s", "build", "-l", "3000"]
