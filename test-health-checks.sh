#!/bin/bash
# filepath: /Users/nelsonlamounier/Desktop/portfolio-projects/ViteProjects/nelsonPortfolio/fullstack-demo/test-health-checks.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Load test environment variables (filter out comments and empty lines)
if [ -f .env.test ]; then
    set -a
    source <(grep -v '^#' .env.test | grep -v '^$')
    set +a
fi

# Allow port override via command line arguments
FRONTEND_PORT=${1:-${FRONTEND_PORT:-3002}}
BACKEND_PORT=${2:-${BACKEND_PORT:-4000}}

echo -e "${YELLOW}Starting health check tests...${NC}"
echo -e "${YELLOW}Using FRONTEND_PORT=$FRONTEND_PORT, BACKEND_PORT=$BACKEND_PORT${NC}"

# Function to check if service is healthy
check_health() {
    local service=$1
    local port=$2
    local max_attempts=30
    local attempt=1

    echo -e "${YELLOW}Checking $service health on port $port...${NC}"

    while [ $attempt -le $max_attempts ]; do
        if curl -f -s "http://localhost:$port/healthcheck" > /dev/null; then
            echo -e "${GREEN}✓ $service is healthy (attempt $attempt)${NC}"
            return 0
        fi
        
        echo -e "Attempt $attempt/$max_attempts failed, waiting 2 seconds..."
        sleep 2
        attempt=$((attempt + 1))
    done

    echo -e "${RED}✗ $service health check failed after $max_attempts attempts${NC}"
    return 1
}

# Function to debug container issues
debug_containers() {
    echo -e "${YELLOW}Debugging container status...${NC}"
    docker-compose --env-file .env.test ps
    
    echo -e "${YELLOW}Backend container logs:${NC}"
    docker-compose --env-file .env.test logs backend
    
    echo -e "${YELLOW}Frontend container logs:${NC}"
    docker-compose --env-file .env.test logs frontend
    
    echo -e "${YELLOW}Checking if ports are accessible...${NC}"
    if nc -z localhost $BACKEND_PORT 2>/dev/null; then
        echo -e "${GREEN}✓ Backend port $BACKEND_PORT is open${NC}"
    else
        echo -e "${RED}✗ Backend port $BACKEND_PORT is not accessible${NC}"
    fi
    
    if nc -z localhost $FRONTEND_PORT 2>/dev/null; then
        echo -e "${GREEN}✓ Frontend port $FRONTEND_PORT is open${NC}"
    else
        echo -e "${RED}✗ Frontend port $FRONTEND_PORT is not accessible${NC}"
    fi
}

# Function to test dynamic port assignment
test_dynamic_ports() {
    echo -e "${YELLOW}Testing dynamic port assignment...${NC}"
    
    # Generate random available ports
    local random_frontend_port=$(python3 -c "import socket; s=socket.socket(); s.bind(('',0)); print(s.getsockname()[1]); s.close()")
    local random_backend_port=$(python3 -c "import socket; s=socket.socket(); s.bind(('',0)); print(s.getsockname()[1]); s.close()")
    
    echo "Testing with random ports: FRONTEND_PORT=$random_frontend_port, BACKEND_PORT=$random_backend_port"
    
    # Stop existing containers
    docker-compose --env-file .env.test down
    
    # Start with random ports
    FRONTEND_PORT=$random_frontend_port BACKEND_PORT=$random_backend_port docker-compose --env-file .env.test up -d
    
    # Wait for services to start
    sleep 15
    
    # Check health on random ports
    if check_health "backend" $random_backend_port && check_health "frontend" $random_frontend_port; then
        echo -e "${GREEN}✓ Dynamic port assignment works with random ports!${NC}"
    else
        echo -e "${RED}✗ Dynamic port assignment failed with random ports${NC}"
        docker-compose --env-file .env.test logs
        exit 1
    fi
    
    # Stop containers before continuing
    docker-compose --env-file .env.test down
}

# Function to test multiple port configurations
test_multiple_ports() {
    echo -e "${YELLOW}Testing multiple port configurations...${NC}"
    
    local port_configs=(
        "3000 4000"
        "3001 4001"
        "8080 8081"
    )
    
    for config in "${port_configs[@]}"; do
        local ports=($config)
        local test_frontend_port=${ports[0]}
        local test_backend_port=${ports[1]}
        
        echo -e "${YELLOW}Testing ports: Frontend=$test_frontend_port, Backend=$test_backend_port${NC}"
        
        FRONTEND_PORT=$test_frontend_port BACKEND_PORT=$test_backend_port docker-compose --env-file .env.test up -d
        sleep 10
        
        if check_health "backend" $test_backend_port && check_health "frontend" $test_frontend_port; then
            echo -e "${GREEN}✓ Ports $test_frontend_port/$test_backend_port work!${NC}"
        else
            echo -e "${RED}✗ Ports $test_frontend_port/$test_backend_port failed${NC}"
        fi
        
        docker-compose --env-file .env.test down
        sleep 2
    done
}

# Main test sequence
echo -e "${YELLOW}Building and starting services...${NC}"
FRONTEND_PORT=$FRONTEND_PORT BACKEND_PORT=$BACKEND_PORT docker-compose --env-file .env.test up -d --build

echo -e "${YELLOW}Waiting for services to start...${NC}"
sleep 30

# Check container status first
echo -e "${YELLOW}Checking container status...${NC}"
docker-compose --env-file .env.test ps

# Debug if containers are not healthy
if ! docker-compose --env-file .env.test ps | grep -q "healthy"; then
    echo -e "${RED}Containers are not healthy, debugging...${NC}"
    debug_containers
    echo -e "${RED}Stopping here due to unhealthy containers${NC}"
    docker-compose --env-file .env.test down
    exit 1
fi

# Test default ports
echo -e "${YELLOW}Testing default port configuration...${NC}"
if check_health "backend" $BACKEND_PORT && check_health "frontend" $FRONTEND_PORT; then
    echo -e "${GREEN}✓ All services are healthy on default ports!${NC}"
else
    echo -e "${RED}✗ Health checks failed on default ports${NC}"
    debug_containers
    docker-compose --env-file .env.test down
    exit 1
fi

# Test dynamic port assignment
test_dynamic_ports

# Test multiple port configurations
test_multiple_ports

# Test service communication
echo -e "${YELLOW}Testing service communication...${NC}"
# Start services with the original ports for final communication test
FRONTEND_PORT=$FRONTEND_PORT BACKEND_PORT=$BACKEND_PORT docker-compose --env-file .env.test up -d
sleep 10

if curl -f -s "http://localhost:$FRONTEND_PORT" > /dev/null; then
    echo -e "${GREEN}✓ Frontend is accessible${NC}"
else
    echo -e "${RED}✗ Frontend is not accessible${NC}"
fi

if curl -f -s "http://localhost:$BACKEND_PORT" > /dev/null; then
    echo -e "${GREEN}✓ Backend is accessible${NC}"
else
    echo -e "${RED}✗ Backend is not accessible${NC}"
fi

echo -e "${GREEN}All tests passed! 🎉${NC}"

# Cleanup
echo -e "${YELLOW}Cleaning up...${NC}"
docker-compose --env-file .env.test down

echo -e "${GREEN}Health check tests completed successfully!${NC}"