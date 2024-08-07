# Use the official Node.js image as a base
FROM node:20-alpine

# Create and change to the app directory
WORKDIR /app

# Install Git and other dependencies
RUN apk add --no-cache git

# Clone the repository
RUN git clone https://github.com/jimchen2/markdown-parser .

# Install dependencies
RUN npm install
RUN npm install next

# Build the Next.js app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the Next.js app
CMD ["npm", "start"]