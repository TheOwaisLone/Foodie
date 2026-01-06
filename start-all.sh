#!/bin/bash

echo "🚀 Starting Foodie project..."

# Backend
echo "Starting backend..."
(
  cd backend || exit
  npm start
) &
BACKEND_PID=$!

# Frontend
echo "Starting frontend..."
(
  cd frontend || exit
  npm run dev
) &
FRONTEND_PID=$!

# Admin
echo "Starting admin panel..."
(
  cd admin || exit
  npm run dev
) &
ADMIN_PID=$!

echo "✅ All services started!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Admin PID: $ADMIN_PID"

wait
