#!/bin/bash

# Register a random user
RANDOM_NUM=$RANDOM
echo "Testing Registration with user${RANDOM_NUM}..."
curl -v -X POST -H "Content-Type: application/json" \
  -d '{"username":"testuser_'"${RANDOM_NUM}"'","email":"testuser'"${RANDOM_NUM}"'@gmail.com","password":"Password123!","role":"job_seeker"}' \
  http://localhost:5001/api/auth/register
echo -e "\n\n"

# Login with a fixed user (create if needed)
echo "Ensuring login user exists..."
curl -s -X POST -H "Content-Type: application/json" \
  -d '{"username":"loginuser","email":"loginuser@gmail.com","password":"Password123!","role":"job_seeker"}' \
  http://localhost:5001/api/auth/register > /dev/null

echo "Testing Login with loginuser..."
curl -v -X POST -H "Content-Type: application/json" \
  -d '{"email":"loginuser@gmail.com","password":"Password123!"}' \
  http://localhost:5001/api/auth/login
echo -e "\n"
