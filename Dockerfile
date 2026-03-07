#The pre-built Dockerhub image is used for the project
FROM node:20-slim

#We installed OpenSSL, which is necessary for Prisma to work on Linux
RUN apt-get update -y && apt-get install -y openssl

#We create a folder in virtual machine, and next instructions execute and save here
WORKDIR /app

#We only copy the archive with dependencies
COPY package*.json ./
COPY prisma ./prisma/

#Copy all proyect on virtual machine
COPY . .

#installed dependencies
RUN npm install
RUN npx prisma generate

#Copy all proyect
RUN npm run build

#Expose on port 3000
EXPOSE 3000

#Execute server on dist
CMD ["node", "dist/server.js"]