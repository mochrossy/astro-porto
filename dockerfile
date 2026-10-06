FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh source code
COPY . .

# Expose port Astro
EXPOSE 4321

# Jalankan dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]