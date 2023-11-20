#!/bin/bash

cd /home/ubuntu/todoappka-nextjs

# Aktualizujte kód zo vzdialeného repozitára (GitHub)
git pull origin main

# Nainštalujte alebo aktualizujte závislosti
npm install

# Zastavte existujúci proces Next.js
pm2 stop all

# Spustite Next.js aplikáciu cez PM2
pm2 start npm --name nextjs-app -- run start -- -p 3000
