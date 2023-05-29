# Poetry Website

[![Poetry](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/python-poetry/website/main/static/badge/v0.json)][Official Website]

This is the source of the official [Poetry website][Official Website].

It's built using the static site generator [Hugo](https://gohugo.io) and the Markdown docs from the [Poetry repo](https://github.com/python-poetry/poetry/tree/master/docs).

[Official Website]: https://python-poetry.org

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
