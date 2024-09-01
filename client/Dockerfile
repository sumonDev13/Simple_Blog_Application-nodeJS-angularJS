# Stage 1: Build the Angular application
FROM node:22 as build

WORKDIR /client

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:1.18-alpine

# Copy the build output to replace the default nginx contents
COPY --from=build /client/dist/client/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

#docker build . -t blog-client
#docker run -p 8008:80 -d blog-client
