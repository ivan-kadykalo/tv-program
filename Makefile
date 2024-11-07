# Makefile for managing Docker services

DOCKER_COMPOSE := docker-compose

.PHONY: all db api fe down down-api down-fe

all: db api fe

# Start PostgreSQL and pg_proxy together
db:
	@echo "Starting PostgreSQL and pg_proxy..."
	$(DOCKER_COMPOSE) up -d postgres pg_proxy

# Start API
api: db
	@echo "Starting API..."
	$(DOCKER_COMPOSE) up --build api

# Start Frontend
fe:
	@echo "Starting Frontend..."
	$(DOCKER_COMPOSE) up --build frontend

# Stop all services
down:
	@echo "Stopping all services..."
	$(DOCKER_COMPOSE) down --volumes

# Stop api service
down-api:
	@echo "Stopping API..."
	$(DOCKER_COMPOSE) down api --volumes


# Stop fe service
down-fe:
	@echo "Stopping Frontend..."
	$(DOCKER_COMPOSE) down frontend --volumes