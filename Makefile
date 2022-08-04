ifdef POETRY_REPO
WEBSITE_ARGS = --local="$(POETRY_REPO)" --editable
endif

.PHONY: help
help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z -]+:.*?## / {printf "\033[36m%-10s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST) | sort

.PHONY: clean
clean: ## Clean generated files
	@unlink content/docs &>/dev/null || true
	@rm -rf assets/ content/docs/ public/ resources/

.PHONY: site
site: node_modules content/docs ## Build and serve site
	@test -f assets/assets/app.js || npx rollup --config
	@npm run dev

node_modules: package.json package-lock.json
	npm install
	@touch node_modules

content/docs: pyproject.toml
	poetry install
	poetry run ./bin/website configure $(WEBSITE_ARGS)
	poetry run ./bin/website docs pull $(WEBSITE_ARGS)
