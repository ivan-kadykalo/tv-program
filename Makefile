# Makefile for managing Docker services

DOCKER_COMPOSE := docker-compose

.PHONY: all api fe down down-api down-fe

all: api fe

# Start API
api:
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
