# Use an official Node.js LTS (Long Term Support) image as the base
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the app dependencies
RUN npm install --legacy-peer-deps

# Copy the entire app directory to the container
COPY . .

# Build the React app for production
# RUN npm run build

# Expose port 80 for the container
EXPOSE 80

# Define the command to run the app when the container starts
CMD ["npm", "run", "start"]