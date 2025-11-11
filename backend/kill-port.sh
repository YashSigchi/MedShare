#!/bin/bash
# Script to kill process on port 5000

PORT=${1:-5000}
PID=$(lsof -ti:$PORT)

if [ -z "$PID" ]; then
    echo "Port $PORT is free"
    exit 0
else
    echo "Killing process $PID on port $PORT"
    kill -9 $PID
    echo "Port $PORT is now free"
fi

