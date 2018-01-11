#!/bin/bash

# Build todo-server
cd ./todo-server
npm install
npm run build
cd ..

# Build todo-ui
cd ./todo-ui
npm install
npm run build
cd ..

# Build package using Docker Compose
docker-compose build
