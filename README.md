# Poetry Website

This is the source of the official [Poetry website](https://python-poetry.org).

It's built using the static site generator [Hugo](https://gohugo.io) and the Markdown docs from the [Poetry repo](https://github.com/python-poetry/poetry/tree/master/docs).

## Requirements

- [Poetry](https://python-poetry.org/docs/master/#installing-with-the-official-installer)
- [Node.js 18](https://nodejs.org/en/download/) (and `npm`)

## Local development

To work on this project locally, first fork and clone this repo. Then:

```sh
make site
```

or, to instead use docs from a local `poetry` repo:

```sh
make site POETRY_REPO=../path/to/local/poetry/repo
```

This will

- Either fetch or symlink `docs/*.md` from the `poetry` repo into `content/docs`
- Concurrently run `rollup` to compile assets and `hugo` to serve content

The website will now be accessible at <http://localhost:1313> and reload on any changes.
