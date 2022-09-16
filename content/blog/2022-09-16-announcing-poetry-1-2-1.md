---
layout: single
title: "Announcing Poetry 1.2.1"
date: 2022-09-16
categories: [releases]
tags: ["1.x", "1.2"]
---

The Poetry team is pleased to announce the immediate availability of Poetry **1.2.1**.

<!--more-->

This release is the first patch release of the 1.2 branch, and contains several fixes for regressions and issues that
were discovered in 1.2.0.

If you have a previous version of Poetry installed via the [official installer](/docs/#installation),
getting Poetry **1.2.1** is as easy as:

```bash
$ poetry self update
```

### Changed

- Bump `poetry-core` to [`1.2.0`](https://github.com/python-poetry/poetry-core/releases/tag/1.2.0).
- Bump `poetry-plugin-export` to [`^1.0.7`](https://github.com/python-poetry/poetry-plugin-export/releases/tag/1.0.7).

### Fixed

- Fix an issue where `poetry cache clear` did not respect the `-n/--no-interaction` flag ([#6338](https://github.com/python-poetry/poetry/pull/6338)).
- Fix an issue where `poetry lock --no-update` updated dependencies from non-PyPI package sources ([#6335](https://github.com/python-poetry/poetry/pull/6335)).
- Fix a `poetry install` performance regression by falling back to internal pip ([#6062](https://github.com/python-poetry/poetry/pull/6062)).
- Fix an issue where a virtual environment was created unnecessarily when running `poetry export` ([#6282](https://github.com/python-poetry/poetry/pull/6282)).
- Fix an issue where `poetry lock --no-update` added duplicate hashes to the lock file ([#6389](https://github.com/python-poetry/poetry/pull/6389)).
- Fix an issue where `poetry install` fails because of missing hashes for `url` dependencies ([#6389](https://github.com/python-poetry/poetry/pull/6389)).
- Fix an issue where Poetry was not able to update pip in Windows virtual environments ([#6430](https://github.com/python-poetry/poetry/pull/6430)).
- Fix an issue where Poetry was not able to install releases that contained less common link types ([#5767](https://github.com/python-poetry/poetry/pull/5767)).
- Fix a `poetry lock` performance regression when checking non-PyPI sources for yanked versions ([#6442](https://github.com/python-poetry/poetry/pull/6442)).
- Fix an issue where `--no-cache` was not respected when running `poetry install` ([#6479](https://github.com/python-poetry/poetry/pull/6479)).
- Fix an issue where deprecation warnings for `--dev` were missing ([#6475](https://github.com/python-poetry/poetry/pull/6475)).
- Fix an issue where Git dependencies failed to clone when `insteadOf` was used in `.gitconfig` using the Dulwich Git client ([#6506](https://github.com/python-poetry/poetry/pull/6506)).
- Fix an issue where no cache entry is found when calling `poetry cache clear` with a non-normalized package name ([#6537](https://github.com/python-poetry/poetry/pull/6537)).
- Fix an invalid virtualenv constraint on Poetry ([#6402](https://github.com/python-poetry/poetry/pull/6402)).
- Fix outdated build system requirements for Poetry ([#6509](https://github.com/python-poetry/poetry/pull/6509)).

### Docs

- Add missing path segment to paths used by install.python-poetry.org ([#6311](https://github.com/python-poetry/poetry/pull/6311)).
- Add recommendations about how to install Poetry in a CI environment ([#6345](https://github.com/python-poetry/poetry/pull/6345)).
- Fix examples for `--with` and `--without` ([#6318](https://github.com/python-poetry/poetry/pull/6318)).
- Update configuration folder path for macOS ([#6395](https://github.com/python-poetry/poetry/pull/6395)).
- Improve the description of the `virtualenv.create` option ([#6460](https://github.com/python-poetry/poetry/pull/6460)).
- Clarify that `poetry install` removes dependencies of non-installed extras ([#6229](https://github.com/python-poetry/poetry/pull/6229)).
- Add a note about `pre-commit autoupdate` and Poetry's hooks ([#6497](https://github.com/python-poetry/poetry/pull/6497)).
