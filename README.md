# Poetry Website

This is the source of the official [Poetry website](https://python-poetry.org).

It's built using the static site generator [Hugo](https://gohugo.io) and the Markdown docs from the [Poetry repo](https://github.com/python-poetry/poetry/tree/master/docs).

## Requirements

- [Poetry](https://python-poetry.org/docs/master/#installing-with-the-official-installer)
- [Node.js 14](https://nodejs.org/en/download/) (and `npm`)

## Local development

If you want to work on this project locally, follow the instructions below:

1. Fork this repository
1. Clone your fork locally
1. Run `make site`, which will:
   - Perform a [sparse checkout](https://git-scm.com/docs/git-sparse-checkout) of the `poetry` repo into `content/docs`
   - Concurrently run `rollup` to compile assets and `hugo` to serve content

The website will now be accessible at <http://localhost:1313> and reload on any changes.
