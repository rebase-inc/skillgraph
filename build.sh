#!/bin/bash
RED="\033[0;31m"
NC="\033[0m"

type=${BASH_ARGV[0]:-dev}

echo -e "${RED}Building ${type} environment...${NC}"
docker-compose -f "layouts/${type}.yml" build
docker-compose -f "layouts/${type}.yml" up -d 
