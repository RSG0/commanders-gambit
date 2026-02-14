FROM node:22

WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

RUN touch commanders.jsonl && chmod 777 commanders.jsonl
EXPOSE 4000

# Default command (Docker Compose will override this)
CMD ["npm", "start"]