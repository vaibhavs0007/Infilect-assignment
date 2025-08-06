FROM node:20-alpine

# Define the build-time argument BEFORE it's used
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# React reads this env at build time
RUN npm run build

RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
