#!/bin/bash
RED="\033[0;31m"
NC="\033[0m"

prompt() {
  read -e -p "$1 [$2]: " var
  echo ${var:-$2}
}
abspath() {
  echo "$(cd "$(dirname "$1")"; pwd)/$(basename "$1")"
}

export PYTHON_IMPACT_REPO=${PYTHON_IMPACT_REPO:-$(abspath $(prompt "Python Impact Repo" "../python-impact"))}
export JAVASCRIPT_IMPACT_REPO=${JAVASCRIPT_IMPACT_REPO:-$(abspath $(prompt "Javascript Impact Repo" "../javascript-impact"))}

export LOGGING_SERVER_REPO=${LOGGING_SERVER_REPO:-$(abspath $(prompt "Logging Server Repo" "../logging-server"))}

export JOB_QUEUE_REPO=${JOB_QUEUE_REPO:-$(abspath $(prompt "Job Queue Repo" "../job-queue"))}
export REST_API_REPO=${REST_API_REPO:-$(abspath $(prompt "REST API repo" "../rest-api"))}
export PROXY_REPO=${PROXY_REPO:-$(abspath $(prompt "proxy repo" "../proxy"))}

export DOCKERHOST=$(docker-machine ip vmw)
export PYPI_SERVER_HOST=${PYPI_SERVER_HOST:-$(prompt "PyPI server host" "$DOCKERHOST")}
export PYPI_SERVER_SCHEME=${PYPI_SERVER_SCHEME:-$(prompt "PyPI server scheme" "http://")}
export PYPI_SERVER_PORT=${PYPI_SERVER_PORT:-$(prompt "PyPI server scheme" "8080")}

type=${BASH_ARGV[0]:-dev}

echo -e "${RED}Building ${type} environment...${NC}"
docker-compose -f "layouts/${type}.yml" build
docker-compose -f "layouts/${type}.yml" up -d 
