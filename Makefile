.PHONY: help
help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z -]+:.*?## / {printf "\033[36m%-10s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.PHONY: clean
clean: ## Clean generated files
	@rm -rf assets/ content/docs/ public/ resources/

.PHONY: site
site: node_modules content/docs ## Build and serve site
	@npm run dev

node_modules: package.json package-lock.json
	npm install
	@touch node_modules

content/docs: pyproject.toml
	poetry run ./bin/website configure
	poetry run ./bin/website docs pull
