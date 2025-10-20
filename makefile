# ========================================================
# 🧠 AI-Driven-News-Intelligence-Server - Makefile
# ========================================================

# Default environment
ENV ?= development

# Paths
DOCKER_DIR := docker
CONFIG_DIR := config/secrets
COMPOSE_FILE := $(DOCKER_DIR)/docker-compose.$(ENV).yaml
ENV_FILE := $(CONFIG_DIR)/.env.$(ENV)

# Project name 
PROJECT_NAME := ai-driven-news-intelligence-server-$(ENV)

# ========================================================
# 🧱 General Commands
# ========================================================

help:
	@echo ""
	@echo "Available commands:"
	@echo "  make up           - Start containers"
	@echo "  make down         - Stop containers"
	@echo "  make restart      - Restart containers"
	@echo "  make logs         - View container logs"
	@echo "  make rebuild      - Rebuild containers without cache"
	@echo "  make clean        - Stop and remove all containers + volumes"
	@echo "  make ps           - Show running containers"
	@echo "  make exec-db      - Open MongoDB shell"
	@echo "  make env          - Print detected environment and paths"
	@echo ""

# ========================================================
# 🐳 Docker Lifecycle
# ========================================================

up:
	@echo "🚀 Starting stack in '$(ENV)' environment..."
	docker compose -p $(PROJECT_NAME) --env-file $(ENV_FILE) -f $(COMPOSE_FILE) up -d

down:
	@echo "🧹 Stopping stack..."
	docker compose -p $(PROJECT_NAME) --env-file $(ENV_FILE) -f $(COMPOSE_FILE) down

restart:
	@echo "🔁 Restarting stack..."
	$(MAKE) down
	$(MAKE) up

logs:
	@echo "📜 Showing logs..."
	docker compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) logs -f

ps:
	docker compose -p $(PROJECT_NAME) -f $(COMPOSE_FILE) ps

rebuild:
	@echo "♻️  Rebuilding containers..."
	docker compose -p $(PROJECT_NAME) --env-file $(ENV_FILE) -f $(COMPOSE_FILE) build --no-cache
	docker compose -p $(PROJECT_NAME) --env-file $(ENV_FILE) -f $(COMPOSE_FILE) up -d

clean:
	@echo "🔥 Removing containers, networks, and volumes..."
	docker compose -p $(PROJECT_NAME) --env-file $(ENV_FILE) -f $(COMPOSE_FILE) down -v --remove-orphans

# ========================================================
# 🧩 Utilities
# ========================================================

exec-db:
	@echo "💾 Connecting to MongoDB shell..."
	docker exec -it ai_news_mongodb_dev mongosh -u root -p rootpassword --authenticationDatabase admin

env:
	@echo ""
	@echo "🧠 Environment Summary"
	@echo "---------------------------------"
	@echo "Environment: $(ENV)"
	@echo "Compose file: $(COMPOSE_FILE)"
	@echo "Env file: $(ENV_FILE)"
	@echo "Project name: $(PROJECT_NAME)"
	@echo "---------------------------------"
