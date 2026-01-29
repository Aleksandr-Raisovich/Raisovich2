# Use Nginx to serve static files
FROM nginx:alpine

# Copy the static website files to the Nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# The default command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
