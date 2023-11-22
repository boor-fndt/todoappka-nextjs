#!/bin/bash

cd /home/ubuntu/todoappka-nextjs

git pull origin main

npm install

pm2 stop all
pm2 delete all

npm run build

pm2 start npm --name nextjs-app -- run start -- -p 3000
